(function () {
  window.onkeyup = (e) => {
    if (e.key === "Escape") {
      const xpath = "//button[contains(text(),'閉じる')]";
      const matchingElement = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (matchingElement) matchingElement.click();
    }
  };
})();
