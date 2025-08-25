// ==UserScript==
// @name         GitHub - Auto SSO
// @namespace    mkobayashime
// @version      1.2.0
// @description  Attempt SSO if the banner exists on every pageload
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://github.com/*
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/github-auto-sso.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/github-auto-sso.user.js
// ==/UserScript==

// src/userscripts/github-auto-sso/index.user.ts
void (() => {
  const globalSSOBannerSection = document.querySelector(
    "[data-testid='global-sso-banner']",
  );
  const ssoBannerActionAnchor = globalSSOBannerSection?.querySelector(
    "[class*='-Banner-BannerActionsContainer-'] a",
  );
  if (ssoBannerActionAnchor instanceof HTMLElement) {
    ssoBannerActionAnchor.click();
    return;
  }
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
