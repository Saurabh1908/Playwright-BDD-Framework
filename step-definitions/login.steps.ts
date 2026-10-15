import { Given, When, Then } from '../support/playwrightFixtures';
import { settings } from '../config/config';

// Step definitions translate readable Gherkin sentences into page-object calls.
Given('I navigate to the login page', async ({ loginPage }) => {
  await loginPage.navigateToLoginPage();
});

When('I enter valid username and password', async ({ loginPage }) => {
  await loginPage.enterUsername(settings.username);
  await loginPage.enterPassword(settings.password);
});

When('I enter invalid username and password', async ({ loginPage }) => {
  await loginPage.enterUsername(`${settings.username}-invalid`);
  await loginPage.enterPassword(`${settings.password}-invalid`);
});

When('I click the login button', async ({ loginPage }) => {
  await loginPage.clickLogin();
});

Then('I should be successfully logged in', async ({ loginPage }) => {
  await loginPage.verifySuccessfulLogin();
});

Then('I should see a login error', async ({ loginPage }) => {
  await loginPage.verifyLoginError();
});