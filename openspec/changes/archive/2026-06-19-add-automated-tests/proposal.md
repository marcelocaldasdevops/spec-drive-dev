## Why

O projeto atualmente não possui uma configuração de testes automatizados, apesar de ter `jest` e `supertest` em suas dependências. Adicionar uma suíte de testes estruturada é fundamental para garantir a qualidade do código, detectar regressões de forma antecipada e documentar os comportamentos esperados. Além disso, a introdução do Postman e Newman permitirá testes de API End-to-End (E2E) robustos e automatizados.

## What Changes

- Configurar o `jest` para testes de unidade e integração no projeto.
- Implementar testes básicos de unidade e integração (ex: usando `supertest`) para validar a configuração de testes.
- Criar coleções do Postman para os endpoints da API.
- Configurar o `newman` para rodar essas coleções do Postman automaticamente (ex: via scripts do npm).
- Atualizar o `package.json` com scripts padrão de teste (`npm test`, `npm run test:api`, etc.).

## Capabilities

### New Capabilities
- `jest-test-suite`: Configuração dos testes de unidade e integração usando Jest e Supertest.
- `postman-newman-tests`: Configuração e automação de testes de API via coleções do Postman e executor Newman.

### Modified Capabilities
*(Nenhuma)*

## Impact

- **Base de código**: Introdução de um diretório `tests` e arquivos de teste relacionados.
- **Dependências**: Adição do `newman` em `devDependencies` (se já não estiver presente).
- **Scripts**: Modificação do script `test` no `package.json` para executar as novas suítes de testes.
- **CI/CD**: Os scripts de teste poderão ser integrados em pipelines futuras para validação automatizada.
