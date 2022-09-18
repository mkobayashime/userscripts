import typescript from "@rollup/plugin-typescript";
import glob from "glob";
import { RollupOptions } from "rollup";
import { userscriptMetaPlugin } from "./src/userscripts/meta/rollupPlugin";

const tsScripts = glob.sync("./src/*.user.ts");

const config: RollupOptions[] = tsScripts.map((file) => ({
  input: file,
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
  },
  plugins: [typescript(), userscriptMetaPlugin()],
}));

export default config;
