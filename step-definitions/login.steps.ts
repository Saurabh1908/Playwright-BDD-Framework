import { Given, When, Then } from '@cucumber/cucumber';
import { settings } from '../config/config';
import type { CustomWorld } from '../support/world';

// Step definitions translate readable Gherkin sentences into page-object calls.
Given('I navigate to the login page', async function (this: CustomWorld) {
  await this.loginPage.navigateToLoginPage();
});

When('I enter valid username and password', async function (this: CustomWorld) {
  await this.loginPage.enterUsername(settings.username);
  await this.loginPage.enterPassword(settings.password);
});

When('I enter invalid username and password', async function (this: CustomWorld) {
  await this.loginPage.enterUsername(`${settings.username}-invalid`);
  await this.loginPage.enterPassword(`${settings.password}-invalid`);
});

When('I click the login button', async function (this: CustomWorld) {
  await this.loginPage.clickLogin();
});

Then('I should be successfully logged in', async function (this: CustomWorld) {
  await this.loginPage.verifySuccessfulLogin();
});

Then('I should see a login error', async function (this: CustomWorld) {
  await this.loginPage.verifyLoginError();
});