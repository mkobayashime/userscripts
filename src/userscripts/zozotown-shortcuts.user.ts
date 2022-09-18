(function () {
  "use strict";

  const isTyping = () => {
    const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
    return inputTags.includes(document.activeElement.tagName.toUpperCase());
  };

  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;

    if (e.key === "l" || e.key === "ArrowRight") {
      const nextButton = document.querySelector("#btnNext button");
      if (nextButton) nextButton.click();
    }

    if (e.key === "h" || e.key === "ArrowLeft") {
      const prevButton = document.querySelector("#btnPrev button");
      if (prevButton) prevButton.click();
    }
  });
})();
