(function () {
  const storageKey = "___auto-saved-draft";

  const getTextArea = () =>
    document.querySelector<HTMLTextAreaElement>(
      "div[data-drawer='compose'] textarea.js-compose-text"
    );

  window.setInterval(() => {
    const textarea = getTextArea();
    if (!textarea) return;

    const draft = textarea.value;
    if (!draft) return;

    window.localStorage.setItem(storageKey, draft);
  }, 500);

  window.onkeydown = (e) => {
    if (e.altKey && e.code === "KeyP") {
      const textarea = getTextArea();
      if (!textarea) return;

      const draft = window.localStorage.getItem(storageKey);
      if (!draft) return;

      textarea.value = draft;
    }
  };
})();
