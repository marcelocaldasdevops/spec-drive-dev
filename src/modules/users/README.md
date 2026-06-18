# Módulo: Users (Usuários)

## Objetivo do Módulo
Gerir as identidades e as credenciais das pessoas (físicas ou do sistema) que utilizam a aplicação.

## Responsabilidade Principal
Centralizar as rotinas de banco de dados e controle de usuários, servindo como suporte aos módulos que necessitam referenciar um cliente ou admin.

## Funcionalidades Existentes
*(Hipótese de leitura)*
- Busca detalhada de usuário por E-mail (para fins do módulo de Autenticação).
- Gerenciamento básico de perfil.

## Dependências Internas e Externas
- **Internas**: `userRepository` vinculado ao modelo `User` do Prisma.
- **Externas**: Nenhuma de destaque fora o Prisma.

## Módulos Relacionados
- **Auth**: O módulo de autenticação é essencialmente o cliente que mais consume as rotinas deste módulo (apesar de o fazer atualmente por meio direto do Repository).
- **Orders**: Todos os pedidos possuem um elo forte com o Identificador (userId).

## Pontos de Entrada
`userRoutes.js` exposto tipicamente em `/api/v1/users`, conectado através de `userController.js`. Geralmente protegido sob escopo de Admin ou permissão do próprio dono do recurso.

## Fluxos Importantes
- **Resolução de Autenticação**: O repository é chamado para confirmar senhas salvas durante o Login.

## Arquivos Críticos
- `userRepository.js`: Isolamento da lógica de consulta ao banco de contas.
- `userService.js`: Regras de negócio restritas aos dados das contas.

## Observações Técnicas e Débitos Identificados
- **Pouco Uso do Service**: O módulo vizinho (`auth`) ignora a camada `userService` e acessa diretamente a camada de repository de usuários.
