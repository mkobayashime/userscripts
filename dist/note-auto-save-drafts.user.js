// ==UserScript==
// @name         note - Auto save drafts
// @namespace    mkobayashime
// @version      2.0.0
// @description  Auto save draft articles periodically
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/note-auto-save-drafts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/note-auto-save-drafts.user.js
// @match        https://editor.note.com/notes/*
// @icon         https://www.google.com/s2/favicons?domain=note.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

const config = {
  /**
   * Interval of auto saving in milliseconds
   * @default 30000: 30 seconds
   */
  INTERVAL: 30 * 1000,
};
(function ({ INTERVAL }) {
  window.setInterval(() => {
    const draftSaveButton = document.evaluate(
      "//button[contains(text(),'下書き保存')]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue;
    if (draftSaveButton instanceof HTMLButtonElement) {
      draftSaveButton.click();
    }
  }, INTERVAL);
})(config);
