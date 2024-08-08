/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: "coverage",
    clearMocks: true,
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
        "^@/(.*)\\.js$": "<rootDir>/src/$1.ts",
    },
    transform: {
        "^.+\\.(ts|tsx)?$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
    testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
};
