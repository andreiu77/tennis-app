import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom", // Ensures browser-like environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Load setup file
  setupFiles: ["whatwg-fetch"], // Polyfill fetch & Request API
  moduleNameMapper: {
    // Fixes absolute imports if you're using @ alias in tsconfig.json
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
