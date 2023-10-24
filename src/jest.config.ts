import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: "jest",
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "/*.{ts,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**",
    ],
};
export default config;
