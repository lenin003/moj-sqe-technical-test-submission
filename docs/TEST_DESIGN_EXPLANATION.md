# Test Design Explanation

This solution includes one API test and one UI test, as requested.

## Why I split API and UI tests
- API tests are faster and usually more stable.
- UI tests are important for real user flows, but they are slower and can be more flaky.
- So I keep business checks at API level where possible, and keep UI tests focused on key journeys.

## Implemented API test (Petstore `/pet`)
Covered in one test:
- `[POSITIVE]` create a pet and fetch it back
- `[NEGATIVE]` call `GET /pet/{id}` with an invalid id and verify error response (`400` or `404`)

Other details:
- Payload includes `photoUrls` so it matches the expected Petstore model shape
- Positive path checks key response fields (`id`, `name`, `photoUrls`, `status`)
- Negative path checks both status code and response body fields
- Cleanup is best effort (`deletePet`)

## Implemented UI test (SauceDemo)
Covered in one test:
- `[NEGATIVE]` try to open `/inventory.html` before login, verify redirect to login page
- `[POSITIVE]` login, add item to cart, verify cart has an item

Other details:
- Uses page objects for maintainability
- Adds screenshot attachments for both negative and positive steps

## Extra tests I would add next (priority order)

### SauceDemo (UI)
1. Invalid login and locked user checks
2. Full checkout flow (happy and unhappy paths)
3. Remove from cart and empty cart state
4. Sorting and filtering behavior
5. Session behavior (logout, direct URL access after logout)
6. Basic accessibility checks on key pages

### Petstore (API)
1. Schema/contract validation for responses
2. Broader CRUD coverage (`/pet`, `/store`)
3. Invalid payload and required-field validation
4. Response time thresholds for key endpoints
5. Error response consistency across endpoints
