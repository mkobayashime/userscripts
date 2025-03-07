// ==UserScript==
// @name         ZOZOTOWN - Shortcut keys
// @namespace    mkobayashime
// @version      1.4.3
// @description  Next/Prev image with arrow/h/l keys
// @icon         https://www.google.com/s2/favicons?domain=zozo.jp
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://zozo.jp/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/zozotown-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/zozotown-shortcuts.user.js
// ==/UserScript==

// src/userscripts/utils/isTyping.ts
var isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

// src/userscripts/zozotown-shortcuts/index.user.ts
void (() => {
  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;
    if (e.key === "l" || e.key === "ArrowRight") {
      const nextButton = document.querySelector("#btnNext button");
      if (nextButton) nextButton.click();
    }
    if (e.key === "h" || e.key === "ArrowLeft") {
      const prevButton = document.querySelector("#btnPrev button");
      if (prevButton) prevButton.click();
    }
  });
})();
