// Cucumber loads this configuration for both the package scripts and direct CLI use.
module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['support/**/*.ts', 'hooks/**/*.ts', 'step-definitions/**/*.ts'],
    format: ['progress'],
  },
};