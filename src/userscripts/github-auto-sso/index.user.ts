(() => {
  const ssoFormSubmitButton = document.querySelector(
    ".business-sso-panel form button[type='submit']",
  );
  if (ssoFormSubmitButton instanceof HTMLElement) {
    ssoFormSubmitButton.click();
    return;
  }

  const ssoAnchor = document.querySelector(
    "section[aria-labelledby='single-sign-on'] a",
  );
  if (!(ssoAnchor instanceof HTMLElement)) return;

  ssoAnchor.click();
})();

export {};
