// ==UserScript==
// @name         Google Calendar - Unintended User Alert
// @namespace    mkobayashime
// @version      3.0.0
// @description  Alert when you open Google Calendar in unintended accounts
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/google-calendar-unintended-user-alert.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/google-calendar-unintended-user-alert.user.js
// @match        https://calendar.google.com/calendar/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

const config = {
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
(({ GOOGLE_ACCOUNT_ADDRESSES }) => {
  const xUserEmailElement = document.getElementById("xUserEmail");
  if (!GOOGLE_ACCOUNT_ADDRESSES.includes(xUserEmailElement?.innerText)) {
    window.alert(`Unintended account detected: ${xUserEmailElement.innerText}`);
  }
})(config);
