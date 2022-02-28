/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['server/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    'server/(.*)*': '<rootDir>/server/$1',
  },
  moduleDirectories: ['node_modules', 'server'],
};
