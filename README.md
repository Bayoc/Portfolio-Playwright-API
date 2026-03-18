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
  ae.auth.spec.ts       # Automation Exercise – login, registration
  ae.products.spec.ts   # Automation Exercise – products, brands, search
  rb.bookings.spec.ts   # Restful-Booker – full CRUD with auth
  fixtures.ts           # Custom fixtures (rbToken)
api/
  rb.booking.client.ts  # API Client for Restful-Booker
types.ts                # Shared TypeScript interfaces
```
 
## Test Coverage
 
### Automation Exercise (13 tests)
- GET/POST/PUT/DELETE method validation
- User account lifecycle: create, update, delete
- Login verification: valid credentials, invalid credentials, missing parameters
- Product search and brand listing
 
### Restful-Booker (7 tests)
- Health check
- Token generation via `/auth`
- Full booking CRUD: create, read, update, delete
- Bearer token authentication via Cookie header
 
## Key Patterns
 
- **API Client** (`rb.booking.client.ts`) – reusable class encapsulating booking operations, analogous to Page Object Model in UI testing
- **Custom fixture** – automatic token injection into tests requiring authentication
- **create → verify → cleanup** – test isolation pattern ensuring each test run starts with a clean state
- **Negative testing** – missing parameters, invalid credentials, unsupported HTTP methods
 