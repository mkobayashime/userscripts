// ==UserScript==
// @name         Slack - No unintended reloads
// @namespace    mkobayashime
// @version      1.3.2
// @description  Alert when you reload/close Slack with a new draft
// @icon         https://www.google.com/s2/favicons?domain=slack.com
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://app.slack.com/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/slack-no-unintended-reload.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/slack-no-unintended-reload.user.js
// ==/UserScript==

// src/userscripts/slack-no-unintended-reload/index.user.ts
void (() => {
  window.addEventListener("beforeunload", (event) => {
    const messageInputContainer =
      document.getElementsByClassName("ql-editor")[0];
    if (messageInputContainer) {
      const isEmpty = /./;
      const messageLines = messageInputContainer.children;
      if (
        Array.from(messageLines).some((line) => isEmpty.test(line.innerText))
      ) {
        event.preventDefault();
        event.returnValue = "";
        return false;
      }
    }
  });
})();
