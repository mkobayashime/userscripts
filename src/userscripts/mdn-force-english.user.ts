(() => {
  if (
    window.location.href.startsWith("https://developer.mozilla.org/ja/docs/")
  ) {
    window.location.href = window.location.href.replace(
      RegExp("^https://developer.mozilla.org/ja/docs/"),
      "https://developer.mozilla.org/en-US/docs/",
    );
  }
})();

export {};
