# Playwright BDD Framework

A TypeScript browser automation framework for SauceDemo. Cucumber executes the Gherkin scenarios; Playwright supplies browser automation through its standard `Page` API. The Playwright Test runner is not used.

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

Gherkin is the Given/When/Then syntax in the feature file. Step definitions connect each sentence to TypeScript. The Page Object Model puts selectors and UI actions in focused page classes, so steps describe intent rather than browser mechanics. Cucumber's World holds scenario-specific state. `Browser` launches a browser process, `BrowserContext` isolates each scenario's cookies and storage, and `Page` represents its tab. The `@e2e` scenario logs in, adds Sauce Labs Backpack to the cart, enters checkout information, reviews the order, completes it, and verifies the thank-you message.

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

## E. Execute All BDD Tests

```sh
npm run test:bdd
```

To run using UAT settings:

```sh
TEST_ENV=uat npm run test:bdd
```

In PowerShell, use `$env:TEST_ENV='uat'; npm run test:bdd`.

## F. Execute a Specific Feature

```sh
npm run test:bdd -- features/login.feature
```

The same command accepts any feature path or Cucumber CLI option after `--`.

## G. Execute by Tag

Run a tagged scenario with the runner:

```sh
npm run test:bdd -- --tags '@smoke'
```

Or use the shortcuts `npm run test:bdd:smoke` and `npm run test:bdd:e2e`. The E2E shortcut runs the complete login-to-order-confirmation journey. To select a different tag expression with the custom runner, set `TAGS` in the environment.

## H. Run in Headed Mode

```sh
npm run test:bdd:headed
```

## I. Generate the HTML Report

Both `npm run test:bdd` and `npm run test:bdd:html` generate `reports/cucumber-report.html` and `reports/cucumber-report.json`. The HTML report includes feature/scenario names, step statuses and durations, failure details, and embedded failure screenshots when the reporter supports the attachment.

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