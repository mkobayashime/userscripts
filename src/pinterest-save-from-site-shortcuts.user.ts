// ==UserScript==
// @name         Pinterest - Shortcuts in "Save from site"
// @namespace    mkobayashime
// @version      1.2.0
// @description  Ctrl+Enter in "Save from site"
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/pinterest-save-from-site-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/pinterest-save-from-site-shortcuts.user.js
// @match        https://www.pinterest.jp/pin-builder/
// @icon         https://www.google.com/s2/favicons?domain=pinterest.jp
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      const saveFromSiteButton = document.querySelector(
        '[data-test-id="save-from-site-button"] button'
      );
      if (saveFromSiteButton) {
        saveFromSiteButton.click();
        return;
      }

      const websiteLinkSubmitButton = document.querySelector(
        '[data-test-id="website-link-submit-button"]'
      );
      if (websiteLinkSubmitButton) {
        websiteLinkSubmitButton.click();
        return;
      }

      e.preventDefault();
      document.activeElement.blur();
      const addNPinButtonCandidates = Array.from(
        document.querySelectorAll('[data-test-id="pin-builder-draft"] button')
      );
      const addNPinButton = addNPinButtonCandidates.find(
        (el) => el.innerText.startsWith("Add") && el.innerText.endsWith("Pin")
      );
      if (addNPinButton) {
        addNPinButton.click();
        return;
      }

      const dropdownSaveButton = document.querySelector(
        'button[data-test-id="board-dropdown-save-button"]'
      );
      if (dropdownSaveButton) {
        dropdownSaveButton.click();
        return;
      }
    }
  });
})();
