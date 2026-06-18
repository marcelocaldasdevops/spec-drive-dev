# Módulo: Orders (Pedidos)

## Objetivo do Módulo
Efetivar intenções de compras dos usuários e orquestrar a confirmação financeira (pagamentos).

## Responsabilidade Principal
Receber os dados do carrinho de compras, consolidar preços e estoques em tempo real e criar o registro financeiro final (Snapshot de preços da compra) no banco de dados com segurança transacional.

## Funcionalidades Existentes
- Listagem de pedidos de um usuário específico.
- **Checkout**: Consolidação atômica de validação do produto, baixa no carrinho, e registro do pedido e seus itens.

## Dependências Internas e Externas
- **Internas**: `cartService`, `productRepository`, `orderRepository`, utilitário `AppError`, `config/logger` e acesso bruto ao `config/redis`.
- **Externas**: Nenhuma de nota fora do ORM.

## Módulos Relacionados
- **Cart**: Dependência crítica para o input de checkout.
- **Products**: Dependência crítica para checagem do estoque e status do produto no ato do checkout.
- **Payments**: O pedido precisa ser pago por um módulo externo/financeiro após ser consolidado.

## Pontos de Entrada
Roteamento via `orderRoutes.js` (geralmente sob `/api/v1/orders`), delegado para `orderController.js`.

## Fluxos Importantes
- **Fluxo de Checkout**: `orderService.checkout` é o coração do sistema. Ele busca o carrinho -> recalcula valores -> checa o `productRepository` validando regras de estoque e status do produto -> salva tudo atomicamente -> expira/deleta a chave do carrinho no Redis. Emite evento (log) no fim.

## Arquivos Críticos
- `orderService.js`: Principal core-business rule de conversão da aplicação.
- `orderRepository.js`: Local onde transações complexas Prisma (Transações Interativas) garantem atomicidade.

## Observações Técnicas e Débitos Identificados
- **Débito Arquitetural Crítico (Violação de Fronteira)**: O `orderService` consome o `productRepository` diretamente. Deveria consumir o `productService` ou resolver estoques assincronamente em uma arquitetura limpa.
- **Débito de Isolamento**: Limpa o Redis de forma explícita/bruta apagando a chave que logicamente "pertence" ao módulo de Carrinho (`cart:default:userId`).
- **Emissão de Eventos Fake**: Emite evento "order.created" usando o logger, demonstrando que um barramento de eventos real será necessário para evitar o bloqueio sincrono com integrações de parceiros ou envio de e-mails.
