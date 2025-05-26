// ==UserScript==
// @name         FLYMEe - Shortcut keys
// @namespace    mkobayashime
// @version      1.0.0
// @description  Next/Prev image with arrow/h/l keys
// @icon         https://www.google.com/s2/favicons?domain=flymee.jp
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://flymee.jp/product/*
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/flymee-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/flymee-shortcuts.user.js
// ==/UserScript==

// src/userscripts/utils/isTyping.ts
var isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

// src/userscripts/flymee-shortcuts/index.user.ts
void (() => {
  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;
    if (e.key === "l" || e.key === "ArrowRight") {
      const nextButton = document.querySelector(".main_image .icon_next");
      if (nextButton) nextButton.click();
    }
    if (e.key === "h" || e.key === "ArrowLeft") {
      const prevButton = document.querySelector(".main_image .icon_prev");
      if (prevButton) prevButton.click();
    }
  });
})();
