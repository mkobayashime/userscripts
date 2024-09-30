import { Plugin } from "rollup";

export const cleanupESLintDirectivesPlugin = (): Plugin => ({
  name: "Cleanup ESLint directives",
  transform: (code) => {
    return code.replace(/^\s*\/\/\s*eslint-disable-.*$\n/gm, "");
  },
});
