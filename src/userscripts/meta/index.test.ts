import path from "path";
import test from "ava";
import glob from "glob";

import { meta } from "./index.js";

const tsScripts = glob.sync("./src/userscripts/*.user.ts");

test("All scripts have their own meta", (t) => {
  const scriptNames = tsScripts.map((file) => path.basename(file, ".user.ts"));

  t.true(
    scriptNames.every((name) => {
      const scriptMeta = meta[name];
      if (!scriptMeta) {
        console.error(`Error: Meta not found for ${name}`);
      }
      return Boolean(scriptMeta);
    })
  );
});

test("The number of scripts equals to the number of meta", (t) => {
  t.is(tsScripts.length, Object.keys(meta).length);
});
