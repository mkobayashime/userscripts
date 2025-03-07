import { defineUserScript } from "bundlemonkey";
import { isTyping } from "../utils/isTyping";

export default defineUserScript({
  name: "ETC利用照会サービス - Shortcut keys",
  version: "2.0.1",
  description: "ETC利用照会サービスに h/l などのショートカットキーを追加します",
  match: ["https://www2.etc-meisai.jp/etc/*"],
  runAt: "document-end",
  main: () => {
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
  },
});
