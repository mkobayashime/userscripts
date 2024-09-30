import path from "node:path";
import { fileURLToPath } from "node:url";

import shopifyPlugin from "@shopify/eslint-plugin";
import userscriptsPlugin from "eslint-plugin-userscripts";
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
  ...[
    ...shopifyPlugin.configs.typescript,
    ...shopifyPlugin.configs["typescript-type-checking"],
  ].map((c) => ({
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
  ...shopifyPlugin.configs.prettier,

  /**
   * Node
   */
  ...shopifyPlugin.configs.node.map((c) => ({
    ...c,
    files: ["bin/**/*.ts"],
  })),

  /**
   * rule overrides
   */
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/naming-convention": "off",
      "consistent-return": "off",
      "id-length": "off",
      "no-alert": "off",
      "no-console": "off",
      "no-nested-ternary": "off",
      "no-void": "off",
      "no-warning-comments": "off",
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
