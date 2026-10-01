import { settings } from './config/config';

// Shared Playwright browser settings; Cucumber, not Playwright Test, runs the scenarios.
export default {
  browserName: settings.browserName,
  headless: settings.headless,
  timeout: settings.timeout,
  baseURL: settings.baseUrl,
};