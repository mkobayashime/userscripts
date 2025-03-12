// ==UserScript==
// @name         GitHub - Disable some keymaps
// @namespace    mkobayashime
// @version      0.2.2
// @description  Disable some keyboard shortcuts on GitHub
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://github.com/*
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/github-disable-some-keymaps.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/github-disable-some-keymaps.user.js
// ==/UserScript==

// src/userscripts/utils/isTyping.ts
var isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

// src/userscripts/github-disable-some-keymaps/index.user.ts
void (() => {
  document.body.addEventListener("keydown", (e) => {
    if (isTyping()) return;
    if (e.code === "Period") {
      e.stopImmediatePropagation();
      return false;
    }
  });
})();
