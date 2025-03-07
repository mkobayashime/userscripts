// ==UserScript==
// @name         Scrapbox - Project name notice in new page
// @namespace    mkobayashime
// @version      1.2.3
// @description  Scrapbox ページを新たに作成する際、意図したプロジェクトか確認するアラートを表示します
// @icon         https://www.google.com/s2/favicons?domain=scrapbox.io
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://scrapbox.io/*
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-project-notice-in-new-page.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-project-notice-in-new-page.user.js
// ==/UserScript==

// src/userscripts/scrapbox-project-notice-in-new-page/index.user.ts
void (() => {
  const titleElement = document.querySelector("title");
  if (!titleElement) return;
  new MutationObserver(() => {
    if (window.scrapbox.Page.lines?.length === 1) {
      window.alert(
        `You are about to create a new page in "${window.scrapbox.Project?.name ?? "unknown project"}". Are you sure?`,
      );
    }
  }).observe(titleElement, { childList: true });
})();
