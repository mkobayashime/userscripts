import path from "path";

import { globSync } from "glob";

import { meta } from "./index.js";

const tsScripts = globSync("./src/userscripts/*.user.ts");
const scriptNames = tsScripts.map((file) => path.basename(file, ".user.ts"));

describe("All scripts have their meta", () => {
  for (const name of scriptNames) {
    test(`${name} has meta`, () => {
      expect(Object.keys(meta)).toContain(name);
    });
  }
});

describe("The number of scripts equals to the number of meta", () => {
  test("The number of scripts equals to the number of meta", () => {
    expect(tsScripts.length).toBe(Object.keys(meta).length);
  });
});
