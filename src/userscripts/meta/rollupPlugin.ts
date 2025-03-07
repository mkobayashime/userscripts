import path from "node:path";

import type { Plugin } from "rollup";

import { type UserScriptMeta, meta } from "./index.js";

export const userscriptMetaPlugin = (): Plugin => ({
  name: "userscriptMetaPlugin",
  renderChunk: (code, chunk) => {
    const scriptName = path.basename(chunk.fileName, ".user.js");
    const scriptMeta = meta[scriptName];
    if (!scriptMeta) {
      throw new Error(`Meta not found for userscript: ${chunk.fileName}`);
    }

    return `${generateHeader(scriptMeta, chunk.fileName)}\n\n${code}`;
  },
});

const generateHeader = (meta: UserScriptMeta, fileName: string): string =>
  [
    "// ==UserScript==",
    `// @name         ${meta.name}`,
    `// @namespace    ${meta.namespace ?? "mkobayashime"}`,
    `// @version      ${meta.version}`,
    `// @description  ${meta.description}`,
    meta.descriptionJp ? `// @description:jp  ${meta.descriptionJp}` : null,
    "// @author       mkobayashime",
    "// @homepage     https://github.com/mkobayashime/userscripts",
    "// @homepageURL  https://github.com/mkobayashime/userscripts",
    `// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/${fileName}`,
    `// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/${fileName}`,
    (Array.isArray(meta.match) ? meta.match : [meta.match])
      .map((matchString) => `// @match        ${matchString}`)
      .join("\n"),
    meta.icon ? `// @icon         ${meta.icon}` : null,
    meta.runAt ? `// @run-at       ${meta.runAt}` : null,
    `// @grant        ${meta.grant ?? "none"}`,
    "// ==/UserScript==",
  ]
    .filter((str) => str)
    .join("\n");
