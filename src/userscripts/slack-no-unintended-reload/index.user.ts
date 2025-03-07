import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "Slack - No unintended reloads",
  version: "1.3.1",
  description: "Alert when you reload/close Slack with a new draft",
  match: ["https://app.slack.com/*"],
  runAt: "document-end",
  icon: "https://www.google.com/s2/favicons?domain=slack.com",
  main: () => {
    window.addEventListener("beforeunload", (event) => {
      const messageInputContainer =
        document.getElementsByClassName("ql-editor")[0];
      if (messageInputContainer) {
        const isEmpty = /./;

        const messageLines = messageInputContainer.children;

        if (
          (Array.from(messageLines) as HTMLElement[]).some((line) =>
            isEmpty.test(line.innerText),
          )
        ) {
          event.preventDefault();
          event.returnValue = "";
          return false;
        }
      }
    });
  },
});
