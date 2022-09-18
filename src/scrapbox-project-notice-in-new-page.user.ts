(function () {
  "use strict";

  new MutationObserver(() => {
    if (window.scrapbox.Page.lines?.length === 1) {
      window.alert(
        `You are about to create a new page in "${
          window.scrapbox.Project?.name ?? "unknown project"
        }". Are you sure?`
      );
    }
  }).observe(document.querySelector("title"), { childList: true });
})();
