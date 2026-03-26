📄 Questionamentos do Avaliador — Respostas Técnicas e Ações Implementadas

Este documento consolida os questionamentos levantados durante a
avaliação técnica, apresentando diagnóstico, decisões técnicas e ações
aplicadas no repositório, considerando sua estrutura atual e evolução
planejada.

------------------------------------------------------------------------

🧩 Visão Geral

As melhorias aplicadas tiveram como foco:

-   Aumento da confiabilidade dos testes
-   Melhoria de manutenibilidade e legibilidade
-   Estruturação para escalabilidade
-   Preparação para ambientes reais (multi-env + CI/CD)

------------------------------------------------------------------------

1️⃣ Testes E2E com arquivos vazios

📌 Diagnóstico

Realizei de forma equivocada o merge das alterações na branch errada.

✅ Ação Implementada

-   Restauração completa dos cenários
-   Validação da execução da suíte

Resultado: - 9 scenarios (9 passed) - 37 steps (37 passed)

------------------------------------------------------------------------

2️⃣ Uso excessivo de await nos testes de API

📌 Diagnóstico

Uso direto de múltiplos await nos testes impactava:

-   Legibilidade
-   Reutilização
-   Manutenção

------------------------------------------------------------------------

🧠 Decisão Técnica

Aplicação do padrão API Client (abstração de camada de serviço)

------------------------------------------------------------------------

✅ Ação Implementada

-   Criação de:

    -   tests/api/clients/PostsClient.js

-   Centralização de:

    -   chamadas HTTP
    -   tratamento de resposta
    -   validações auxiliares

------------------------------------------------------------------------

🎯 Resultado

Os testes passaram a conter apenas:

    await postsClient.metodo(...)

-   Benefícios
    -   Redução de complexidade nos testes
    -   Separação clara de responsabilidades
    -   Facilidade de manutenção e extensão

------------------------------------------------------------------------

3️⃣ Estrutura de testes de API

📌 Problema identificado

Estrutura anterior pouco modular e com baixa separação de responsabilidades.

✅ Ação Implementada

-   Reorganização da estrutura:
```
tests
└── api
├── clients
├── schemas
├── utils
├── posts.api.spec.js
└── playwright.config.js
```
🎯 Benefícios

-   Arquitetura escalável
-   Facilita inclusão de novos endpoints
-   Redução de duplicação de código

------------------------------------------------------------------------

4️⃣ Execução em múltiplos ambientes (DEV / QA / PRD)

📌 Necessidade

Permitir execução dos testes em diferentes ambientes sem alteração de
código.

✅ Ação Implementada

Uso de arquivos .env + configuração dinâmica no Playwright.

📁 Estrutura

.env .env.dev .env.qa .env.prd

▶️ Execução
```
DEV
npx playwright test tests/api –project=api-dev
```
```
QA
ENV=qa DOTENV_PATH=.env.qa npx playwright test tests/api –project=api-qa
```
```
PRD
ENV=prd DOTENV_PATH=.env.prd npx playwright test tests/api–project=api-prd
```
🚀 Capacidade de evolução

-   Tokens por ambiente
-   Headers específicos
-   Feature flags
-   URLs distintas

------------------------------------------------------------------------

5️⃣ Validação de contrato (API Testing)

📌 Problema identificado

Validações limitadas a status code e payload básico.

🧠 Decisão Técnica

Adoção de contract testing via JSON Schema (AJV)

✅ Ação Implementada

Schemas: tests/api/schemas/*.json

Validador: tests/api/utils/validateSchema.js

▶️ Uso

validateSchema(json, ‘post.schema.json’)

⚠️ Particularidade da API (JSONPlaceholder)

-   GET /posts → array
-   GET /posts/1 → objeto

🎯 Benefícios

-   Contratos explícitos
-   Redução de regressões
-   Maior confiança nos testes
-   Base pronta para APIs reais

------------------------------------------------------------------------

6️⃣ Relatórios de execução

📊 API (Playwright)

Execução: npx playwright test –project=api-dev –reporter=html

Visualização: npx playwright show-report

🌐 E2E (Cucumber)

Execução: npx cucumber-js tests/e2e/features

Visualização: open reports/cucumber-report.html

📈 Performance (K6)

Execução: k6 run performance/load-test.js

Outputs: - reports/k6-load-report.html - reports/k6-raw-results.json

🤖 CI/CD (GitHub Actions)

Artifacts: - playwright-api-report- - cucumber-e2e-report - k6-reports

------------------------------------------------------------------------

✅ Conclusão Executiva

✔ Melhorias entregues

-   Correção E2E
-   API estruturada
-   Client abstraction
-   Contract testing
-   Multi-env
-   CI/CD com evidências

🚀 Estado atual

-   Escalável
-   Pronto para ambientes reais
-   Alinhado com QA moderno

🔮 Próximos passos

-   Observabilidade
-   Chaos engineering
-   Expansão E2E
