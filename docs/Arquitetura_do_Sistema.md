# Arquitetura do Sistema

## Visão Arquitetural do Projeto
O sistema é projetado como um **Monólito Modular** desenvolvido em Node.js com o framework Express. A separação lógica é feita através de pastas por domínio (módulos), permitindo fácil navegação e possível futura extração para microsserviços, caso necessário. O banco de dados relacional (PostgreSQL) é manipulado através do ORM Prisma. O Redis atua como ferramenta de cache, controle de sessão (Refresh Tokens) e possivelmente armazenamento efêmero (como o carrinho de compras).

## Padrões Utilizados
- **Controller-Service-Repository**: A lógica de negócios é separada das camadas de acesso a dados e de roteamento HTTP.
- **RESTful API**: Exposição de rotas padronizadas baseadas nos recursos do domínio (`/api/v1/...`).
- **Multi-tenancy**: O sistema atua com visão de um Marketplace, onde tabelas como `users`, `products` e `orders` contêm um `tenantId`. A identificação do tenant em cada requisição é feita, por enquanto, via injecão em Header HTTP.

## Regras Arquiteturais e Convenções Técnicas
- **Roteamento**: Rotas (`*Routes.js`) definem os endpoints e middlewares de injeção, mapeando para o Controller adequado.
- **Controllers**: Lidam exclusivamente com as requisições e respostas HTTP (req, res), delegando o processamento real para os Services.
- **Services**: Contêm a lógica de negócio principal do módulo e regras de domínio.
- **Repositories**: Isolam a complexidade de acesso ao banco de dados (Prisma). Nenhuma regra de negócio deve residir aqui.
- **Tratamento de Erros**: Centralizado. Lançam-se exceções da classe `AppError`, que são capturadas pelo `errorHandler.js` global do Express.

## Separação de Responsabilidades
A aplicação possui domínios bem definidos divididos na pasta `src/modules`:
- `auth`: Autenticação e geração de tokens.
- `cart`: Gerenciamento de carrinho de compras (tipicamente efêmero).
- `categories`: Estruturação hierárquica de produtos.
- `orders`: Orquestração do checkout e geração de pedidos.
- `payments`: Processamento de pagamentos para pedidos.
- `products`: Catálogo de produtos, com cache de listagem.
- `users`: Gerenciamento de contas de usuários.

## Fluxo de Comunicação entre Módulos
A comunicação entre módulos ocorre, primariamente, através de **chamadas diretas a Services ou Repositories de outros módulos**.
Exemplo: `orderService.js` importa e chama diretamente o `cartService.js` e o `productRepository.js` durante o processo de *checkout*. O sistema evoluirá para a emissão de eventos ("Simulado" via logs no momento) no checkout, utilizando RabbitMQ para comunicação de eventos assíncronos (EDA - Event-Driven Architecture) no futuro.

## Dependências Críticas
- **Node.js + Express**: Servidor e framework base.
- **Prisma + PostgreSQL**: Persistência estruturada de dados, com migrações e consistência transacional.
- **Redis**: Crítico para cache (`products:list`), armazenamento de estado efêmero (*refresh tokens*) e planejado para a reserva temporária de estoques no carrinho.
- **Autenticação JWT**: Controle de acesso stateless.
- **RabbitMQ**: Definido como o Message Broker para publicação e subscrição de eventos assíncronos.

## Riscos Técnicos e Acoplamentos Importantes
- **Acoplamento entre Módulos**: O módulo de `orders` acessa diretamente o `productRepository` em vez do `productService`. Essa violação do encapsulamento do módulo `products` (vazamento de detalhes de persistência) aumenta o acoplamento e pode dificultar futuras refatorações.
- **Dependência Forte do Redis**: A aplicação supõe a disponibilidade do Redis para listagem de produtos (cache obrigatório antes da consulta) e controle de tokens. A indisponibilidade do Redis afeta rotas críticas.
- **Multi-tenancy Fixo**: O uso default "default" nos esquemas do Prisma para o `tenantId` e exclusão hard-coded do carrinho de um `userId` ("cart:default:userId") mostram um suporte ao multi-tenancy ainda embrionário, que precisará ser formalizado.

## Diretrizes para Futuras Implementações (Spec Driven Development)
- **Desacoplamento de Domínio**: Um módulo não deve importar o `Repository` de outro módulo. Deve-se usar a camada `Service` como API pública do módulo.
- **Isolamento de Estado**: Funcionalidades como limpar carrinho não devem ser feitas deletando a chave do Redis diretamente no `orderService`, mas delegadas a uma função `clearCart` no `cartService`.
- **Eventos de Domínio**: Evoluir os "logs de eventos" para um barramento de eventos real no RabbitMQ, de forma a desacoplar rotinas pós-compra e diminuir acoplamentos fortes em transações cruzadas.
- **Cobertura de Testes**: Garantir testes unitários para a camada de Service antes de novas alterações complexas.

## Testes e Qualidade

O projeto conta com uma infraestrutura de testes automatizados em duas camadas:

### Testes Unitários e de Integração (Jest + Supertest)
- **Jest** (`v30`) é o test runner principal, configurado via `jest.config.js` com ambiente `node`.
- **Supertest** (`v7`) realiza testes de integração HTTP diretamente na instância do Express, sem necessidade de abrir porta de rede.
- Arquivos de teste ficam no diretório `/tests` (ex: `math.test.js`, `health.test.js`).
- **Comando**: `npm test`

### Testes E2E de API (Postman / Newman)
- **Newman** (`v6`) executa coleções do Postman via linha de comando.
- **newman-reporter-htmlextra** gera relatórios HTML visuais detalhados na pasta `/newman`.
- A coleção (`postman/collection.json`) cobre os módulos: Health, Auth, Products, Categories, Cart, Orders e Users.
- A API DEVE estar rodando na **porta 3001** antes da execução dos testes E2E.
- **Comando**: `npm run test:api`

### Ferramentas de Teste

| Ferramenta | Tipo | Versão | Propósito |
|---|---|---|---|
| Jest | Dev | v30 | Test runner (unitários e integração) |
| Supertest | Dev | v7 | Testes HTTP sem porta de rede |
| Newman | Dev | v6 | Executor de coleções Postman via CLI |
| newman-reporter-htmlextra | Dev | v1.23 | Geração de relatórios HTML |
