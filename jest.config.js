/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// import '@testing-library/jest-dom'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    // ...
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
}

module.exports = createJestConfig(config)
