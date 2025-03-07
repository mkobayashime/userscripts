import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "GitHub - Auto SSO",
  version: "1.1.0",
  description: "Attempt SSO if the banner exists on every pageload",
  match: ["https://github.com/*"],
  icon: "https://www.google.com/s2/favicons?domain=github.com",
  main: () => {
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
  },
});
