# Módulo: Products (Produtos)

## Objetivo do Módulo
Permitir a gerência e consumo eficiente do catálogo de itens disponibilizados para venda na plataforma.

## Responsabilidade Principal
Realizar o CRUD completo do catálogo, validar colisões de chave (ex: SKU), e realizar listagem altamente performática via leitura direta de Cache.

## Funcionalidades Existentes
- Criação e atualização de produtos, validando que o SKU seja único no banco de dados.
- Exclusão e Consulta individual.
- **Listagem Otimizada Paginada**: Sistema robusto de listagem com parâmetros (page, limit, search, categoryId) que interage com o Redis para manter a resposta imediata em requisições de frontend repetidas.

## Dependências Internas e Externas
- **Internas**: `productRepository` manipulando o modelo `Product`, utilitário `AppError`.
- **Externas**: Fortemente acoplado ao `redis` para a camada de caching.

## Módulos Relacionados
- **Categories**: Cada produto pertence obrigatoriamente a uma Categoria.
- **Orders**: A leitura dos dados reais do produto atua como fonte da verdade durante o Checkout de Pedidos.

## Pontos de Entrada
As rotas localizam-se em `productRoutes.js` conectadas primariamente na rota pública `/api/v1/products` via `productController.js`. 

## Fluxos Importantes
- **Fluxo de Listagem**: Verifica-se a Key combinada baseada nos filtros de querystring do Redis. Se houver HIT, retorna `JSON.parse` imediatamente. Caso ocorra MISS, lê o banco, formata com objeto de Paginação, grava no Redis (com TTL 60s) e depois retorna.

## Arquivos Críticos
- `productService.js`: Gerenciador de colisão e cache (Redis).
- `productRepository.js`: Foco especial na função `findAll` que lida com buscas parciais.

## Observações Técnicas e Débitos Identificados
- **Acoplamento**: O `productRepository` está exposto para o módulo de `orders`, permitindo que outros módulos ignorem as validações padronizadas que residem no `productService`.
- **Desatualização de Cache Subótima**: Não foi visto um mecanismo de expiração ativa de cache na deleção/atualização do produto (aparentemente depende-se da TTL passiva), o que pode levar a exibições inconsistentes na loja por até um minuto ou mais se estendido.
