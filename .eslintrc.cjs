module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "sort-keys-fix"],
  overrides: [
    // {
    //   files: ["*.js"],
    //   extends: ["@mkobayashime"],
    // },
    {
      files: ["*.ts", "*.js"],
      extends: ["@mkobayashime"],
    },
    {
      files: ["*.user.ts"],
      extends: ["plugin:userscripts/recommended", "@mkobayashime"],
      rules: {
        "userscripts/no-invalid-metadata": "off",
        "userscripts/filename-user": "off",
      },
    },
    {
      files: ["*.user.js"],
      extends: ["plugin:userscripts/recommended", "@mkobayashime"],
    },
  ],
};
