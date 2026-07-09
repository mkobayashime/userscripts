import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "Rakuten Humanized",
  version: "1.0.0",
  description: "楽天の商品ページを人間にも使える程度にマシにします",
  match: ["https://item.rakuten.co.jp/*"],
  runAt: "document-end",
  icon: "https://www.google.com/s2/favicons?domain=rakuten.co.jp",
  main: () => {
    const itemNameArea = document.querySelector("#item-name-area");
    if (!itemNameArea) return;

    const table = itemNameArea.closest("table:has(#item-name-area)");
    if (!table) return;

    const prevSibling = table.previousElementSibling;
    if (!prevSibling) return;

    prevSibling.before(table);
  },
});
