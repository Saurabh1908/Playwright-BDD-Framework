// Generated from: features\checkout.feature
import { test } from "../../support/playwrightFixtures.ts";

test.describe('Complete checkout', () => {

  test('Complete a purchase from login through order confirmation', { tag: ['@e2e', '@regression'] }, async ({ Given, When, Then, And, cartPage, checkoutCompletePage, checkoutInformationPage, checkoutOverviewPage, loginPage, productsPage }) => { 
    await Given('I navigate to the login page', null, { loginPage }); 
    await When('I enter valid username and password', null, { loginPage }); 
    await And('I click the login button', null, { loginPage }); 
    await Then('I should be successfully logged in', null, { loginPage }); 
    await When('I add "Sauce Labs Backpack" to the cart', null, { productsPage }); 
    await And('I open the cart', null, { productsPage }); 
    await Then('the cart should contain "Sauce Labs Backpack"', null, { cartPage }); 
    await When('I proceed to checkout', null, { cartPage }); 
    await And('I enter checkout information with first name "Ada", last name "Lovelace", and postal code "90210"', null, { checkoutInformationPage }); 
    await Then('the checkout overview should show "Sauce Labs Backpack"', null, { checkoutOverviewPage }); 
    await When('I finish the order', null, { checkoutOverviewPage }); 
    await Then('I should see the order confirmation message', null, { checkoutCompletePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\checkout.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@e2e","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I enter valid username and password","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And I click the login button","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then I should be successfully logged in","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Backpack\" to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Backpack\"","children":[{"start":7,"value":"Sauce Labs Backpack","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I open the cart","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the cart should contain \"Sauce Labs Backpack\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Sauce Labs Backpack\"","children":[{"start":25,"value":"Sauce Labs Backpack","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When I proceed to checkout","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"And I enter checkout information with first name \"Ada\", last name \"Lovelace\", and postal code \"90210\"","stepMatchArguments":[{"group":{"start":45,"value":"\"Ada\"","children":[{"start":46,"value":"Ada","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":62,"value":"\"Lovelace\"","children":[{"start":63,"value":"Lovelace","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":90,"value":"\"90210\"","children":[{"start":91,"value":"90210","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then the checkout overview should show \"Sauce Labs Backpack\"","stepMatchArguments":[{"group":{"start":34,"value":"\"Sauce Labs Backpack\"","children":[{"start":35,"value":"Sauce Labs Backpack","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I finish the order","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then I should see the order confirmation message","stepMatchArguments":[]}]},
]; // bdd-data-end