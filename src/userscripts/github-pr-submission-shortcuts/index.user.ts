import { defineUserScript } from "bundlemonkey";
import { awaitWithInterval } from "../utils/awaitWithInterval";
import { isTyping } from "../utils/isTyping";
import { sleep } from "../utils/sleep";

export default defineUserScript({
  name: "GitHub - PR submission shortcuts",
  version: "1.7.1",
  description: "Ctrl+Enter to merge/automerge PR",
  match: ["https://github.com/*"],
  icon: "https://www.google.com/s2/favicons?domain=github.com",
  main: () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
            "//button[descendant::*[text() = 'Merge pull request' or text() = 'Enable auto-merge' or text() = 'Bypass rules and merge' or text() = 'Squash and merge']]",
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
            "//button[descendant::*[text() = 'Confirm merge' or text() = 'Confirm auto-merge' or text() = 'Confirm bypass rules and merge' or text() = 'Confirm squash and merge']]",
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
  },
});
