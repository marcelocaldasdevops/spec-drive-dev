## ADDED Requirements

### Requirement: Configuração do Jest
O projeto DEVE incluir uma configuração funcional do `jest` capaz de descobrir e executar testes de unidade e integração.

#### Scenario: Executando a suíte de testes
- **WHEN** um desenvolvedor executa `npm test`
- **THEN** o Jest descobre os arquivos de teste e os executa, retornando o status de sucesso se todos os testes passarem.

### Requirement: Integração com Supertest
O projeto DEVE suportar a execução de testes de integração HTTP via `supertest` para testar as rotas do Express sem abrir uma porta de rede.

#### Scenario: Testando um endpoint
- **WHEN** um teste faz uma requisição usando `supertest(app).get('/health')`
- **THEN** o teste recebe o corpo e status da resposta HTTP correta.
