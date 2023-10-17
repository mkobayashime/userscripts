void (async () => {
  let curTitle = "";

  new MutationObserver(() => {
    if (document.title === curTitle) return;

    curTitle = document.title;

    if (!(document.activeElement instanceof HTMLElement)) return;
    document.activeElement.blur();
  }).observe(document.head, {
    subtree: true,
    childList: true,
  });
})();
