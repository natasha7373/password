module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Adds jest-dom's custom assertions
    testEnvironment: 'jsdom', // Use jsdom to simulate a web browser
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js', // Mock styles
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest', // Transform JSX with babel-jest
    },
  };
  