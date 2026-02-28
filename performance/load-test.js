import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Counter } from 'k6/metrics';

// Import LOCAL do bundle (baixado manualmente)
import { htmlReport } from './reporter/k6-reporter-bundle.js';

// Resumo colorido no console
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.3/index.js';

// Contadores customizados
const successCounter = new Counter('requests_successful');
const failureCounter = new Counter('requests_failed');

// Detecta se está rodando no CI (GitHub Actions define CI=true)
const isCI = __ENV.CI === 'true';

// Ajusta stages dinamicamente: rápido no CI, completo local
const ciStages = [
  { duration: '10s', target: 20 },
  { duration: '40s', target: 50 },
  { duration: '10s', target: 0 },
];

const fullStages = [
  { duration: '30s', target: 50 },
  { duration: '5m',  target: 500 },
  { duration: '30s', target: 0 },
];

export const options = {
  stages: isCI ? ciStages : fullStages,
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed:   ['rate<0.01'],
    checks:            ['rate>0.98'],

    'group_duration{group:::GET posts - Listagem}':          ['p(95)<300'],
    'group_duration{group:::GET posts - Item aleatório}':    ['p(95)<350'],
    'group_duration{group:::GET inválido - Simulação 404}':  ['p(95)<400'],
  },
};

export default function () {
  // 1. Listagem completa
  group('GET posts - Listagem', () => {
    const res = http.get('https://jsonplaceholder.typicode.com/posts');

    const success = check(res, {
      'status is 200':          (r) => r.status === 200,
      'body has ~100 items':    (r) => r.status === 200 && JSON.parse(r.body).length === 100,
      'response time < 300ms':  (r) => r.timings.duration < 300,
    });

    if (success) successCounter.add(1);
    else failureCounter.add(1);
  });

  // 2. Item aleatório
  group('GET posts - Item aleatório', () => {
    const postId = Math.floor(Math.random() * 100) + 1;
    const res = http.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    const success = check(res, {
      'status is 200':          (r) => r.status === 200,
      'id correto':             (r) => r.json('id') === postId,
      'tem title e body':       (r) => r.json('title') && r.json('body'),
      'response time < 350ms':  (r) => r.timings.duration < 350,
    });

    if (success) successCounter.add(1);
    else failureCounter.add(1);
  });

  // 3. Simulação 404
  group('GET inválido - Simulação 404', () => {
    const res = http.get('https://jsonplaceholder.typicode.com/posts/999999');

    check(res, {
      'status is 404':                 (r) => r.status === 404,
      'response time < 400ms mesmo em erro': (r) => r.timings.duration < 400,
    });
    // Não conta como success/failure (erro esperado)
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    'reports/k6-load-report.html': htmlReport(data, { debug: false }),
    'reports/k6-raw-results.json': JSON.stringify(data, null, 2),
    'stdout': textSummary(data, { indent: '→', enableColors: true }),
  };
}