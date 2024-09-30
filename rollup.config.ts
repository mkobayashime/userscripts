import typescript from "@rollup/plugin-typescript";
import { globSync } from "glob";
import { RollupOptions } from "rollup";
import { userscriptMetaPlugin } from "./src/userscripts/meta/rollupPlugin";
import { cleanupESLintDirectivesPlugin } from "./src/rollup/cleanupESLintDirectivesRollupPlugin";

const tsScripts = globSync("./src/userscripts/*.user.ts");

const config: RollupOptions[] = tsScripts.map((file) => ({
  input: file,
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
  },
  plugins: [
    typescript(),
    cleanupESLintDirectivesPlugin(),
    userscriptMetaPlugin(),
  ],
}));

export default config;
