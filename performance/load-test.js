import http from 'k6/http';
import { check, sleep } from 'k6';

// Import do HTML reporter de versão fixa (evita quebras se o bundle mudar)
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/3.0.3/dist/bundle.js';

// Opcional: para resumo colorido no console
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.3/index.js';

export const options = {
  stages: [
    { duration: '30s', target: 50 },   // Ramp-up suave até 50 usuários
    { duration: '5m',  target: 500 },  // Mantém 500 usuários simultâneos por 5 minutos
    { duration: '30s', target: 0 },    // Ramp-down gradual
  ],
  thresholds: {
    // 95% das requisições devem ser concluídas em menos de 500ms
    http_req_duration: ['p(95)<500'],
    // Taxa de falha máxima aceitável: < 1%
    http_req_failed:   ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  check(res, {
    'status deve ser 200':          (r) => r.status === 200,
    'resposta deve ter 100 itens':  (r) => JSON.parse(r.body).length === 100,
  });

  sleep(1);  // Simula tempo de pensamento do usuário (1 segundo)
}

// Função especial chamada automaticamente pelo k6 no final do teste
export function handleSummary(data) {
  return {
    // Relatório HTML bonito com gráficos e métricas
    'reports/k6-load-report.html': htmlReport(data, { debug: false }),

    // JSON com indentação para facilitar leitura e análise posterior
    'reports/k6-raw-results.json': JSON.stringify(data, null, 2),

    // Mantém o resumo colorido e formatado no console (stdout)
    'stdout': textSummary(data, { indent: '→', enableColors: true }),
  };
}