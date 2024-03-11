/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  extensionsToTreatAsEsm: [".ts"],
  resolver: "ts-jest-resolver",
  transform: {
    "^.+\\.tsx?$": ["@swc/jest"],
  },
};

export default config;
