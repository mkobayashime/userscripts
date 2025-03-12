// ==UserScript==
// @name         Slack - No autofocus in moving channels
// @namespace    mkobayashime
// @version      2.0.2
// @description  Disable autofocus to the message input field after moved to another channel
// @icon         https://www.google.com/s2/favicons?sz=64&domain=slack.com
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://app.slack.com/client/*
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/slack-no-autofocus.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/slack-no-autofocus.user.js
// ==/UserScript==

// src/userscripts/slack-no-autofocus/index.user.ts
void (() => {
  let curTitle = "";
  new MutationObserver(() => {
    if (document.title === curTitle) return;
    curTitle = document.title;
    if (!(document.activeElement instanceof HTMLElement)) return;
    document.activeElement.blur();
  }).observe(document.head, {
    subtree: true,
    childList: true,
  });
})();
