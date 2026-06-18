# Objetivo do Sistema

## Propósito Principal do Sistema
Fornecer um backend robusto, escalável e multi-tenant para operações de comércio eletrônico (E-commerce). O sistema serve como o motor central que processa desde a criação e autenticação de usuários até o catálogo de produtos, carrinho de compras, e a efetivação de pedidos e pagamentos.

## Problemas que ele resolve
- **Gerenciamento de Catálogo**: Permite o cadastro hierárquico (categorias) de produtos e garante buscas rápidas em catálogos grandes via cache otimizado.
- **Processo de Compras (Checkout)**: Valida de maneira atômica e segura os estoques e preços no momento da transação, transformando intenções (carrinho) em transações financeiras (pedidos).
- **Escalabilidade e Multi-inquilino**: Preparado para suportar múltiplas lojas (tenants) sob a mesma infraestrutura, reduzindo custos operacionais de hospedagem.
- **Autenticação Segura**: Implementa fluxos de controle de acesso eficientes através de JWT e Refresh Tokens em memória rápida (Redis).

## Principais Fluxos de Negócio
1. **Autenticação e Registro**: Usuários (Administradores ou Clientes) criam suas contas e recebem credenciais temporárias para realizar ações seguras.
2. **Navegação do Catálogo**: Clientes realizam buscas de produtos filtrados por categoria ou texto. Este fluxo foca fortemente em performance através de leitura em Cache.
3. **Gerenciamento de Carrinho**: Os usuários adicionam e removem itens de um carrinho efêmero associado à sua sessão. Está prevista a lógica de reserva de estoque temporária assim que o produto for pro carrinho, para evitar concorrências no checkout.
4. **Checkout e Gestão de Pedidos**: O carrinho é esvaziado, o estoque validado (snapshot do preço do produto) e o pedido criado e setado como "Pendente" para pagamento.
5. **Pagamento**: O sistema aguarda a confirmação (webhook ou gateway) que atualizará o status financeiro do pedido.

## Atores Envolvidos
- **Usuário Final (USER)**: Cliente da plataforma. Pode gerenciar seu perfil, ver produtos, adicionar itens ao carrinho e realizar compras.
- **Administrador (ADMIN)**: Gerente do e-commerce. Responsável por cadastrar produtos, estruturar categorias, e acompanhar os pedidos no geral.

## Funcionalidades Centrais
- Autenticação JWT baseada em Roles (RBAC).
- CRUD de Produtos e Categorias.
- Listagem paginada de produtos otimizada com Redis.
- Carrinho de Compras em memória.
- Criação transacional de Pedidos (`Order` e `OrderItem`).
- Integração de Status de Pagamento associado aos Pedidos (sem provedor definido por enquanto).
- Integração futura de serviços de Fretes e Logística.

## Visão de Produto
A aplicação é desenhada com a visão de um **Marketplace**, onde múltiplos lojistas/tenants coexistem na plataforma vendendo seus produtos. A identificação de qual ambiente está sendo acessado será gerida por injeção via Header.

## Contexto Operacional do Sistema
- Roda em ambiente conteinerizado (Docker, gerido por Docker Compose).
- Interage fortemente com um banco de dados PostgreSQL.
- Depende criticamente de uma instância Redis local/remota ativa para funcionar de maneira adequada.
