// ==UserScript==
// @name         ETC利用照会サービス - Shortcut keys
// @namespace    mkobayashime
// @version      2.0.2
// @description  ETC利用照会サービスに h/l などのショートカットキーを追加します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://www2.etc-meisai.jp/etc/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/etc-meisai-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/etc-meisai-shortcuts.user.js
// ==/UserScript==

// src/userscripts/utils/isTyping.ts
var isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

// src/userscripts/etc-meisai-shortcuts/index.user.ts
void (() => {
  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;
    if (e.key === "h" || e.key === "ArrowLeft") {
      const prevPageButton = document.evaluate(
        "//button[contains(text(), '前月')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;
      if (prevPageButton && prevPageButton instanceof HTMLElement)
        prevPageButton.click();
    }
    if (e.key === "l" || e.key === "ArrowRight") {
      const nextPageButton = document.evaluate(
        "//button[contains(text(), '翌月')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;
      if (nextPageButton && nextPageButton instanceof HTMLElement)
        nextPageButton.click();
    }
  });
})();
