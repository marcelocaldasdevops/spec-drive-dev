## ADDED Requirements

### Requirement: Adição e Reserva de Estoque
O sistema MUST garantir que, ao ser inserido no carrinho, o produto tenha seu estoque lógico imediatamente decrementado no Redis para impedir que outros usuários o comprem simultaneamente.

#### Scenario: Produto com saldo positivo no Redis
- **WHEN** o usuário adiciona 1 unidade do produto "Teclado Mecânico" no carrinho
- **THEN** o sistema decrementa 1 da chave Redis `stock:available:{productId}`
- **THEN** o sistema registra a posse da reserva na chave `cart:reserve:{userId}:{productId}`
- **THEN** o item é alocado com sucesso no carrinho do usuário

#### Scenario: Produto com saldo zerado no Redis
- **WHEN** o usuário tenta adicionar 1 unidade do produto "Monitor" que tem `stock:available` em 0
- **THEN** o sistema bloqueia a transação e informa que não há mais unidades disponíveis para compra.

### Requirement: Remoção ou Liberação do Carrinho
O sistema MUST garantir a devolução integral (rollback) do estoque provisório ao inventário disponível no cache sempre que o item for excluído do carrinho.

#### Scenario: Exclusão manual do item
- **WHEN** o usuário decide retirar o item "Teclado Mecânico" do carrinho
- **THEN** o sistema remove a chave respectiva de reserva no Redis
- **THEN** o sistema incrementa de volta a quantidade do item na chave `stock:available:{productId}`

#### Scenario: Expiração por inatividade (TTL)
- **WHEN** o carrinho atinge o TTL de 15 minutos
- **THEN** o sistema detecta a expiração do evento ou roda processo de limpeza
- **THEN** o sistema recupera as quantidades perdidas nas chaves expiradas e as reintegra na `stock:available:{productId}`

### Requirement: Efetivação do Checkout 
O sistema MUST processar o checkout utilizando a reserva efêmera prévia, não precisando concorrer novamente pela obtenção total da disponibilidade.

#### Scenario: Checkout sem concorrência
- **WHEN** o usuário fecha o pedido tendo o "Teclado Mecânico" reservado no Redis
- **THEN** o banco relacional PostgreSQL debita a quantidade de modo permanente
- **THEN** as chaves efêmeras do carrinho e da reserva deste usuário são deletadas
