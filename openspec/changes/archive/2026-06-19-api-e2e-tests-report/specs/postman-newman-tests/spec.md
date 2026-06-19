## MODIFIED Requirements

### Requirement: Automação com Newman
O projeto DEVE suportar a execução da coleção do Postman automaticamente via CLI (linha de comando) utilizando o `newman` e produzir relatórios HTML.

#### Scenario: Executando testes via script npm
- **WHEN** um desenvolvedor executa `npm run test:api`
- **THEN** o Newman executa a coleção do Postman contra o servidor local, imprime resultados no console e salva um relatório HTML.
