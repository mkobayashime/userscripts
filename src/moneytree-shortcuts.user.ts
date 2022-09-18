(function () {
  "use strict";

  document.onkeypress = (e) => {
    if (e.ctrlKey && e.code === "Enter") {
      const saveBtnInner = document.getElementsByClassName(
        "modal-header-done-text"
      )[0];
      if (saveBtnInner) {
        saveBtnInner.parentElement.click();
      }
    }
  };

  document.onkeyup = (e) => {
    if (e.key === "Escape") {
      const cancelBtnInner = document.getElementsByClassName(
        "modal-header-back-text"
      )[0];
      if (cancelBtnInner) {
        cancelBtnInner.parentElement.click();
      }
    }
  };
})();
