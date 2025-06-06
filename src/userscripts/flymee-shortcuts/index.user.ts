import { defineUserScript } from "bundlemonkey";
import { isTyping } from "../utils/isTyping";

export default defineUserScript({
  name: "FLYMEe - Shortcut keys",
  version: "1.0.0",
  description: "Next/Prev image with arrow/h/l keys",
  match: ["https://flymee.jp/product/*"],
  icon: "https://www.google.com/s2/favicons?domain=flymee.jp",
  main: () => {
    window.addEventListener("keydown", (e) => {
      if (isTyping()) return;

      if (e.key === "l" || e.key === "ArrowRight") {
        const nextButton = document.querySelector<HTMLElement>(
          ".main_image .icon_next",
        );
        if (nextButton) nextButton.click();
      }

      if (e.key === "h" || e.key === "ArrowLeft") {
        const prevButton = document.querySelector<HTMLElement>(
          ".main_image .icon_prev",
        );
        if (prevButton) prevButton.click();
      }
    });
  },
});
