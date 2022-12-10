// ==UserScript==
// @name         Scrapbox - Leave insert with Esc key
// @namespace    mkobayashime
// @version      1.0.0
// @description  Leave 'insert' mode with Esc key in Scrapbox
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-escape-inert.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-escape-inert.user.js
// @match        https://scrapbox.io/*
// @icon         https://www.google.com/s2/favicons?domain=scrapbox.io
// @grant        none
// ==/UserScript==

(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || (e.key === "[" && e.ctrlKey)) {
      const textarea = document.getElementById("text-input");
      if (!textarea) return;
      if (document.activeElement === textarea) {
        textarea.blur();
      }
    }
  });
})();
