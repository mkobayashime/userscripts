import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "Slack - No autofocus in moving channels",
  version: "2.0.2",
  description:
    "Disable autofocus to the message input field after moved to another channel",
  match: ["https://app.slack.com/client/*"],
  icon: "https://www.google.com/s2/favicons?sz=64&domain=slack.com",
  main: () => {
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
  },
});
