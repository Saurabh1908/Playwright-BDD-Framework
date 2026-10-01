import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import { chromium, firefox, webkit, type Browser, type BrowserContext, type BrowserType, type Page } from 'playwright';
import type { LoginPage } from '../pages/LoginPage';
import type { ProductsPage } from '../pages/ProductsPage';
import type { CartPage } from '../pages/CartPage';
import type { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import type { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import type { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

// Playwright Page is a tab; BrowserContext isolates cookies and storage per scenario.
export const browserTypes: Record<'chromium' | 'firefox' | 'webkit', BrowserType> = {
  chromium,
  firefox,
  webkit,
};

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  loginPage!: LoginPage;
  productsPage!: ProductsPage;
  cartPage!: CartPage;
  checkoutInformationPage!: CheckoutInformationPage;
  checkoutOverviewPage!: CheckoutOverviewPage;
  checkoutCompletePage!: CheckoutCompletePage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);