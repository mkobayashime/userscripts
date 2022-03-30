// ==UserScript==
// @name         GitHub - Disable some keymaps
// @namespace    https://github.com
// @version      0.1.0
// @description  .
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/github-disable-some-keymaps.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/src/github-disable-some-keymaps.user.js
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

// docgen-ignore

(function () {
  "use strict";

  const isTyping = () => {
    const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
    return inputTags.includes(document.activeElement.tagName.toUpperCase());
  };

  document.addEventListener("keydown", (e) => {
    if (isTyping()) return;

    if (e.code === "Period") {
      e.preventDefault();
    }
  });
})();
