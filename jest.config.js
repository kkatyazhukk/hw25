const config = {
    verbose: true,
    clearMocks: true,
    runner: 'jest-runner',
    testTimeout: 70000,
    rootDir: './',
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    setupFilesAfterEnv: ['./setupJest.js'],
};

module.exports = config;