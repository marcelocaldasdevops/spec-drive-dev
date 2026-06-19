## Context

O projeto implementou recentemente uma infraestrutura completa de testes automatizados:
- **Jest** como test runner (testes unitários e integração)
- **Supertest** para testes de integração HTTP sem abrir porta
- **Newman** como executor de coleções Postman via CLI
- **newman-reporter-htmlextra** para geração de relatórios HTML visuais
- Porta da API para testes E2E: **3001**

Os documentos em `docs/` foram escritos antes dessas adições e precisam ser atualizados.

## Goals / Non-Goals

**Goals:**
- Adicionar uma seção "Testes e Qualidade" no `Arquitetura_do_Sistema.md`.
- Adicionar menção a testes automatizados no `Objetivo_do_Sistema.md`.
- Criar `docs/Testes_e_Qualidade.md` com:
  - Tabela de comandos (`npm test`, `npm run test:api`)
  - Explicação de cada ferramenta (Jest, Supertest, Newman, htmlextra)
  - Instruções de como subir o servidor na porta 3001 para testes E2E
  - Como interpretar o relatório HTML gerado

**Non-Goals:**
- Alterar código-fonte ou configurações de teste.
- Reescrever completamente os documentos existentes.
