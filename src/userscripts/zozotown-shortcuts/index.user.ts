import { defineUserScript } from "bundlemonkey";
import { isTyping } from "../utils/isTyping";

export default defineUserScript({
  name: "ZOZOTOWN - Shortcut keys",
  version: "1.4.2",
  description: "Next/Prev image with arrow/h/l keys",
  match: ["https://zozo.jp/*"],
  runAt: "document-end",
  icon: "https://www.google.com/s2/favicons?domain=zozo.jp",
  main: () => {
    window.addEventListener("keydown", (e) => {
      if (isTyping()) return;

      if (e.key === "l" || e.key === "ArrowRight") {
        const nextButton =
          document.querySelector<HTMLElement>("#btnNext button");
        if (nextButton) nextButton.click();
      }

      if (e.key === "h" || e.key === "ArrowLeft") {
        const prevButton =
          document.querySelector<HTMLElement>("#btnPrev button");
        if (prevButton) prevButton.click();
      }
    });
  },
});
