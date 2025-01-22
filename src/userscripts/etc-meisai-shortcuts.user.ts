import { isTyping } from "./utils/isTyping";

(() => {
  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;

    if (e.key === "h" || e.key === "ArrowLeft") {
      const prevPageButton = document.evaluate(
        "//button[contains(text(), '前月')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (prevPageButton && prevPageButton instanceof HTMLElement)
        prevPageButton.click();
    }

    if (e.key === "l" || e.key === "ArrowRight") {
      const nextPageButton = document.evaluate(
        "//button[contains(text(), '翌月')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (nextPageButton && nextPageButton instanceof HTMLElement)
        nextPageButton.click();
    }
  });
})();
