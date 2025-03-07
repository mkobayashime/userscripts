// ==UserScript==
// @name         freee shortcut keys
// @namespace    mkobayashime
// @version      1.3.3
// @description  freee にショートカットキーを追加します
// @icon         https://www.google.com/s2/favicons?domain=freee.co.jp
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://secure.freee.co.jp/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/freee-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/freee-shortcuts.user.js
// ==/UserScript==

// src/userscripts/freee-shortcuts/index.user.ts
void (() => {
  window.onkeyup = (e) => {
    if (e.key === "Escape") {
      const xpath = "//button[contains(text(),'閉じる')]";
      const matchingElement = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;
      if (matchingElement && matchingElement instanceof HTMLElement)
        matchingElement.click();
    }
  };
})();
