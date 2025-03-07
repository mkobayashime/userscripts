// ==UserScript==
// @name         Google Calendar - Unintended User Alert
// @namespace    mkobayashime
// @version      3.0.3
// @description  Alert when you open Google Calendar in unintended accounts
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://calendar.google.com/calendar/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/google-calendar-unintended-user-alert.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/google-calendar-unintended-user-alert.user.js
// ==/UserScript==

var userscriptConfig = {
  /**
   * Put the account you want it to be treated as default
   *
   * **Caution**
   * Updating this script to next versions may reset this value.
   * Please re-fill it to make this script works again.
   *
   * @example ["foo@gmail.com", "bar@gmail.com"]
   */
  GOOGLE_ACCOUNT_ADDRESSES: [],
};

// src/userscripts/google-calendar-unintended-user-alert/index.user.ts
void (({ GOOGLE_ACCOUNT_ADDRESSES }) => {
  const xUserEmailElement = document.getElementById("xUserEmail");
  if (!xUserEmailElement) return;
  if (!GOOGLE_ACCOUNT_ADDRESSES.includes(xUserEmailElement.innerText)) {
    window.alert(`Unintended account detected: ${xUserEmailElement.innerText}`);
  }
})(userscriptConfig);
