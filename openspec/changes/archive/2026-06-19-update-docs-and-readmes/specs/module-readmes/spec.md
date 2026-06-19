## ADDED Requirements

### Requirement: Documentação de Diretórios
O projeto MUST conter arquivos `README.md` explicativos dentro dos diretórios críticos: `config`, `middlewares`, `utils` e `tests`.

#### Scenario: Lendo a documentação do módulo
- **WHEN** um desenvolvedor acessa o diretório `tests`
- **THEN** ele encontra um `README.md` explicando que a porta da API para testes E2E é a 3001 e detalhando os comandos para executar as suítes de teste (Jest e Newman).
