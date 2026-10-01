import dotenv from 'dotenv';
import { resolve } from 'node:path';

const environment = process.env.TEST_ENV ?? 'qa';
if (environment !== 'qa' && environment !== 'uat') {
  throw new Error(`Unsupported TEST_ENV "${environment}". Choose "qa" or "uat".`);
}

// Windows defines USERNAME for the local account, so the selected test env file must win.
dotenv.config({ path: resolve(__dirname, `.env.${environment}`), override: true });

function requiredEnvironmentValue(name: 'BASE_URL' | 'USERNAME' | 'PASSWORD'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Set it in config/.env.${environment} or the process environment.`);
  }
  return value;
}

const browserName = process.env.BROWSER ?? 'chromium';
if (!['chromium', 'firefox', 'webkit'].includes(browserName)) {
  throw new Error(`Unsupported BROWSER "${browserName}". Choose chromium, firefox, or webkit.`);
}

const timeout = Number(process.env.TIMEOUT ?? 15000);
if (!Number.isFinite(timeout) || timeout <= 0) {
  throw new Error('TIMEOUT must be a positive number of milliseconds.');
}

export const settings = {
  environment,
  baseUrl: requiredEnvironmentValue('BASE_URL'),
  username: requiredEnvironmentValue('USERNAME'),
  password: requiredEnvironmentValue('PASSWORD'),
  browserName: browserName as 'chromium' | 'firefox' | 'webkit',
  headless: process.env.HEADED === 'true' ? false : process.env.HEADLESS !== 'false',
  timeout,
};