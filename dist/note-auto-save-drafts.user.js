// ==UserScript==
// @name         note - Auto save drafts
// @namespace    mkobayashime
// @version      2.0.2
// @description  Auto save draft articles periodically
// @icon         https://www.google.com/s2/favicons?domain=note.com
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://editor.note.com/notes/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/note-auto-save-drafts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/note-auto-save-drafts.user.js
// ==/UserScript==

var userscriptConfig = {
  /**
   * Interval of auto saving in milliseconds
   * @default 30000: 30 seconds
   */
  INTERVAL: 30 * 1e3,
};

// src/userscripts/note-auto-save-drafts/index.user.ts
void (({ INTERVAL }) => {
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
})(userscriptConfig);
