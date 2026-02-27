# Outsera Automação - Teste Técnico

Projeto de automação para avaliação QA na Outsera.

## Tecnologias
- Playwright (JavaScript) → API + E2E
- Cucumber → BDD para cenários E2E
- K6 → Testes de carga
- Maestro → Testes mobile
- GitHub Actions → CI/CD

## Instalação
```bash
npm install
npx playwright install --with-deps
```

## Comandos principais
- Rodar testes API: `npx playwright test tests/api`
- Ver relatório: `npx playwright show-report reports/playwright-report`