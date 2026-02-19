import { typescriptWithBiome } from "@mkobayashime/shared-config/eslint";
import userscriptsPlugin from "eslint-plugin-userscripts";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [".dev"],
  },
  ...typescriptWithBiome.map((c) => ({
    ...c,
    files: ["src/**/*.ts"],
  })),
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  /**
   * userscripts
   */
  {
    files: ["**/*.user.ts", "**/*.user.js"],
    plugins: {
      userscripts: {
        rules: userscriptsPlugin.rules,
      },
    },
    rules: {
      ...userscriptsPlugin.configs.recommended.rules,
    },
    settings: {
      userscriptVersions: {
        violentmonkey: "*",
      },
    },
  },
  {
    files: ["**/*.user.ts"],
    rules: {
      "userscripts/no-invalid-metadata": "off",
      "userscripts/filename-user": "off",
    },
  },
];

export default config;
