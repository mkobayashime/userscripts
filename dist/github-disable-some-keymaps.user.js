// ==UserScript==
// @name         GitHub - Disable some keymaps
// @namespace    mkobayashime
// @version      0.2.1
// @description  Disable some keyboard shortcuts on GitHub
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/github-disable-some-keymaps.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/github-disable-some-keymaps.user.js
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// ==/UserScript==

const isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

document.body.addEventListener("keydown", (e) => {
  if (isTyping()) return;
  if (e.code === "Period") {
    e.stopImmediatePropagation();
    return false;
  }
});
