import path from "path";
import test from "ava";
import { globSync } from "glob";

import { meta } from "./index.js";

const tsScripts = globSync("./src/userscripts/*.user.ts");
const scriptNames = tsScripts.map((file) => path.basename(file, ".user.ts"));

for (const name of scriptNames) {
  test(`${name} has meta`, (t) => {
    const scriptMeta = meta[name];
    return t.true(Boolean(scriptMeta));
  });
}

test("The number of scripts equals to the number of meta", (t) => {
  t.is(tsScripts.length, Object.keys(meta).length);
});
