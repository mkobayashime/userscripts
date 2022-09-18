(function () {
  window.addEventListener("beforeunload", (event) => {
    const textarea = document.getElementsByTagName("textarea")[0];
    if (textarea) {
      if (textarea.value) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
  });
})();
