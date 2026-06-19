# Testes e Qualidade

## Visão Geral

O projeto possui uma infraestrutura de testes automatizados composta por duas camadas complementares:

1. **Testes Unitários e de Integração** — executados localmente via Jest + Supertest.
2. **Testes E2E de API** — executados via Postman (coleção) + Newman (CLI) com geração de relatórios HTML.

---

## Comandos Disponíveis

| Comando | O que faz | Pré-requisitos |
|---|---|---|
| `npm test` | Executa todos os testes do Jest (unitários + integração com Supertest) | Nenhum — o Supertest carrega o Express internamente |
| `npm run test:api` | Executa a coleção do Postman via Newman e gera relatório HTML | A API **DEVE** estar rodando na porta **3001** |

---

## 1. Testes Unitários e de Integração (Jest + Supertest)

### O que é o Jest?
O [Jest](https://jestjs.io/) é um framework de testes JavaScript mantido pelo Meta. Ele descobre automaticamente os arquivos `*.test.js` e executa as asserções definidas neles.

### O que é o Supertest?
O [Supertest](https://github.com/ladjs/supertest) permite fazer requisições HTTP diretamente na instância do Express **sem abrir uma porta de rede**. Isso torna os testes de integração rápidos e isolados.

### Como funciona?
```
tests/
├── math.test.js      ← Teste unitário (lógica pura)
└── health.test.js    ← Teste de integração (Supertest → Express)
```

### Como executar?
```bash
npm test
```

**Saída esperada:**
```
 PASS  tests/math.test.js
 PASS  tests/health.test.js

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
```

### Configuração
- Arquivo: `jest.config.js` (raiz do projeto)
- Ambiente: `node` (sem DOM do navegador)
- Diretório de testes: `/tests`

---

## 2. Testes E2E de API (Postman + Newman)

### O que é o Newman?
O [Newman](https://github.com/postmanlabs/newman) é o executor de linha de comando do Postman. Ele roda coleções `.json` exportadas do Postman sem precisar abrir a interface gráfica.

### O que é o newman-reporter-htmlextra?
O [htmlextra](https://github.com/DannyDainton/newman-reporter-htmlextra) é um reporter que gera relatórios HTML bonitos e detalhados a partir da execução do Newman. Após cada execução, um arquivo HTML é salvo na pasta `newman/` na raiz do projeto.

### Endpoints cobertos pela coleção

A coleção do Postman (`postman/collection.json`) cobre os seguintes módulos:

| Pasta | Endpoint | Método | Teste |
|---|---|---|---|
| Health | `/health` | GET | Status 200 |
| Auth | `/api/v1/auth/login` | POST | Retorna 400/401/404 (credenciais inválidas) |
| Products | `/api/v1/products` | GET | Status 200 |
| Categories | `/api/v1/categories` | GET | Status 200 ou 404 |
| Cart | `/api/v1/cart` | GET | Status 401 (sem autenticação) |
| Orders | `/api/v1/orders` | GET | Rota válida (não 404) |
| Users | `/api/v1/users` | GET | Rota válida (não 404) |

### Como executar?

**Passo 1 — Suba a API na porta 3001:**
```bash
PORT=3001 npm start
```

**Passo 2 — Em outro terminal, execute os testes:**
```bash
npm run test:api
```

**Ou em um único comando:**
```bash
PORT=3001 node src/server.js & sleep 3 && npm run test:api; kill $!
```

### Onde fica o relatório HTML?
Após a execução, o relatório é salvo automaticamente na pasta:
```
newman/
└── E-Commerce API Full Coverage-<timestamp>.html
```

Basta abrir o arquivo `.html` no navegador para visualizar os resultados detalhados com gráficos, tempos de resposta e status de cada asserção.

---

## 3. Estrutura de Arquivos de Teste

```
projeto/
├── tests/                          ← Testes Jest (unitários + integração)
│   ├── math.test.js
│   ├── health.test.js
│   └── README.md
├── postman/                        ← Coleção do Postman
│   └── collection.json
├── newman/                         ← Relatórios HTML (gerados automaticamente)
│   └── *.html
├── jest.config.js                  ← Configuração do Jest
└── package.json                    ← Scripts: "test" e "test:api"
```

---

## 4. Dependências de Teste

Todas instaladas como `devDependencies`:

| Pacote | Versão | Papel |
|---|---|---|
| `jest` | ^30.2.0 | Test runner principal |
| `supertest` | ^7.1.4 | Testes HTTP sem porta de rede |
| `newman` | ^6.2.2 | Executor CLI de coleções Postman |
| `newman-reporter-htmlextra` | ^1.23.1 | Geração de relatórios HTML visuais |

---

## 5. Dicas e Boas Práticas

- **Sempre rode `npm test` antes de fazer push** para garantir que nenhum teste quebrou.
- **Para testes E2E**, certifique-se de que o banco de dados PostgreSQL e o Redis estão acessíveis, caso contrário endpoints que dependem dessas conexões retornarão erro 500.
- **Os relatórios HTML do Newman** são ótimos para compartilhar com a equipe ou anexar em pull requests como evidência de testes.
- **Novos testes unitários** devem ser criados em `/tests` seguindo o padrão `<nome>.test.js`.
