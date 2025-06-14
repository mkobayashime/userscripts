// ==UserScript==
// @name         GitHub - PR submission shortcuts
// @namespace    mkobayashime
// @version      1.6.0
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

// src/userscripts/utils/sleep.ts
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// src/userscripts/github-pr-submission-shortcuts/index.user.ts
void (() => {
  window.addEventListener("keydown", async (e) => {
    if (!/\/\S+\/\S+\/pull\//.test(window.location.pathname)) return;
    if (e.ctrlKey && e.key === "Enter" && !isTyping()) {
      const bypassRulesCheckbox = document.evaluate(
        "//label[descendant::*[contains(text(), '(bypass rules)')]]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;
      if (bypassRulesCheckbox instanceof HTMLElement) {
        bypassRulesCheckbox.click();
        await sleep(100);
      }
      const mergeButton = await awaitWithInterval(() => {
        const button = document.evaluate(
          "//button[descendant::*[text() = 'Merge pull request' or text() = 'Enable auto-merge' or text() = 'Bypass rules and merge']]",
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
      const focusedInput = await awaitWithInterval(() => {
        const focused = document.activeElement;
        return focused instanceof HTMLInputElement ? { data: focused } : null;
      });
      if (focusedInput) focusedInput.blur();
      const confirmButton = await awaitWithInterval(() => {
        const button = document.evaluate(
          "//button[descendant::*[text() = 'Confirm merge' or text() = 'Confirm auto-merge' or text() = 'Confirm bypass rules and merge']]",
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
