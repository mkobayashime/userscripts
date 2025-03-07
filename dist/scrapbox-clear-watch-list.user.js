// ==UserScript==
// @name         Scrapbox - Clear Watch List
// @namespace    mkobayashime
// @version      1.3.2
// @description  Scrapbox の Watch List を自動的に全削除します
// @icon         https://www.google.com/s2/favicons?domain=scrapbox.io
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://scrapbox.io/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-clear-watch-list.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-clear-watch-list.user.js
// ==/UserScript==

// src/userscripts/scrapbox-clear-watch-list/index.user.ts
void (() => {
  localStorage.setItem("projectsLastAccessed", "{}");
  localStorage.setItem("lastProject", "{}");
})();
