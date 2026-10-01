import type { Page } from 'playwright';

export class CheckoutCompletePage {
  private readonly confirmationHeading;

  constructor(private readonly page: Page) {
    this.confirmationHeading = page.locator('[data-test="complete-header"]');
  }

  async verifyOrderConfirmation(): Promise<void> {
    await this.page.waitForURL('**/checkout-complete.html');
    const heading = await this.confirmationHeading.textContent();
    if (heading?.trim() !== 'Thank you for your order!') {
      throw new Error(`Expected order confirmation heading, received: ${heading?.trim() ?? 'no heading'}`);
    }
  }
}