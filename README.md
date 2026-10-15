# Playwright BDD Framework

A TypeScript browser automation framework for SauceDemo. `playwright-bdd` generates Playwright Test cases from the Gherkin features, and the Playwright Test runner executes them.

## A. Project Architecture

```text
playwright-bdd-framework/
├── features/login.feature          # Valid and invalid login scenarios
├── features/checkout.feature       # Full login-to-order-confirmation journey
├── step-definitions/login.steps.ts # Login step implementations
├── step-definitions/checkout.steps.ts # Cart and checkout step implementations
├── pages/                           # Login, products, cart, and checkout page objects
├── hooks/hooks.ts                   # Per-scenario browser setup, screenshots, cleanup
├── config/                          # QA/UAT environment files and typed settings
├── support/world.ts                 # Typed Cucumber World for browser and page objects
├── test-runner/runner.ts            # Cucumber CLI invocation and HTML report generation
├── utils/                           # Home for future reusable helpers
├── reports/                         # Generated JSON and HTML reports
├── screenshots/                     # PNG screenshots from failed scenarios
├── cucumber.js                      # Shared Cucumber CLI configuration
├── playwright.config.ts             # Shared browser defaults, not a Playwright Test config
├── tsconfig.json                    # TypeScript and ts-node compiler settings
├── package.json                     # Dependencies and npm commands
└── README.md
```

Gherkin is the Given/When/Then syntax in the feature file. `playwright-bdd` connects each sentence to TypeScript step definitions and generates Playwright tests. The Page Object Model puts selectors and UI actions in focused page classes, so steps describe intent rather than browser mechanics. The `@e2e` scenario logs in, adds Sauce Labs Backpack to the cart, enters checkout information, reviews the order, completes it, and verifies the thank-you message.

## B. Installation

From this project directory:

```sh
npm install
```

## C. Install Playwright Browsers

```sh
npx playwright install chromium
```

For Firefox or WebKit, install the matching browser with `npx playwright install firefox` or `npx playwright install webkit`.

## D. Configure Environments

Copy `config/.env.example` to `config/.env.qa` and `config/.env.uat`, then set `BASE_URL`, `USERNAME`, and `PASSWORD` in both files. The `.env.qa` and `.env.uat` files are ignored by Git so local credentials are not committed. Select an environment with `TEST_ENV=qa` or `TEST_ENV=uat`. QA is the default. The selected file is authoritative for application values; this avoids Windows' built-in `USERNAME` variable replacing the SauceDemo account. `BROWSER`, `TIMEOUT`, and `HEADED` are read from the process environment.

For the public SauceDemo demo app, the supplied test account is `standard_user` / `secret_sauce`.

The browser can be selected with `BROWSER=chromium`, `firefox`, or `webkit`; `TIMEOUT` is in milliseconds. Set `HEADED=true` (or use the headed npm script) for a visible browser.

## E. Execute BDD Tests

```sh
npm test
```

`npm test` runs against QA by default. The environment-specific scripts generate the BDD tests and run them using the matching configuration:

```sh
npm run test:qa
npm run test:uat
```

These scripts work in both PowerShell and CI. They select `TEST_ENV=qa` or `TEST_ENV=uat` and use the corresponding `config/.env.*` file.

## F. Filter Tests

```sh
npm run test:qa -- --grep @smoke
```

Playwright Test options can be passed after `--`; for example, use `--grep @e2e` to run the end-to-end scenario.

## G. Generate the Allure Report

The Playwright run writes results to `allure-results`. Generate and open the report with:

```sh
npm run allure:generate
npm run allure:open
```

## J. Failure Screenshots

The Cucumber `After` hook detects failed scenarios, writes a full-page PNG under `screenshots/`, and attaches the image bytes to the scenario so they are present in the Cucumber JSON and HTML report. The hook then closes the page, context, and browser in a `finally` block. Screenshot failures are logged without hiding the original scenario failure.

## K. End-to-End Execution

The `Before` hook launches the configured Playwright browser and creates an isolated context, page, and page objects. Cucumber reads each Gherkin step and invokes its matching step definition. Definitions call the login, products, cart, and checkout page objects, which perform interactions with Playwright; Playwright drives the browser against SauceDemo. The `After` hook captures failure evidence and releases resources. Cucumber produces scenario results, which the runner converts into the HTML report. A failed scenario keeps the runner's exit code non-zero while the remaining scenarios continue by default.

```text
Feature File
     ↓
Cucumber
     ↓
Step Definition
     ↓
Page Object
     ↓
Playwright
     ↓
Browser
     ↓
Application
     ↓
Cucumber Report
```