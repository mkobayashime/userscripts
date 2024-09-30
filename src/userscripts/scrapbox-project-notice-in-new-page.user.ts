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

(function () {
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
})();

export {};
