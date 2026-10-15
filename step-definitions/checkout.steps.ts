import { When, Then } from '../support/playwrightFixtures';

When('I add {string} to the cart', async ({ productsPage }, productName: string) => {
  await productsPage.addProductToCart(productName);
});

When('I open the cart', async ({ productsPage }) => {
  await productsPage.openCart();
});

Then('the cart should contain {string}', async ({ cartPage }, productName: string) => {
  await cartPage.verifyContainsProduct(productName);
});

When('I proceed to checkout', async ({ cartPage }) => {
  await cartPage.proceedToCheckout();
});

When(
  'I enter checkout information with first name {string}, last name {string}, and postal code {string}',
  async ({ checkoutInformationPage }, firstName: string, lastName: string, postalCode: string) => {
    await checkoutInformationPage.enterInformation(firstName, lastName, postalCode);
    await checkoutInformationPage.continueToOverview();
  },
);

Then('the checkout overview should show {string}', async ({ checkoutOverviewPage }, productName: string) => {
  await checkoutOverviewPage.verifyContainsProduct(productName);
});

When('I finish the order', async ({ checkoutOverviewPage }) => {
  await checkoutOverviewPage.finishOrder();
});

Then('I should see the order confirmation message', async ({ checkoutCompletePage }) => {
  await checkoutCompletePage.verifyOrderConfirmation();
});