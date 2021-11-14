// docgen-ignore

// ==UserScript==
// @name         Quick Tazugane
// @namespace    mkobayashime
// @version      0.1.0
// @match        *://*/*
// @run-at       document-start
// ==/UserScript==

;(function () {
  "use strict"

  const className = "mkobayashime-quick-tazugane"
  const storageKey = "__quick-tazugane"

  const getStorageValue = () =>
    window.localStorage.getItem(storageKey) === "true"
  const setStorageValue = (newValue) =>
    window.localStorage.setItem(storageKey, String(newValue))

  if (getStorageValue()) document.body.classList.add(className)

  document.onkeyup = (e) => {
    if (e.altKey && e.code === "KeyK") {
      document.body.classList.toggle(className)

      setStorageValue(getStorageValue() ? false : true)
    }
  }
})()
