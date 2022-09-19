import typescript from "@rollup/plugin-typescript";
import glob from "glob";
import { RollupOptions } from "rollup";
import { copyToClipboardPlugin } from "./copyToClipboardRollupPlugin.js";
import { userscriptMetaPlugin } from "./src/userscripts/meta/rollupPlugin";

const tsScripts = glob.sync("./src/userscripts/*.user.ts");

const config: RollupOptions[] = tsScripts.map((file) => ({
  input: file,
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
  },
  plugins: [
    typescript(),
    userscriptMetaPlugin(),
    process.env.ROLLUP_WATCH ? copyToClipboardPlugin() : null,
  ],
}));

export default config;
