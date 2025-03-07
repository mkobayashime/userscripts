import { defineUserScript } from "bundlemonkey";

/* eslint-disable no-var */
declare global {
  var scrapbox: {
    Page: {
      lines?: unknown[];
    };

    Project?: {
      name?: string;
    };
  };
}
/* eslint-enable no-var */

export default defineUserScript({
  name: "Scrapbox - Project name notice in new page",
  version: "1.2.2",
  description:
    "Scrapbox ページを新たに作成する際、意図したプロジェクトか確認するアラートを表示します",
  match: ["https://scrapbox.io/*"],
  icon: "https://www.google.com/s2/favicons?domain=scrapbox.io",
  main: () => {
    const titleElement = document.querySelector("title");
    if (!titleElement) return;

    new MutationObserver(() => {
      if (window.scrapbox.Page.lines?.length === 1) {
        window.alert(
          `You are about to create a new page in "${
            window.scrapbox.Project?.name ?? "unknown project"
          }". Are you sure?`,
        );
      }
    }).observe(titleElement, { childList: true });
  },
});
