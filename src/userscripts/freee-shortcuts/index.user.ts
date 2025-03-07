import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "freee shortcut keys",
  version: "1.3.3",
  match: ["https://secure.freee.co.jp/*"],
  description: "freee にショートカットキーを追加します",
  icon: "https://www.google.com/s2/favicons?domain=freee.co.jp",
  runAt: "document-end",
  main: () => {
    window.onkeyup = (e) => {
      if (e.key === "Escape") {
        const xpath = "//button[contains(text(),'閉じる')]";
        const matchingElement = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;

        if (matchingElement && matchingElement instanceof HTMLElement)
          matchingElement.click();
      }
    };
  },
});
