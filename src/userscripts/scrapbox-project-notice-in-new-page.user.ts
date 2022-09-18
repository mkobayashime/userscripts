(function () {
  const titleElement = document.querySelector("title");
  if (!titleElement) return;

  new MutationObserver(() => {
    if ((window as any).scrapbox.Page.lines?.length === 1) {
      window.alert(
        `You are about to create a new page in "${
          (window as any).scrapbox.Project?.name ?? "unknown project"
        }". Are you sure?`
      );
    }
  }).observe(titleElement, { childList: true });
})();
