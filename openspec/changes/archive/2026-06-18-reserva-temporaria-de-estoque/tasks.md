## 1. Suporte e Preparação do Inventário no Redis

- [x] 1.1 Adicionar em `productService` uma lógica para espelhar a quantidade em estoque para o Redis (`stock:available:{productId}`) durante a criação/atualização de um produto.
- [x] 1.2 Criar métodos de suporte no wrapper do Redis ou `cartService` para facilitar decremento (`DECRBY`) atômico com validação.

## 2. Refatoração do Cart (Inclusão e Remoção)

- [x] 2.1 Atualizar a lógica de adição no `cartService.js` para subtrair a quantidade exigida do inventário no cache. Retornar erro "Estoque insuficiente" se o valor cair abaixo de zero.
- [x] 2.2 Gravar as chaves de reserva temporárias `cart:reserve:{userId}:{productId}` quando a inserção for bem-sucedida, atrelando as chaves ao TTL de 15 minutos do carrinho principal.
- [x] 2.3 Atualizar a lógica de remoção manual de itens do carrinho para re-incrementar os valores removidos à chave `stock:available:{productId}` e deletar a chave da reserva individual.

## 3. Lógica de Rollback de Expiração

- [x] 3.1 Desenvolver rotina que detecte ou processe carrinhos expirados silenciosamente (via CRON ou rotina passiva) para realizar a devolução do estoque aos produtos no Redis caso a compra não tenha se consolidado dentro dos 15 minutos.

## 4. Refatoração do Checkout (Order)

- [x] 4.1 Modificar o arquivo `orderService.js` no método `checkout` para considerar a transação válida usando as reservas efêmeras em vez de recalcular ativamente a disponibilidade contra o PostgreSQL.
- [x] 4.2 Alterar a conclusão do pedido para abater o estoque físico via Prisma, excluindo as chaves temporárias do carrinho e da reserva do Redis sem realizar a re-incrementação lógica.
