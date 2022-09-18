import { isTyping } from "./utils/isTyping";

(function () {
  "use strict";

  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;

    if (e.key === "l" || e.key === "ArrowRight") {
      e.preventDefault();
      const nextButton = document.querySelector("#controls a.next");
      if (nextButton) nextButton.click();
    }

    if (e.key === "h" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prevButton = document.querySelector("#controls a.prev");
      if (prevButton) prevButton.click();
    }
  });
})();
