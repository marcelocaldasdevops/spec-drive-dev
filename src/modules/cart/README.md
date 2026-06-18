# Módulo: Cart (Carrinho)

## Objetivo do Módulo
Permitir que o usuário construa sua intenção de compra antes de realizar o checkout final.

## Responsabilidade Principal
Armazenar e atualizar de forma rápida os produtos e quantidades escolhidas por um usuário específico no seu carrinho de compras em memória.

## Funcionalidades Existentes
*(Hipótese baseada no contexto geral, pois o código detalhado não foi lido a fundo)*
- Adicionar produto ao carrinho (com quantidade).
- Remover produto ou diminuir quantidade.
- Listar produtos atualmente no carrinho do usuário.

## Dependências Internas e Externas
- **Internas**: Presume-se forte dependência do `config/redis`.
- **Externas**: `redis` para performance de leitura e gravação efêmera.

## Módulos Relacionados
- **Orders**: Durante o checkout, o módulo de ordens consome o estado atual do carrinho.

## Pontos de Entrada
`cartRoutes.js` conectado a `/api/v1/cart`. O controller é o `cartController.js`. Rotas comumente protegidas pelo middleware de autenticação.

## Fluxos Importantes
- **Recuperação de Carrinho para Checkout**: Exposto primariamente para que o `orderService` possa consolidar o pedido antes de gerar a transação de compra real.

## Arquivos Críticos
- `cartService.js`: Gerenciador do estado no banco chave-valor.

## Observações Técnicas e Débitos Identificados
- **Débito Técnico (Limpeza do Carrinho)**: Como evidenciado no módulo de ordens, a exclusão da chave do redis (`cart:default:userId`) é feita fora do contexto desse módulo. Deve-se exportar e usar uma função `clearCart` através do `cartService` para manter o isolamento.
