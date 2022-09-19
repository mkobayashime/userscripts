import { Plugin } from "rollup";
import clipboard from "clipboardy";

export const copyToClipboardPlugin = (): Plugin => ({
  name: "copyToClipboard",
  generateBundle: (_, bundle) => {
    const userscriptBundle = Object.entries(bundle).find(([filename]) =>
      filename.endsWith(".user.js")
    );
    if (!userscriptBundle) return;

    const chunk = userscriptBundle[1];
    if (!("code" in chunk)) return;

    clipboard.writeSync(chunk.code);
  },
});
