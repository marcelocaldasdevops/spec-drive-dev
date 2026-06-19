## Why

The project currently has a basic Postman and Newman setup with a single health-check test. To ensure the reliability of the entire application, we need to expand our E2E tests to cover all API endpoints (auth, cart, products, orders, payments, categories, users) and generate a comprehensive HTML report of the test results for better visibility.

## What Changes

- Expand the existing Postman collection to include tests for all modules (auth, products, users, cart, orders, etc.).
- Install `newman-reporter-htmlextra` to generate detailed HTML reports.
- Update `package.json` scripts to run Newman with the HTML reporter.
- Ensure the tests are fully automated and run against the local server.

## Capabilities

### New Capabilities
- `api-endpoints-coverage`: Full coverage of all API endpoints using Postman.
- `test-html-reporting`: Generation of HTML test reports using Newman htmlextra reporter.

### Modified Capabilities
- `postman-newman-tests`: Updated to include the new reporting mechanism and full endpoint coverage.

## Impact

- **Postman Collection**: `postman/collection.json` will be significantly expanded.
- **Dependencies**: `newman-reporter-htmlextra` will be added to `devDependencies`.
- **Scripts**: `npm run test:api` will be updated to output reports to a new `/newman` directory.
