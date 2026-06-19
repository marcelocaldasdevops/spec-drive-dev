## Context

We previously established a baseline for API testing using Postman and Newman, verifying the `/health` endpoint. The user now wants to achieve full API coverage and generate HTML reports of the test executions. 

## Goals / Non-Goals

**Goals:**
- Include basic requests and assertions for each module found in `src/modules`.
- Generate an HTML report of the Newman run.
- Keep the tests simple enough to run without extensive database mocking at first (just testing routing and basic responses).

**Non-Goals:**
- Setting up a complex database seeding mechanism just for these tests (unless strictly required). We will focus on basic coverage (e.g. 401s for auth routes, 200s for public GET routes).

## Decisions

- **Test Scope:** The collection will include folders for Auth, Cart, Products, Orders, Payments, Categories, and Users. We will add basic requests for each.
- **Reporter:** `newman-reporter-htmlextra` is chosen because it produces beautiful, easily readable HTML reports without extra configuration.
- **Automation:** The `test:api` script will be updated to use `-r cli,htmlextra`. 

## Risks / Trade-offs

- [Risk] Some endpoints require authentication. -> Mitigation: We will include an Auth request that sets an environment variable for the token, or we will just test that protected routes correctly return 401 Unauthorized when no token is provided, which is still a valid test of the routing mechanism.
