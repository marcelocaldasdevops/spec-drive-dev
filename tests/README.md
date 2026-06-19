# 🧪 Testes (`/tests`)

Diretório raiz para as configurações e suites de teste E2E e Integração da nossa API. 
*Testes unitários geralmente ficam ao lado do arquivo que testam (`.test.js`), enquanto testes de integração ficam aqui.*

## 1. Testes de API E2E (Postman / Newman)

Mantemos uma coleção do Postman na pasta `/postman` na raiz do projeto, cobrindo as rotas principais (Auth, Users, Products, etc).

**⚠️ Importante**: Os testes E2E rodam contra a **porta 3001** do `localhost`. Certifique-se de que a API subiu na porta correta (`PORT=3001 npm start`) antes de rodar manualmente ou de atualizar os testes.

**Comando:**
```bash
npm run test:api
```
*(Este comando executa a coleção com o Newman e gera um belo relatório HTML na pasta `newman/`)*

## 2. Testes de Unidade e Integração (Jest + Supertest)

Utilizamos o Jest como framework base. O Supertest é usado para testes de integração de rotas (ex: `health.test.js`), que carrega a instância do Express sem abrir a porta de rede.

**Comando:**
```bash
npm test
```
*(Executa a suíte local do Jest)*
