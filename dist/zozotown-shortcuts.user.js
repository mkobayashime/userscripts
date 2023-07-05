// ==UserScript==
// @name         ZOZOTOWN - Shortcut keys
// @namespace    mkobayashime
// @version      1.4.1
// @description  Next/Prev image with arrow/h/l keys
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/zozotown-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/zozotown-shortcuts.user.js
// @match        https://zozo.jp/*
// @icon         https://www.google.com/s2/favicons?domain=zozo.jp
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
      const nextButton = document.querySelector("#btnNext button");
      if (nextButton) nextButton.click();
    }
    if (e.key === "h" || e.key === "ArrowLeft") {
      const prevButton = document.querySelector("#btnPrev button");
      if (prevButton) prevButton.click();
    }
  });
})();
