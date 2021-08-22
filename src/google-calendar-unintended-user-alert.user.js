// ==UserScript==
// @name         Google Calendar - Unintended User Alert
// @namespace    mkobayashime
// @version      1.0.0
// @description  Alert when you open Google Calendar in unintended accounts
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/google-calendar-unintended-user-alert.user.js
// @match        https://calendar.google.com/calendar/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

/**
 * Put the account you want it to be treated as default
 *
 * **Caution**
 * Updating this script to next versions may reset this to an empty string.
 * Please re-fill it to make this script works again.
 *
 * @example foo@gmail.com
 * @type string
 */
const GOOGLE_ACCOUNT_ADDRESS = ""

;(function () {
  "use strict"

  const xUserEmailElement = document.getElementById("xUserEmail")
  if (xUserEmailElement?.innerText !== GOOGLE_ACCOUNT_ADDRESS) {
    window.alert(`Unintended account detected: ${xUserEmailElement.innerText}`)
  }
})()
