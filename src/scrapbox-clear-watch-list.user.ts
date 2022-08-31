// ==UserScript==
// @name         Scrapbox - Clear Watch List
// @namespace    mkobayashime
// @version      1.3.0
// @description  Scrapbox の Watch List を自動的に全削除します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-clear-watch-list.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-clear-watch-list.user.js
// @match        https://scrapbox.io/*
// @icon         https://www.google.com/s2/favicons?domain=scrapbox.io
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  localStorage.setItem("projectsLastAccessed", "{}");
  localStorage.setItem("lastProject", "{}");
})();
