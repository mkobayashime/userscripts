// ==UserScript==
// @name         Moneytree shortcut keys
// @namespace    mkobayashime
// @version      1.0.0
// @description  Moneytree にショートカットキーを追加します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/moneytree-shortcuts.user.js
// @include      https://app.getmoneytree.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  document.onkeypress = (e) => {
    if (e.ctrlKey && e.code === "Enter") {
      const saveBtnInner = document.getElementsByClassName(
        "modal-header-done-text"
      )[0]
      if (saveBtnInner) {
        saveBtnInner.parentElement.click()
      }
    }
  }

  document.onkeyup = (e) => {
    if (e.key === "Escape") {
      const cancelBtnInner = document.getElementsByClassName(
        "modal-header-back-text"
      )[0]
      if (cancelBtnInner) {
        cancelBtnInner.parentElement.click()
      }
    }
  }
})()
