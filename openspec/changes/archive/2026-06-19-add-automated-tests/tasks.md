## 1. Configurar Jest e Supertest

- [x] 1.1 Atualizar `package.json` com um script de teste válido (`jest`).
- [x] 1.2 Criar `jest.config.js` ou definir uma configuração básica do jest no `package.json`.
- [x] 1.3 Criar o diretório `/tests` ou `/src/__tests__` para os testes.

## 2. Implementar Testes Básicos

- [x] 2.1 Criar um arquivo de teste de unidade básico (ex: `math.test.js` ou um teste de utilitário) para verificar se o Jest funciona.
- [x] 2.2 Criar um teste de integração básico (ex: `health.test.js`) usando Supertest em um endpoint existente ou um fictício.

## 3. Configurar Postman e Newman

- [x] 3.1 Criar o diretório `/postman` no repositório.
- [x] 3.2 Adicionar `newman` como uma dependência de desenvolvimento.
- [x] 3.3 Adicionar um arquivo JSON da Coleção do Postman básico com pelo menos um teste de API ou "health-check".
- [x] 3.4 Atualizar os scripts do `package.json` com `test:api` que execute `newman run postman/collection.json`.
