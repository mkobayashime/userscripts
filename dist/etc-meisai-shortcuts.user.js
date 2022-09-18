// ==UserScript==
// @name         ETC利用照会サービス - Shortcut keys
// @namespace    mkobayashime
// @version      1.2.0
// @description  ETC利用照会サービスに h/l などのショートカットキーを追加します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/etc-meisai-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/etc-meisai-shortcuts.user.js
// @match        https://www2.etc-meisai.jp/etc/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  const isTyping = () => {
    const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
    return inputTags.includes(document.activeElement.tagName.toUpperCase());
  };
  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;
    if (e.key === "h" || e.key === "ArrowLeft") {
      const prevPageButton = document.evaluate(
        "//button[contains(text(), '前頁')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      if (prevPageButton) prevPageButton.click();
    }
    if (e.key === "l" || e.key === "ArrowRight") {
      const nextPageButton = document.evaluate(
        "//button[contains(text(), '次頁')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      if (nextPageButton) nextPageButton.click();
    }
  });
})();
