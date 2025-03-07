import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "note - Auto save drafts",
  version: "2.0.1",
  description: "Auto save draft articles periodically",
  match: ["https://editor.note.com/notes/*"],
  runAt: "document-end",
  icon: "https://www.google.com/s2/favicons?domain=note.com",
  config: {
    /**
     * Interval of auto saving in milliseconds
     * @default 30000: 30 seconds
     */
    INTERVAL: 30 * 1000,
  },
  main: ({ INTERVAL }) => {
    window.setInterval(() => {
      const draftSaveButton = document.evaluate(
        "//button[contains(text(),'下書き保存')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (draftSaveButton instanceof HTMLButtonElement) {
        draftSaveButton.click();
      }
    }, INTERVAL);
  },
});
