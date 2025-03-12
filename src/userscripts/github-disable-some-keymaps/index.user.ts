import { defineUserScript } from "bundlemonkey";
import { isTyping } from "../utils/isTyping";

export default defineUserScript({
  name: "GitHub - Disable some keymaps",
  version: "0.2.2",
  description: "Disable some keyboard shortcuts on GitHub",
  icon: "https://www.google.com/s2/favicons?domain=github.com",
  match: ["https://github.com/*"],
  main: () => {
    document.body.addEventListener("keydown", (e) => {
      if (isTyping()) return;

      if (e.code === "Period") {
        e.stopImmediatePropagation();
        return false;
      }
    });
  },
});
