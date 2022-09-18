const config = {
  /**
   * Interval of auto saving in milliseconds
   * @default 30000: 30 seconds
   */
  INTERVAL: 30 * 1000,
};

(function ({ INTERVAL }: typeof config) {
  window.setInterval(() => {
    const draftSaveButton = document.evaluate(
      "//button[contains(text(),'下書き保存')]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    if (draftSaveButton instanceof HTMLButtonElement) {
      draftSaveButton.click();
    }
  }, INTERVAL);
})(config);

export {};
