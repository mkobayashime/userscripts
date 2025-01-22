import path from "node:path";
import { fileURLToPath } from "node:url";

import userscriptsPlugin from "eslint-plugin-userscripts";
import { typescriptWithBiome } from "@mkobayashime/shared-config/eslint";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [".dev"],
  },
  ...typescriptWithBiome.map((c) => ({
    ...c,
    ignores: ["dist/**"],
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

  /**
   * meta
   */
  ...compat.plugins("sort-keys-fix").map((c) => ({
    ...c,
    files: ["src/userscripts/meta/index.ts"],
  })),
  {
    files: ["src/userscripts/meta/index.ts"],
    rules: {
      "sort-keys-fix/sort-keys-fix": "warn",
    },
  },
];

export default config;
