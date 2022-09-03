// ==UserScript==
// @name         Slack - No autofocus in moving channels
// @namespace    mkobayashime
// @version      1.2.0
// @description  Disable autofocus to the message input field after moved to another channel
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/slack-no-autofocus.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/slack-no-autofocus.user.js
// @match        https://app.slack.com/client/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=slack.com
// @grant        none
// ==/UserScript==

const waitForChannelNameWrapper = async () =>
  new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      throw new Error("Timeout: Getting channel name wrapper");
    }, 30000);
    const interval = window.setInterval(() => {
      const channelNameWrapper = document.querySelector("div[role='main']");
      if (channelNameWrapper) {
        resolve(channelNameWrapper);
        window.clearInterval(interval);
        window.clearTimeout(timeout);
      }
    }, 200);
  });
(async function () {
  const channelNameWrapper = await waitForChannelNameWrapper();
  new MutationObserver((e) => {
    const oldAriaLabel = e[0].oldValue;
    const currentAriaLabel = e[0].target.ariaLabel;
    if (!oldAriaLabel || !currentAriaLabel) return;
    if (oldAriaLabel !== currentAriaLabel) {
      document.activeElement.blur();
    }
  }).observe(channelNameWrapper, { attributeOldValue: true });
})();
