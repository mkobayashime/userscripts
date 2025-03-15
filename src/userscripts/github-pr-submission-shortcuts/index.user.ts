import { defineUserScript } from "bundlemonkey";
import { awaitWithInterval } from "../utils/awaitWithInterval";
import { isTyping } from "../utils/isTyping";

export default defineUserScript({
  name: "GitHub - PR submission shortcuts",
  version: "1.3.0",
  description: "Ctrl+Enter to merge/automerge PR",
  match: ["https://github.com/*"],
  icon: "https://www.google.com/s2/favicons?domain=github.com",
  main: () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
  },
});
