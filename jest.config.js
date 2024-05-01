module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    "<rootDir>/.aws-sam",
    "<rootDir>/__tests__/fixtures",
    "<rootDir>/__tests__/utils",
    "<rootDir>/__tests__/global-setup.js",
    "<rootDir>/.history"
  ],
  clearMocks: true,
  moduleNameMapper: {
    "@root/(.*)": ["<rootDir>/src/$1"],
    "@config": ["<rootDir>/src/config.ts"],
    "@db/(.*)": ["<rootDir>/src/db/$1"],
    "@test/(.*)": ["<rootDir>/__tests__/$1"],
    "@handlers/(.*)": ["<rootDir>/src/handlers/$1"],
    "@helpers/(.*)": ["<rootDir>/src/helpers/$1"],
    "@utils/(.*)": ["<rootDir>/src/utils/$1"],
    "@models/(.*)": ["<rootDir>/src/models/$1"],
    "@functions/(.*)": ["<rootDir>/src/functions/$1"],
    "@libs/(.*)": ["<rootDir>/src/libs/$1"]
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
