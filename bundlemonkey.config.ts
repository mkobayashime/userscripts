import type { Config } from "bundlemonkey";

const config: Config = {
  srcDir: "./src/userscripts/",
  defaultMeta: {
    author: "mkobayashime",
    namespace: "mkobayashime",
    homepage: "https://github.com/mkobayashime/userscripts",
    updateURL: ({ scriptName }) =>
      `https://github.com/mkobayashime/userscripts/raw/main/dist/${scriptName}.user.js`,
    downloadURL: ({ scriptName }) =>
      `https://github.com/mkobayashime/userscripts/raw/main/dist/${scriptName}.user.js`,
  },
};

export default config;
