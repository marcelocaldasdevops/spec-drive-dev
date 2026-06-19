## ADDED Requirements

### Requirement: Coleção do Postman
O repositório DEVE incluir um arquivo JSON da coleção do Postman que defina os endpoints da API para testes E2E.

#### Scenario: Executando a coleção via Postman
- **WHEN** o usuário importa a coleção no aplicativo do Postman
- **THEN** todos os endpoints definidos estão presentes e configurados corretamente.

### Requirement: Automação com Newman
O projeto DEVE suportar a execução da coleção do Postman automaticamente via CLI (linha de comando) utilizando o `newman`.

#### Scenario: Executando testes via script npm
- **WHEN** um desenvolvedor executa `npm run test:api`
- **THEN** o Newman executa a coleção do Postman contra o servidor local e imprime os resultados dos testes no console.
