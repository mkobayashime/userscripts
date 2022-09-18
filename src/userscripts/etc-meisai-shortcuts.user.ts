import { isTyping } from "./utils/isTyping";

(function () {
  "use strict";

  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;

    if (e.key === "h" || e.key === "ArrowLeft") {
      const prevPageButton = document.evaluate(
        "//button[contains(text(), '前頁')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (prevPageButton) prevPageButton.click();
    }

    if (e.key === "l" || e.key === "ArrowRight") {
      const nextPageButton = document.evaluate(
        "//button[contains(text(), '次頁')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (nextPageButton) nextPageButton.click();
    }
  });
})();
