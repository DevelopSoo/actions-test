import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  collectCoverage: true,
  coverageReporters: ['json', 'text', 'lcov', 'clover', 'json-summary'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // 커버리지 수집 대상
    '!src/**/*.d.ts',
    '!src/**/index.{js,jsx,ts,tsx}', // 필요 시 제외
  ],
  // testEnvironment: "jsdom",
  testEnvironment: 'jest-fixed-jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/tests/', '<rootDir>/tests-examples/'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
