import typescript from "@rollup/plugin-typescript";
import glob from "glob";

const tsScripts = glob.sync("./src/*.user.ts");

/**
 * @type {import('rollup').RollupOptions}
 */
const config = tsScripts.map((file) => ({
  input: file,
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
  },
  plugins: [typescript()],
}));

export default config;
