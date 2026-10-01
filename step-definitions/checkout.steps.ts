import { When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

When('I add {string} to the cart', async function (this: CustomWorld, productName: string) {
  await this.productsPage.addProductToCart(productName);
});

When('I open the cart', async function (this: CustomWorld) {
  await this.productsPage.openCart();
});

Then('the cart should contain {string}', async function (this: CustomWorld, productName: string) {
  await this.cartPage.verifyContainsProduct(productName);
});

When('I proceed to checkout', async function (this: CustomWorld) {
  await this.cartPage.proceedToCheckout();
});

When(
  'I enter checkout information with first name {string}, last name {string}, and postal code {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    await this.checkoutInformationPage.enterInformation(firstName, lastName, postalCode);
    await this.checkoutInformationPage.continueToOverview();
  },
);

Then('the checkout overview should show {string}', async function (this: CustomWorld, productName: string) {
  await this.checkoutOverviewPage.verifyContainsProduct(productName);
});

When('I finish the order', async function (this: CustomWorld) {
  await this.checkoutOverviewPage.finishOrder();
});

Then('I should see the order confirmation message', async function (this: CustomWorld) {
  await this.checkoutCompletePage.verifyOrderConfirmation();
});