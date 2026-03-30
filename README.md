# API Test Automation | Playwright & TypeScript

[![Playwright API Tests](https://github.com/Bayoc/Portfolio-Playwright-API/actions/workflows/playwright.yml/badge.svg)](https://github.com/Bayoc/Portfolio-Playwright-API/actions/workflows/playwright.yml)

Automated API test suite covering two practice APIs — **Automation Exercise** and **Restful-Booker**. Built with Playwright and TypeScript as part of my QA portfolio.

## Tech Stack

- Playwright (API testing via `request` fixture)
- TypeScript
- GitHub Actions (CI/CD)
- dotenv

## Project Structure
```
tests/
  automation-exercise/
    account-details.spec.ts   # GET user details by email
    brand-list.spec.ts        # GET brands list
    create-account.spec.ts    # POST create account
    delete-account.spec.ts    # DELETE account
    products-list.spec.ts     # GET products list
    search-product.spec.ts    # POST search product
    update-account.spec.ts    # PUT update account
    verify-login.spec.ts      # POST verify login
  restful-booker/
    bookings.spec.ts          # Full CRUD for bookings
    create-token.spec.ts      # POST auth token
    health-check.spec.ts      # GET health check
    rb.schema.spec.ts         # Schema validation (Ajv)
data/
  automation-exercises/
    endpoints.ts              # ENDPOINTS object + HttpMethod enum
    search.data.ts            # Edge case test data for search
    types.ts                  # Shared TypeScript types
    user.data.ts              # User account test data
  restful-booker/
    booking.data.ts           # Booking test data + BookingClient
    endpoints.ts              # ENDPOINTS object
    fixtures.ts               # Custom fixtures (rbToken)
    schemas.ts                # JSON Schema definitions (Ajv)
helpers/
  automation-exercises/
    api-helpers.ts            # Assertion helpers + test generators
  restful-booker/
    api-helpers.ts            # Auth headers helper
```

## Test Coverage

### Automation Exercise (54 tests)
- User account lifecycle: create, update, delete
- Login verification: valid credentials, invalid credentials, missing parameters
- Product listing and search — including edge cases (special characters, whitespace, long strings)
- Brand listing
- HTTP method validation per endpoint (405 handling)
- Security headers validation

### Restful-Booker (11 tests)
- Health check
- Token generation via `/auth`
- Full booking CRUD: create, read, update, delete
- Bearer token authentication via Cookie header
- Schema validation (Ajv)

## Key Patterns

- **ENDPOINTS object + HttpMethod enum** — no inline URL strings or magic method strings in tests
- **Test data files** — `user.data.ts`, `search.data.ts`, `booking.data.ts` separate test data from test logic
- **Helper functions** — reusable assertion helpers (`expectMethodNotSupported`, `expectEmptyProductsList`, `assertSecurityHeaders`)
- **generateUnsupportedMethodsTests** — single function generating HTTP method validation tests for each endpoint
- **Custom fixture** — automatic token injection into tests requiring authentication
- **afterEach cleanup** — test isolation ensuring clean state after each test
- **Negative testing** — missing parameters, invalid credentials, unsupported HTTP methods, edge case inputs
