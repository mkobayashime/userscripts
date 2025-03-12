import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "Zoom - Shortcuts",
  version: "1.0.1",
  description: "Google Meet-like Ctrl-d/e shortcuts in Zoom",
  match: ["https://*.zoom.us/*"],
  icon: "https://www.google.com/s2/favicons?domain=zoom.us",
  main: () => {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();

        const microphoneButton = document.querySelector(
          '.footer-button__wrapper button[aria-label*="microphone"]',
        );
        if (microphoneButton && microphoneButton instanceof HTMLElement) {
          microphoneButton.click();
        }
      }

      if (e.ctrlKey && e.key === "e") {
        e.preventDefault();

        const videoButton = document.querySelector(
          '.footer-button__wrapper button[aria-label*="video"]',
        );
        if (videoButton && videoButton instanceof HTMLElement) {
          videoButton.click();
        }
      }
    });
  },
});
