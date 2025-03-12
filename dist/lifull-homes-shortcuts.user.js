// ==UserScript==
// @name         HOME'S - Shortcut keys
// @namespace    mkobayashime
// @version      1.3.4
// @description  Next/Prev image with arrow/h/l keys
// @icon         https://www.google.com/s2/favicons?domain=homes.co.jp
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://www.homes.co.jp/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/lifull-homes-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/lifull-homes-shortcuts.user.js
// ==/UserScript==

// src/userscripts/utils/isTyping.ts
var isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

// src/userscripts/lifull-homes-shortcuts/index.user.ts
void (() => {
  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;
    if (e.key === "l" || e.key === "ArrowRight") {
      e.preventDefault();
      const nextButton = document.querySelector("[aria-label='Next slide']");
      if (nextButton) nextButton.click();
    }
    if (e.key === "h" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prevButton = document.querySelector(
        "[aria-label='Previous slide']",
      );
      if (prevButton) prevButton.click();
    }
  });
})();
