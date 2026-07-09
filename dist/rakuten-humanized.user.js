// ==UserScript==
// @name         Rakuten Humanized
// @namespace    mkobayashime
// @version      1.0.0
// @description  楽天の商品ページを人間にも使える程度にマシにします
// @icon         https://www.google.com/s2/favicons?domain=rakuten.co.jp
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://item.rakuten.co.jp/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/rakuten-humanized.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/rakuten-humanized.user.js
// ==/UserScript==

// src/userscripts/rakuten-humanized/index.user.ts
void (() => {
  const itemNameArea = document.querySelector("#item-name-area");
  if (!itemNameArea) return;
  const table = itemNameArea.closest("table:has(#item-name-area)");
  if (!table) return;
  const prevSibling = table.previousElementSibling;
  if (!prevSibling) return;
  prevSibling.before(table);
})();
