// ==UserScript==
// @name         HOME'S - Shortcut keys
// @namespace    mkobayashime
// @version      1.3.2
// @description  Next/Prev image with arrow/h/l keys
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/lifull-homes-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/lifull-homes-shortcuts.user.js
// @match        https://www.homes.co.jp/*
// @icon         https://www.google.com/s2/favicons?domain=homes.co.jp
// @run-at       document-end
// @grant        none
// ==/UserScript==

const isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

(function () {
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
        "[aria-label='Previous slide']"
      );
      if (prevButton) prevButton.click();
    }
  });
})();
