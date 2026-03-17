# SQE Technical Test (Playwright: API + UI)

Author: Lenin Akurati

This repo includes:
- one API test (Swagger Petstore)
- one UI test (Sauce Demo)
- HTML and JUnit reporting

## What you need
- Node.js 18+
- npm

## Setup
```bash
npm install
npx playwright install
cp .env.example .env
```

## Run tests
Run all tests:
```bash
npm test
```

Run only UI:
```bash
npm run test:ui
```

Run only API:
```bash
npm run test:api
```

Run with visible browser:
```bash
HEADED=true npm test
```

## Reports
Open the Playwright HTML report:
```bash
npm run report
```

If port `9323` is busy:
```bash
npx playwright show-report --port 9324
```

Where to look:
- HTML report: `playwright-report/index.html`
- Raw files: `test-results/`

Notes:
- screenshots and videos are produced for UI tests
- API-only runs do not create browser screenshots/videos
- negative checks are shown with `[NEGATIVE]` steps in the report

## Optional
Run in cross-browser mode:
```bash
CROSS_BROWSER=true npm test
```

In the report:
- `[NEGATIVE]` and `[POSITIVE]` steps in the same test

## Submission
For this submission, I am also providing a zip file with the full project.

Test folders:
- API tests: `tests/api`
- UI tests: `tests/ui`
