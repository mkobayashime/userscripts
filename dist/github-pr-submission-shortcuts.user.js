// ==UserScript==
// @name         GitHub - PR submission shortcuts
// @namespace    mkobayashime
// @version      1.3.0
// @description  Ctrl+Enter to merge/automerge PR
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://github.com/*
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/github-pr-submission-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/github-pr-submission-shortcuts.user.js
// ==/UserScript==

// src/userscripts/utils/awaitWithInterval.ts
function awaitWithInterval(getter, options = { interval: 250, timeout: 3e3 }) {
  return new Promise((resolve) => {
    let intervalID;
    const intervalFunction = () => {
      const data = getter();
      if (data) {
        if (intervalID !== void 0) {
          window.clearTimeout(intervalID);
        }
        resolve(data.data);
      }
    };
    intervalFunction();
    intervalID = window.setInterval(intervalFunction, options.interval);
    window.setTimeout(() => {
      window.clearInterval(intervalID);
      resolve(void 0);
    }, options.timeout);
  });
}

// src/userscripts/utils/isTyping.ts
var isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

// src/userscripts/github-pr-submission-shortcuts/index.user.ts
void (() => {
  window.addEventListener("keydown", async (e) => {
    if (!/\/\S+\/\S+\/pull\//.test(window.location.pathname)) return;
    if (e.ctrlKey && e.key === "Enter" && !isTyping()) {
      const mergeButton = await awaitWithInterval(() => {
        const button = document.evaluate(
          "//button[*//*[text() = 'Merge pull request' or text() = 'Enable auto-merge']]",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;
        if (button) {
          return {
            data: button,
          };
        }
      });
      if (!(mergeButton instanceof HTMLElement)) {
        return;
      }
      mergeButton.click();
      const confirmButton = await awaitWithInterval(() => {
        const button = document.evaluate(
          "//button[*//*[text() = 'Confirm merge' or text() = 'Confirm auto-merge']]",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;
        if (button) {
          return {
            data: button,
          };
        }
      });
      if (!(confirmButton instanceof HTMLElement)) {
        return;
      }
      confirmButton.click();
    }
  });
})();
