# 🛡️ Middlewares (`/middlewares`)

Middlewares do Express interceptam requisições antes que elas atinjam os *Controllers*. Eles são responsáveis por lógicas transversais de segurança e validação.

## Middlewares Atuais

- **Autenticação / Autorização**: Validação de JWT, checagem de roles de usuário. Utilizados nas rotas privadas (ex: Cart, Orders).
- **Tratamento de Erros**: Captura erros globais, processa exceções lançadas nos Controllers e devolve uma resposta HTTP padronizada (ex: 400 para Bad Request, 500 para Internal Server Error).
- **Validação**: Validação de schema (ex: via Zod/Joi) do corpo das requisições (body) ou parâmetros.
