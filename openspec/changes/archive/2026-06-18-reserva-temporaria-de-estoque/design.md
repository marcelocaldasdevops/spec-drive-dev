## Context
O sistema atual valida estoque de produtos apenas no momento de consolidação do checkout (`orderService.js`). Com a escalada da plataforma e o modelo de Marketplace, essa abordagem é vulnerável a condições de corrida (*race conditions*), nas quais múltiplos clientes podem tentar comprar as últimas unidades de um produto e sofrerem erro no último passo da jornada. O Redis já é utilizado para gerenciar a sessão efêmera e o cache de produtos, sendo a ferramenta natural para intermediar esse bloqueio provisório.

## Goals / Non-Goals

**Goals:**
- Implementar uma reserva lógica e temporária de estoque no Redis acionada na inserção do item no carrinho (`cartService`).
- Liberar a reserva automaticamente (rollback lógico) quando o TTL (Time-to-Live) da chave do carrinho expirar.
- Refatorar a consolidação da compra no checkout (`orderService`) para consumir e confirmar as reservas já detidas pelo usuário.

**Non-Goals:**
- Modificar o fluxo transacional do banco de dados para incluir "pedidos em rascunho" travando o estoque permanentemente. A reserva será apenas efêmera.
- Modificar a validação do Gateway de Pagamento, isso será tratado em momento futuro.

## Decisions

1. **Uso de Contadores Atômicos no Redis (INCRBY / DECRBY)**
   - Utilizaremos as funções atômicas do Redis para decrementar as unidades de uma chave virtual que representa o estoque disponível daquele produto no cache (`stock:available:{productId}`).
   - Ao adicionar no carrinho, o `cartService` roda o decremento. Se falhar (ficar < 0), ele falha a adição.
   - Alternativas consideradas: Uso do banco relacional com _Pessimistic Locking_. Descartada pois prenderia o throughput da leitura de catálogo, que é vital para o Marketplace.

2. **Expiração Sincronizada (TTL e Eventos de Expiração)**
   - O TTL do carrinho (ex: 15 minutos) determinará o tempo de vida do lock.
   - Precisaremos escutar eventos de expiração de chaves no Redis (Keyspace Notifications) OU implementar uma lógica de compensação no frontend/backend caso o carrinho expire silenciosamente. Como Keyspace Notifications podem ter falhas de entrega de mensagem, adotaremos um design de registro de alocações: `cart:reserve:{userId}:{productId}` que expira junto com o carrinho. Ao realizar a expiração, o estoque deve ser reposto.

## Risks / Trade-offs

- **[Risco] Vazamento de Estoque Reservado**: Se o Node.js falhar antes de re-incrementar o estoque devolvido por carrinhos expirados, o produto ficará invisível.
  - **Mitigação**: O evento de expiração ou um CRON job de auditoria pode varrer inconsistências esporádicas comparando a soma das reservas reais abertas com o estoque fixo do DB.
- **[Risco] Redis como SPOF Crítico**: O Redis agora será vital para a transação comercial (adicionar ao carrinho).
  - **Mitigação**: Failover garantido para o Redis e falha graciosa da API. Se o cache cair, a venda falha com erro tratável.
