import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import reporter from 'cucumber-html-reporter';
import '../config/config';

// This runner delegates scenario execution to Cucumber CLI, then turns its JSON into HTML.
async function main(): Promise<void> {
  const projectRoot = resolve(__dirname, '..');
  const reportsDirectory = resolve(projectRoot, 'reports');
  const cucumberCli = resolve(projectRoot, 'node_modules/@cucumber/cucumber/bin/cucumber.js');
  const jsonReport = resolve(reportsDirectory, 'cucumber-report.json');
  const htmlReport = resolve(reportsDirectory, 'cucumber-report.html');
  const cucumberArguments = process.argv.slice(2);
  if (process.env.TAGS) {
    cucumberArguments.push('--tags', process.env.TAGS);
  }

  await mkdir(reportsDirectory, { recursive: true });
  const cucumberExitCode = await new Promise<number>((resolveExit, reject) => {
    const child = spawn(
      process.execPath,
      [cucumberCli, ...cucumberArguments, '--format', 'json:reports/cucumber-report.json'],
      { cwd: projectRoot, env: process.env, stdio: 'inherit' },
    );
    child.once('error', reject);
    child.once('close', (code) => resolveExit(code ?? 1));
  });

  try {
    reporter.generate({
      theme: 'bootstrap',
      jsonFile: jsonReport,
      output: htmlReport,
      reportSuiteAsScenarios: true,
      launchReport: false,
      metadata: {
        'Test Environment': process.env.TEST_ENV ?? 'qa',
        'Browser': process.env.BROWSER ?? 'chromium',
      },
    });
    console.log(`HTML report generated: ${htmlReport}`);
  } catch (error) {
    console.error('Could not generate the HTML report:', error);
    if (cucumberExitCode === 0) {
      process.exitCode = 1;
      return;
    }
  }

  process.exitCode = cucumberExitCode;
}

main().catch((error: unknown) => {
  console.error('BDD runner failed:', error);
  process.exitCode = 1;
});