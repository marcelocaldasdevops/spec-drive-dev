## Why

Os documentos centrais do projeto em `docs/` (Arquitetura e Objetivo do Sistema) foram escritos antes da implementação dos testes automatizados. Agora que temos Jest, Supertest, Newman e o reporter HTML configurados, esses documentos precisam refletir essa realidade. Além disso, falta um documento dedicado sobre como executar os testes e o que cada comando faz.

## What Changes

- Atualizar `docs/Arquitetura_do_Sistema.md` para incluir a camada de testes na arquitetura (Jest, Supertest, Newman, htmlextra reporter).
- Atualizar `docs/Objetivo_do_Sistema.md` para mencionar a qualidade garantida por testes automatizados.
- Criar `docs/Testes_e_Qualidade.md` com a documentação completa dos comandos de teste, explicações e exemplos de execução.

## Capabilities

### New Capabilities
- `docs-testing-guide`: Documento dedicado explicando todos os comandos de teste, ferramentas utilizadas e como interpretar os relatórios.

### Modified Capabilities
*(Nenhuma spec existente é modificada — apenas documentação atualizada)*

## Impact

- **Documentação**: Os 2 documentos existentes em `docs/` serão atualizados com seções sobre testes.
- **Novo documento**: `docs/Testes_e_Qualidade.md` será criado como referência completa de QA.
- **Sem impacto em código**: Nenhuma alteração em código-fonte ou dependências.
