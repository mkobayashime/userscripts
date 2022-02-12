// ==UserScript==
// @name         Quick Tazugane
// @description  .
// @namespace    mkobayashime
// @author       mkobayashime
// @version      0.2.0
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/quickTazugane.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/src/quickTazugane.user.js
// @match        *://*/*
// @run-at       document-start
// ==/UserScript==

// docgen-ignore

;(function () {
  "use strict"

  const className = "mkobayashime-quick-tazugane"
  const storageKey = "__quick-tazugane"

  const getStorageValue = () =>
    window.localStorage.getItem(storageKey) === "true"
  const setStorageValue = (newValue) =>
    window.localStorage.setItem(storageKey, String(newValue))

  document.onkeyup = (e) => {
    if (e.altKey && e.code === "KeyK") {
      document.body.classList.toggle(className)

      setStorageValue(getStorageValue() ? false : true)
    }
  }

  const apply = () => {
    if (getStorageValue()) document.body.classList.add(className)
  }

  apply()
  window.addEventListener("DOMContentLoaded", () => apply())
})()
