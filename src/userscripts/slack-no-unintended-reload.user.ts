(function () {
  window.addEventListener("beforeunload", (event) => {
    const messageInputContainer =
      document.getElementsByClassName("ql-editor")[0];
    if (messageInputContainer) {
      const isEmpty = new RegExp(".");

      const messageLines = messageInputContainer.children;

      if (
        Array.from(messageLines).some((line) => isEmpty.test(line.innerText))
      ) {
        event.preventDefault();
        event.returnValue = "";
        return false;
      }
    }
  });
})();
