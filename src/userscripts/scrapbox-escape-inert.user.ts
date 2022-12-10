(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || (e.key === "[" && e.ctrlKey)) {
      const textarea = document.getElementById("text-input");
      if (!textarea) return;

      if (document.activeElement === textarea) {
        textarea.blur();
      }
    }
  });
})();

export {};
