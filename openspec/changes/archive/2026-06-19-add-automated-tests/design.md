## Contexto

O projeto é uma API, presumivelmente construída com Express (conforme visto no script `server.js` e Express nas dependências). Atualmente, não possui testes automatizados. As dependências `jest` e `supertest` já existem, sugerindo a intenção de implementar testes de unidade e integração. Além disso, estamos introduzindo Postman e Newman para testes de API/E2E.

## Objetivos / Não Objetivos

**Objetivos:**
- Fornecer uma estrutura de diretórios clara para testes de unidade e integração (`__tests__` ou `tests`).
- Escrever testes básicos para validar a configuração (ex: testar o endpoint `/health` caso exista, ou apenas uma asserção matemática simples para o Jest).
- Fornecer um arquivo JSON com a coleção do Postman no repositório (ex: `postman/collection.json`) contendo testes básicos para os endpoints da API.
- Integrar comandos de teste no `package.json` para habilitar a execução automatizada dos testes e das coleções do Postman via Newman.

**Não Objetivos:**
- Refatorar o código existente para atingir 100% de cobertura de testes.
- Escrever testes para todas as lógicas de negócio e endpoints existentes agora. (O objetivo é apenas preparar a infraestrutura e provar que funciona).
- Configurar um pipeline CI/CD completo (como GitHub Actions), embora os comandos npm facilitem isso posteriormente.

## Decisões

- **Test Runner:** O `jest` será utilizado como o executor de testes, pois já está presente em `devDependencies`. Ele tem configuração zero para setups padrão e é amplamente adotado.
- **Testes de Integração:** O `supertest` será utilizado para os testes de integração do Express, simulando requisições HTTP contra a aplicação sem precisar subir um servidor escutando em uma porta.
- **Testes E2E/API:** Coleções exportadas do Postman para o diretório `postman/` servirão como fonte da verdade para os contratos da API. O `newman` rodará essas coleções por linha de comando, possibilitando a integração com CI/CD.
- **Estrutura:**
  - `/tests` ou `/src/__tests__` para testes do Jest.
  - `/postman` para coleções e ambientes do Postman.

## Riscos / Trade-offs

- [Risco] As dependências de inicialização da aplicação (ex: conexões com banco de dados) podem deixar os testes de integração frágeis. -> Mitigação: Mockar (simular) as dependências quando apropriado, ou depender de um ambiente de banco de dados dedicado aos testes.
- [Risco] Duplicação de esforço entre os testes de integração do Supertest e os testes do Postman/Newman. -> Mitigação: Definir limites claros. Usar Supertest para validação interna de endpoints e Postman para testes puramente voltados ao contrato externo da API.
