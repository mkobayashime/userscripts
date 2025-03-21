// ==UserScript==
// @name         Pinterest - Shortcuts in "Save from site"
// @namespace    mkobayashime
// @version      1.2.4
// @description  Ctrl+Enter in "Save from site"
// @icon         https://www.google.com/s2/favicons?domain=pinterest.jp
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://www.pinterest.jp/pin-builder/
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/pinterest-save-from-site-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/pinterest-save-from-site-shortcuts.user.js
// ==/UserScript==

// src/userscripts/pinterest-save-from-site-shortcuts/index.user.ts
void (() => {
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      const saveFromSiteButton = document.querySelector(
        '[data-test-id="save-from-site-button"] button',
      );
      if (saveFromSiteButton) {
        saveFromSiteButton.click();
        return;
      }
      const websiteLinkSubmitButton = document.querySelector(
        '[data-test-id="website-link-submit-button"]',
      );
      if (websiteLinkSubmitButton) {
        websiteLinkSubmitButton.click();
        return;
      }
      e.preventDefault();
      if (!(document.activeElement instanceof HTMLElement)) return;
      document.activeElement.blur();
      const addNPinButtonCandidates = Array.from(
        document.querySelectorAll('[data-test-id="pin-builder-draft"] button'),
      );
      const addNPinButton = addNPinButtonCandidates.find(
        (el) => el.innerText.startsWith("Add") && el.innerText.endsWith("Pin"),
      );
      if (addNPinButton) {
        addNPinButton.click();
        return;
      }
      const dropdownSaveButton = document.querySelector(
        'button[data-test-id="board-dropdown-save-button"]',
      );
      if (dropdownSaveButton) {
        dropdownSaveButton.click();
      }
    }
  });
})();
