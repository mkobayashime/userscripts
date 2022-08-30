// ==UserScript==
// @name         Moneytree shortcut keys
// @namespace    mkobayashime
// @version      1.2.0
// @description  Moneytree にショートカットキーを追加します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/moneytree-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/moneytree-shortcuts.user.js
// @match        https://app.getmoneytree.com/*
// @icon         https://www.google.com/s2/favicons?domain=getmoneytree.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  document.onkeypress = (e) => {
    if (e.ctrlKey && e.code === "Enter") {
      const saveBtnInner = document.getElementsByClassName(
        "modal-header-done-text"
      )[0];
      if (saveBtnInner) {
        saveBtnInner.parentElement.click();
      }
    }
  };

  document.onkeyup = (e) => {
    if (e.key === "Escape") {
      const cancelBtnInner = document.getElementsByClassName(
        "modal-header-back-text"
      )[0];
      if (cancelBtnInner) {
        cancelBtnInner.parentElement.click();
      }
    }
  };
})();
