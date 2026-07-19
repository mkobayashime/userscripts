import { configs as userscriptsConfigs } from "eslint-plugin-userscripts";
import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "off",
  },
  settings: {
    userscriptVersions: {
      violentmonkey: "*",
    },
  },
  overrides: [
    {
      files: ["**/*.user.js"],
      jsPlugins: ["eslint-plugin-userscripts"],
      rules: userscriptsConfigs.recommended.rules,
    },
  ],
});
