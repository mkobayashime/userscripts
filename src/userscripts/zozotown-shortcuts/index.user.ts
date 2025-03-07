import { isTyping } from "../utils/isTyping";

(() => {
  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;

    if (e.key === "l" || e.key === "ArrowRight") {
      const nextButton = document.querySelector<HTMLElement>("#btnNext button");
      if (nextButton) nextButton.click();
    }

    if (e.key === "h" || e.key === "ArrowLeft") {
      const prevButton = document.querySelector<HTMLElement>("#btnPrev button");
      if (prevButton) prevButton.click();
    }
  });
})();
