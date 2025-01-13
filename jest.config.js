/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
  },
  setupFiles: ['<rootDir>/setupJest.js'],
  transformIgnorePatterns: ['/node_modules/(?!(three)/)'],
  transform: {
    '\\.(tsx|ts|js)$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|scss|webp|png|jpg)$': 'jest-transform-stub',
    '^.+\\.svg$': 'jest-transformer-svg',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
  },
};
