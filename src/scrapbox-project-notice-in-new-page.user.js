// ==UserScript==
// @name         Scrapbox - Project name notice in new page
// @namespace    mkobayashime
// @version      1.0.2
// @description  Scrapbox ページを新たに作成する際、意図したプロジェクトか確認するアラートを表示します
// @author       mkobayashime
// @match        https://scrapbox.io/*
// @icon         https://www.google.com/s2/favicons?domain=scrapbox.io
// @homepage     https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/scrapbox-project-notice-in-new-page.user.js
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  new MutationObserver(() => {
    if (window.scrapbox.Page.lines?.length === 1) {
      window.alert(
        `You are about to create a new page in "${
          window.scrapbox.Project?.name ?? "unknown project"
        }". Are you sure?`
      )
    }
  }).observe(document.querySelector("title"), { childList: true })
})()
