import multiInput from "rollup-plugin-multi-input";
import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: ["src/*.user.ts"],
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
  },
  plugins: [multiInput(), typescript()],
};

export default config;
