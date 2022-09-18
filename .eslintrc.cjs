module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.js"],
      extends: ["eslint:recommended", "prettier"],
    },
    {
      files: ["*.ts"],
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "sort-keys-fix"],
    },
    {
      files: ["*.user.ts"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:userscripts/recommended",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "userscripts/no-invalid-metadata": "off",
        "userscripts/filename-user": "off",
      },
    },
    {
      files: ["*.user.js"],
      extends: [
        "eslint:recommended",
        "plugin:userscripts/recommended",
        "prettier",
      ],
    },
  ],
};
