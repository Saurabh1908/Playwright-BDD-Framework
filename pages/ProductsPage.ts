import type { Locator, Page } from 'playwright';

export class ProductsPage {
  private readonly pageTitle: Locator;
  private readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item').filter({
      has: this.page.getByText(productName, { exact: true }),
    });
    if ((await product.count()) !== 1) {
      throw new Error(`Expected one inventory item named "${productName}".`);
    }
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    if (!(await this.pageTitle.isVisible())) {
      throw new Error('The products page is not visible.');
    }
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html');
  }
}