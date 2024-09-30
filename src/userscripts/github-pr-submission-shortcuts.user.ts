import { isTyping } from "./utils/isTyping";

void (() => {
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
        return;
      }
    }
  });
})();

export {};
