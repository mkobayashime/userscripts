import { configs as userscriptsConfigs } from "eslint-plugin-userscripts";
import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
  },
  options: {
    typeAware: true,
  },
  settings: {
    userscriptVersions: {
      violentmonkey: "*",
    },
  },
  ignorePatterns: ["dist"],
  overrides: [
    {
      files: ["src/**/*.ts"],
      rules: {
        "no-implied-eval": "off",
        "no-throw-literal": "off",
        "prefer-promise-reject-errors": "off",
        "require-await": "off",
        "typescript/await-thenable": "error",
        "typescript/no-array-delete": "error",
        "typescript/no-base-to-string": "error",
        "typescript/no-duplicate-type-constituents": "error",
        "typescript/no-floating-promises": "error",
        "typescript/no-for-in-array": "error",
        "typescript/no-implied-eval": "error",
        "typescript/no-misused-promises": "error",
        "typescript/no-redundant-type-constituents": "error",
        "typescript/no-unnecessary-type-assertion": "error",
        "typescript/no-unsafe-argument": "error",
        "typescript/no-unsafe-assignment": "error",
        "typescript/no-unsafe-call": "error",
        "typescript/no-unsafe-enum-comparison": "error",
        "typescript/no-unsafe-member-access": "error",
        "typescript/no-unsafe-return": "error",
        "typescript/no-unsafe-unary-minus": "error",
        "typescript/only-throw-error": "error",
        "typescript/prefer-promise-reject-errors": "error",
        "typescript/require-await": "error",
        "typescript/restrict-plus-operands": "error",
        "typescript/restrict-template-expressions": "error",
        "typescript/unbound-method": "error",
      },
    },
    {
      files: ["**/*.user.ts", "**/*.user.js"],
      jsPlugins: ["eslint-plugin-userscripts"],
      rules: userscriptsConfigs.recommended.rules,
    },
    {
      files: ["**/*.user.ts"],
      jsPlugins: ["eslint-plugin-userscripts"],
      rules: {
        "userscripts/no-invalid-metadata": "off",
        "userscripts/filename-user": "off",
      },
    },
  ],
});
