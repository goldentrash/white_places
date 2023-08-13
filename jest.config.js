const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  setupFiles: [
    'dotenv/config',
    '<rootDir>/jest/setupFetch',
    '<rootDir>/jest/setupReactTestingLib',
  ],
  coverageProvider: 'v8',
  errorOnDeprecated: true,
  preset: 'ts-jest',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
