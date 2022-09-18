(function () {
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      const saveFromSiteButton = document.querySelector(
        '[data-test-id="save-from-site-button"] button'
      );
      if (saveFromSiteButton) {
        saveFromSiteButton.click();
        return;
      }

      const websiteLinkSubmitButton = document.querySelector(
        '[data-test-id="website-link-submit-button"]'
      );
      if (websiteLinkSubmitButton) {
        websiteLinkSubmitButton.click();
        return;
      }

      e.preventDefault();
      document.activeElement.blur();
      const addNPinButtonCandidates = Array.from(
        document.querySelectorAll('[data-test-id="pin-builder-draft"] button')
      );
      const addNPinButton = addNPinButtonCandidates.find(
        (el) => el.innerText.startsWith("Add") && el.innerText.endsWith("Pin")
      );
      if (addNPinButton) {
        addNPinButton.click();
        return;
      }

      const dropdownSaveButton = document.querySelector(
        'button[data-test-id="board-dropdown-save-button"]'
      );
      if (dropdownSaveButton) {
        dropdownSaveButton.click();
        return;
      }
    }
  });
})();
