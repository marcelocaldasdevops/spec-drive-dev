# Módulo: Auth (Autenticação)

## Objetivo do Módulo
Garantir o controle de acesso seguro à API, permitindo o registro de novos usuários e a validação de identidades através de credenciais.

## Responsabilidade Principal
Processar o registro de clientes, validar credenciais de login (email e senha) e emitir tokens de autenticação (JWT) e tokens de renovação (Refresh Tokens).

## Funcionalidades Existentes
- Registro de novos usuários com senha hasheada.
- Login de usuários existentes com verificação de hash.
- Geração de Access Token via JWT.
- Criação e armazenamento seguro de Refresh Tokens usando Redis.

## Dependências Internas e Externas
- **Internas**: `userRepository` (acesso a dados de usuário), pacote `utils/token`, `config/redis`, utilitário `AppError`.
- **Externas**: `bcrypt` (para criptografia de senha), `jsonwebtoken` (para lidar com o JWT).

## Módulos Relacionados
- **Users**: Depende fortemente do `userRepository` para checar existências prévias de emails e criar o registro no banco de dados.

## Pontos de Entrada
As rotas definidas em `authRoutes.js`, típicas para `/api/v1/auth/register` e `/api/v1/auth/login`. O controle é feito em `authController.js`.

## Fluxos Importantes
- **Fluxo de Login**: Controller recebe (email, senha) -> `authService.login` verifica no `userRepository` -> Compara senha via `bcrypt` -> Gera Access/Refresh Tokens -> Salva Refresh Token no Redis (`refresh:{userId}`) com expiração de 7 dias.

## Arquivos Críticos
- `authService.js`: Onde a orquestração do Bcrypt e Redis é centralizada.
- `authValidators.js`: Previne falhas de injeção e dados inválidos na borda da API.

## Observações Técnicas e Débitos Identificados
- **Débito de Acoplamento**: Usa diretamente o repositório (`userRepository`) de outro módulo em vez da camada de serviço (`userService`).
- **Débito Técnico**: Ausência clara de rotas documentadas ou implementadas para Logout (invalidação do Refresh Token no Redis) ou renovação explícita do token.
