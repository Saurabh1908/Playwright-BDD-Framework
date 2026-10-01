import type { Page } from 'playwright';

export class CheckoutOverviewPage {
  private readonly pageTitle;
  private readonly finishButton;

  constructor(private readonly page: Page) {
    this.pageTitle = page.locator('[data-test="title"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async verifyContainsProduct(productName: string): Promise<void> {
    await this.page.waitForURL('**/checkout-step-two.html');
    const title = await this.pageTitle.textContent();
    if (title?.trim() !== 'Checkout: Overview') {
      throw new Error(`Expected the checkout overview page, received: ${title?.trim() ?? 'no heading'}`);
    }
    await this.page.getByText(productName, { exact: false }).first().waitFor({ state: 'visible' });
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }
}