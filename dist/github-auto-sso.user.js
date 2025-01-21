// ==UserScript==
// @name         GitHub - Auto SSO
// @namespace    mkobayashime
// @version      1.1.0
// @description  Attempt SSO if the banner exists on every pageload
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/github-auto-sso.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/github-auto-sso.user.js
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// ==/UserScript==

(() => {
  const ssoFormSubmitButton = document.querySelector(
    ".business-sso-panel form button[type='submit']",
  );
  if (ssoFormSubmitButton instanceof HTMLElement) {
    ssoFormSubmitButton.click();
    return;
  }
  const ssoAnchor = document.querySelector(
    "section[aria-labelledby='single-sign-on'] a",
  );
  if (!(ssoAnchor instanceof HTMLElement)) return;
  ssoAnchor.click();
})();
