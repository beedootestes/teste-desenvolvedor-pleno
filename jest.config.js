module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  // transform: {
  //   '.+\\.ts$': 'ts-jest'
  // }
}
