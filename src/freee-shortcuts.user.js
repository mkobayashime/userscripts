// ==UserScript==
// @name         freee shortcut keys
// @namespace    mkobayashime
// @version      1.0.1
// @description  freee にショートカットキーを追加します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/freee-shortcuts.user.js
// @include      https://secure.freee.co.jp/*
// @icon         https://www.google.com/s2/favicons?domain=freee.co.jp
// @run-at       document-end
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  window.onkeyup = (e) => {
    if (e.key === "Escape") {
      const xpath = "//button[contains(text(),'閉じる')]"
      const matchingElement = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue

      if (matchingElement) matchingElement.click()
    }
  }
})()
