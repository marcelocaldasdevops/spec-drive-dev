# ⚙️ Configurações (`/config`)

Este diretório centraliza todas as configurações da aplicação, carregamento de variáveis de ambiente e conexões externas.

## Arquivos Principais

- **`db.js` / Prisma**: Exporta a instância do ORM (Prisma Client) para comunicação com o banco de dados.
- **`env.js`**: Gerencia e valida o carregamento das variáveis de ambiente usando `dotenv` ou validação estrita, garantindo que a aplicação não inicie sem as variáveis obrigatórias.

## Variáveis de Ambiente Necessárias
Sempre verifique o arquivo `.env.example` na raiz do projeto. As configurações definidas aqui são importadas pelo resto da aplicação.
