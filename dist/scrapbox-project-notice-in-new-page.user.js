// ==UserScript==
// @name         Scrapbox - Project name notice in new page
// @namespace    mkobayashime
// @version      1.2.1
// @description  Scrapbox ページを新たに作成する際、意図したプロジェクトか確認するアラートを表示します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-project-notice-in-new-page.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-project-notice-in-new-page.user.js
// @match        https://scrapbox.io/*
// @icon         https://www.google.com/s2/favicons?domain=scrapbox.io
// @grant        none
// ==/UserScript==

/* eslint-enable no-var */
(function () {
  const titleElement = document.querySelector("title");
  if (!titleElement) return;
  new MutationObserver(() => {
    if (window.scrapbox.Page.lines?.length === 1) {
      window.alert(
        `You are about to create a new page in "${
          window.scrapbox.Project?.name ?? "unknown project"
        }". Are you sure?`
      );
    }
  }).observe(titleElement, { childList: true });
})();
