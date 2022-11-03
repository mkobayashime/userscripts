// ==UserScript==
// @name         GitHub - PR submission shortcuts
// @namespace    mkobayashime
// @version      1.0.1
// @description  Ctrl+Enter to merge/automerge PR
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/github-pr-submission-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/github-pr-submission-shortcuts.user.js
// @match        https://github.com/*/*/pull/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// ==/UserScript==

(() => {
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      const confirmButton = document.querySelector(
        "button.js-merge-commit-button[type='submit']"
      );
      if (confirmButton) {
        confirmButton.click();
        return;
      }
      const automergeConfirmButton = document.querySelector(
        "button.js-confirm-auto-merge-button[type='submit']"
      );
      if (automergeConfirmButton) {
        automergeConfirmButton.click();
        return;
      }
    }
  });
})();
