## Context

The project is growing and we need to maintain high-quality documentation. We've just implemented an API E2E test suite running on port 3001, but this needs to be documented so developers know how to run tests and where things are located.

## Goals / Non-Goals

**Goals:**
- Document `src/config`: Explain environment variables and database configuration.
- Document `src/middlewares`: Explain the authentication and error handling middlewares.
- Document `src/utils`: Explain utility functions.
- Document `tests/`: Explain how to run Jest and Newman tests, and mention the port 3001 requirement.

**Non-Goals:**
- Refactoring actual code. This is purely a documentation change.

## Decisions

- **Format:** We will use standard Markdown for all READMEs.
- **Language:** We will write the internal READMEs in Portuguese to match the team's primary language.
