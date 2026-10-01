import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { settings } from '../config/config';
import type { CustomWorld } from '../support/world';
import { browserTypes } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

setDefaultTimeout(settings.timeout);

// Hooks create an isolated browser session per scenario and reliably dispose of it afterward.
Before(async function (this: CustomWorld) {
  const browserType = browserTypes[settings.browserName];
  this.browser = await browserType.launch({ headless: settings.headless });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
  this.productsPage = new ProductsPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutInformationPage = new CheckoutInformationPage(this.page);
  this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
  this.checkoutCompletePage = new CheckoutCompletePage(this.page);
});

After(async function (this: CustomWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const screenshotsDirectory = resolve(process.cwd(), 'screenshots');
      await mkdir(screenshotsDirectory, { recursive: true });
      const safeName = scenario.pickle.name.replace(/[^a-z0-9-_]+/gi, '-').replace(/^-|-$/g, '');
      const screenshotPath = resolve(
        screenshotsDirectory,
        `${safeName || 'failed-scenario'}-${Date.now()}.png`,
      );
      const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
      await this.attach(screenshot, 'image/png');
      console.error(`Failure screenshot saved: ${screenshotPath}`);
    }
  } catch (error) {
    console.error('Could not capture or attach the failure screenshot:', error);
  } finally {
    await this.page?.close().catch((error: unknown) => console.error('Could not close page:', error));
    await this.context?.close().catch((error: unknown) => console.error('Could not close context:', error));
    await this.browser?.close().catch((error: unknown) => console.error('Could not close browser:', error));
  }
});