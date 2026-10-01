import type { Page } from 'playwright';

export class CartPage {
  private readonly checkoutButton;

  constructor(private readonly page: Page) {
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async verifyContainsProduct(productName: string): Promise<void> {
    await this.page.waitForURL('**/cart.html');
    const productNameOnPage = this.page.getByText(productName, { exact: true });
    if ((await productNameOnPage.count()) !== 1) {
      throw new Error(`The cart should contain exactly one "${productName}" item.`);
    }
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }
}