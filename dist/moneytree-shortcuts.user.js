// ==UserScript==
// @name         Moneytree shortcut keys
// @namespace    mkobayashime
// @version      1.3.3
// @description  Moneytree にショートカットキーを追加します
// @icon         https://www.google.com/s2/favicons?domain=getmoneytree.com
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://app.getmoneytree.com/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/moneytree-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/moneytree-shortcuts.user.js
// ==/UserScript==

// src/userscripts/moneytree-shortcuts/index.user.ts
void (() => {
  document.onkeypress = (e) => {
    if (e.ctrlKey && e.code === "Enter") {
      const saveBtnInner = document.getElementsByClassName(
        "modal-header-done-text",
      )[0];
      if (saveBtnInner) {
        saveBtnInner.parentElement?.click();
      }
    }
  };
  document.onkeyup = (e) => {
    if (e.key === "Escape") {
      const cancelBtnInner = document.getElementsByClassName(
        "modal-header-back-text",
      )[0];
      if (cancelBtnInner) {
        cancelBtnInner.parentElement?.click();
      }
    }
  };
})();
