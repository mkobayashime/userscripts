(function () {
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      const saveFromSiteButton = document.querySelector<HTMLButtonElement>(
        '[data-test-id="save-from-site-button"] button',
      );
      if (saveFromSiteButton) {
        saveFromSiteButton.click();
        return;
      }

      const websiteLinkSubmitButton = document.querySelector<HTMLButtonElement>(
        '[data-test-id="website-link-submit-button"]',
      );
      if (websiteLinkSubmitButton) {
        websiteLinkSubmitButton.click();
        return;
      }

      e.preventDefault();
      if (!(document.activeElement instanceof HTMLElement)) return;
      document.activeElement.blur();
      const addNPinButtonCandidates: HTMLSelectElement[] = Array.from(
        document.querySelectorAll('[data-test-id="pin-builder-draft"] button'),
      );
      const addNPinButton = addNPinButtonCandidates.find(
        (el) => el.innerText.startsWith("Add") && el.innerText.endsWith("Pin"),
      );
      if (addNPinButton) {
        addNPinButton.click();
        return;
      }

      const dropdownSaveButton = document.querySelector<HTMLButtonElement>(
        'button[data-test-id="board-dropdown-save-button"]',
      );
      if (dropdownSaveButton) {
        dropdownSaveButton.click();
      }
    }
  });
})();
