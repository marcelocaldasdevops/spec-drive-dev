# Módulo: Categories (Categorias)

## Objetivo do Módulo
Gerenciar a estruturação lógica, a navegação e o agrupamento do catálogo de produtos.

## Responsabilidade Principal
Realizar o CRUD básico de entidades hierárquicas que tipificam produtos no banco de dados.

## Funcionalidades Existentes
*(Hipótese baseada no contexto geral)*
- Cadastro de categorias pai.
- Cadastro de subcategorias (auto-relacionamento).
- Listagem e leitura de categorias ativas.

## Dependências Internas e Externas
- **Internas**: `categoryRepository` manipulando o modelo Prisma `Category`.
- **Externas**: Nenhuma crítica para além do Prisma ORM.

## Módulos Relacionados
- **Products**: Cada produto está atrelado a uma categoria na base de dados (`categoryId`).

## Pontos de Entrada
`categoryRoutes.js` baseadas em `/api/v1/categories`, expostas através de `categoryController.js`.

## Fluxos Importantes
- **Estruturação de Navegação**: Resoluções recursivas das subcategorias para o frontend montar a árvore de navegação principal da loja.

## Arquivos Críticos
- `categoryRepository.js`: Contém o controle de query para as hierarquias.
- `categoryService.js`: Gerencia regras lógicas de categorias.

## Observações Técnicas e Débitos Identificados
- Estrutura de subcategorias precisa de cuidado se possuir muitas profundidades (limitações de recursão com o ORM).
