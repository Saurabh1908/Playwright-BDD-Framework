import type { Page } from 'playwright';
import { settings } from '../config/config';

// The Page Object Model keeps selectors and browser interactions out of step definitions.
export class LoginPage {
  private readonly usernameInput;
  private readonly passwordInput;
  private readonly loginButton;
  private readonly productsPageTitle;
  private readonly errorMessage;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.productsPageTitle = page.locator('[data-test="title"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(settings.baseUrl);
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.page.waitForURL('**/inventory.html', { timeout: settings.timeout });
    await this.productsPageTitle.waitFor({ state: 'visible', timeout: settings.timeout });
    const title = await this.productsPageTitle.textContent();
    if (title?.trim() !== 'Products') {
      throw new Error(`Expected the Products page after login, received: ${title?.trim() ?? 'no heading'}`);
    }
  }

  async verifyLoginError(): Promise<void> {
    const message = await this.errorMessage.textContent();
    if (!message?.includes('Username and password do not match')) {
      throw new Error(`Expected an invalid-credentials message, received: ${message ?? 'no message'}`);
    }
  }
}