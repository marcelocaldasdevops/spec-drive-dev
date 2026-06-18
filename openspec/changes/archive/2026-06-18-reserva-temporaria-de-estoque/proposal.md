## Why

A validação de estoque atual ocorre apenas no momento do checkout, o que pode gerar frustração ao usuário caso outro cliente efetue a compra do mesmo produto simultaneamente. A implementação de uma reserva provisória assim que o item entra no carrinho garante a disponibilidade e previne conflitos na conclusão da venda.

## What Changes

- Implementar lógica no módulo `cart` para reservar o estoque de um produto no momento em que ele é adicionado.
- Utilizar o Redis para armazenar as reservas temporárias atreladas ao carrinho do usuário (com base no TTL da sessão).
- Modificar o fluxo de checkout (`orders`) para validar a compra através da reserva de estoque pré-garantida, consolidando-a posteriormente no banco de dados.
- Adicionar lógica de expiração/rollback de reservas quando o tempo do carrinho esgotar ou se o usuário remover o item.

## Capabilities

### New Capabilities
- `reserva-estoque-carrinho`: Lida com o ciclo de vida da reserva temporária de inventário via Redis durante a etapa de carrinho.

### Modified Capabilities
- 

## Impact

- `cartService.js`: Precisará interagir com estoques lógicos no Redis (Adição/Remoção/Expiração).
- `orderService.js`: O checkout será refatorado para assumir reservas feitas, diminuindo a carga de validação bruta no banco.
- Dependência contínua e aprimorada do **Redis** para lidar com quantidades reservadas por produto de forma atômica (ex: decréscimo de contadores).
