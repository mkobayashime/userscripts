import { defineUserScript } from "bundlemonkey";
import { isTyping } from "../utils/isTyping";

export default defineUserScript({
  name: "GitHub - PR submission shortcuts",
  version: "1.2.1",
  description: "Ctrl+Enter to merge/automerge PR",
  match: ["https://github.com/*"],
  icon: "https://www.google.com/s2/favicons?domain=github.com",
  main: () => {
    window.addEventListener("keydown", (e) => {
      if (!/\/\S+\/\S+\/pull\//.test(window.location.pathname)) return;

      if (e.ctrlKey && e.key === "Enter" && !isTyping()) {
        const confirmButton = document.querySelector<HTMLElement>(
          "button.js-merge-commit-button[type='submit']",
        );
        if (confirmButton) {
          confirmButton.click();
          return;
        }

        const automergeConfirmButton = document.querySelector<HTMLElement>(
          "button.js-confirm-auto-merge-button[type='submit']",
        );
        if (automergeConfirmButton) {
          automergeConfirmButton.click();
        }
      }
    });
  },
});
