## 1. Setup HTML Reporter

- [x] 1.1 Install `newman-reporter-htmlextra` as a dev dependency.
- [x] 1.2 Update `package.json` to change the `test:api` script to `newman run postman/collection.json -r cli,htmlextra`.

## 2. Expand Postman Collection

- [x] 2.1 Update `postman/collection.json` to include an `Auth` folder with a basic POST `/api/v1/auth/login` request.
- [x] 2.2 Update `postman/collection.json` to include a `Products` folder with a GET `/api/v1/products` request.
- [x] 2.3 Update `postman/collection.json` to include a `Categories` folder with a GET `/api/v1/categories` request.
- [x] 2.4 Update `postman/collection.json` to include basic requests for Cart, Orders, Payments, and Users to ensure full routing coverage.

## 3. Automation and Verification

- [x] 3.1 Run `npm run test:api` locally against the running server to verify all new requests are executed and an HTML report is generated in the `newman` folder.
