import { defineUserScript } from "bundlemonkey";
import { isTyping } from "../utils/isTyping";

export default defineUserScript({
  name: "HOME'S - Shortcut keys",
  version: "1.3.3",
  description: "Next/Prev image with arrow/h/l keys",
  match: ["https://www.homes.co.jp/*"],
  icon: "https://www.google.com/s2/favicons?domain=homes.co.jp",
  runAt: "document-end",
  main: () => {
    window.addEventListener("keydown", (e) => {
      if (isTyping()) return;

      if (e.key === "l" || e.key === "ArrowRight") {
        e.preventDefault();
        const nextButton = document.querySelector<HTMLElement>(
          "[aria-label='Next slide']",
        );
        if (nextButton) nextButton.click();
      }

      if (e.key === "h" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prevButton = document.querySelector<HTMLElement>(
          "[aria-label='Previous slide']",
        );
        if (prevButton) prevButton.click();
      }
    });
  },
});
