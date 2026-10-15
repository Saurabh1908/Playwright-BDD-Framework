import { expect } from '@playwright/test';
import type { Page } from 'playwright';
import { settings } from '../config/config';

export class CheckoutOverviewPage {
  private readonly pageTitle;
  private readonly finishButton;

  constructor(private readonly page: Page) {
    this.pageTitle = page.locator('[data-test="title"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async verifyContainsProduct(productName: string): Promise<void> {
    await this.page.waitForURL('**/checkout-step-two.html');
    await expect(this.pageTitle).toHaveText('Checkout: Overview', { timeout: settings.timeout });
    await this.page.getByText(productName, { exact: false }).first().waitFor({ state: 'visible' });
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }
}