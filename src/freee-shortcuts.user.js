// ==UserScript==
// @name         freee shortcut keys
// @namespace    mkobayashime
// @version      1.2.0
// @description  freee にショートカットキーを追加します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/freee-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/freee-shortcuts.user.js
// @match        https://secure.freee.co.jp/*
// @icon         https://www.google.com/s2/favicons?domain=freee.co.jp
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  window.onkeyup = (e) => {
    if (e.key === "Escape") {
      const xpath = "//button[contains(text(),'閉じる')]";
      const matchingElement = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (matchingElement) matchingElement.click();
    }
  };
})();
