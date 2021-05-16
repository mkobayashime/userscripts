// ==UserScript==
// @name         Scrapbox Clear Watch List
// @namespace    mkobayashime
// @version      1.0.0
// @description  Scrapbox の Watch List を自動的に全削除します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/scrapbox-clear-watch-list.user.js
// @include      https://scrapbox.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  localStorage.setItem("projectsLastAccessed", "{}")
  localStorage.setItem("lastProject", "{}")
})()
