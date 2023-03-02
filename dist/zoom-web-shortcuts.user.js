// ==UserScript==
// @name         Zoom - Shortcuts
// @namespace    mkobayashime
// @version      1.0.0
// @description  Google Meet-like Ctrl-d/e shortcuts in Zoom
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/zoom-web-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/zoom-web-shortcuts.user.js
// @match        https://*.zoom.us/*
// @icon         https://www.google.com/s2/favicons?domain=zoom.us
// @grant        none
// ==/UserScript==

(() => {
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      const microphoneButton = document.querySelector(
        '.footer-button__wrapper button[aria-label*="microphone"]'
      );
      if (microphoneButton && microphoneButton instanceof HTMLElement) {
        microphoneButton.click();
      }
    }
    if (e.ctrlKey && e.key === "e") {
      e.preventDefault();
      const videoButton = document.querySelector(
        '.footer-button__wrapper button[aria-label*="video"]'
      );
      if (videoButton && videoButton instanceof HTMLElement) {
        videoButton.click();
      }
    }
  });
})();
