// ==UserScript==
// @name         Twitter - Shortcuts
// @namespace    mkobayashime
// @version      0.2.0
// @description  Refined shortcuts in Twitter for web
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/twitter-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/twitter-shortcuts.user.js
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?domain=twitter.com
// @grant        none
// ==/UserScript==

const isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

const config = {};
// eslint-disable-next-line no-empty-pattern
(({}) => {
  document.body.addEventListener("keypress", (e) => {
    if (isTyping()) return;
    if (
      e.key === "u" || // default Mute
      e.key === "x" // default Block
    ) {
      e.stopImmediatePropagation();
    }
  });
  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;
    if (e.key === "Escape") {
      const closeButton = document.querySelector("[aria-label='Close']");
      if (closeButton) closeButton.click();
    }
    if (e.key === " ") {
      e.preventDefault();
    }
    if (e.key === "[" || e.key === "]") {
      const tabs = Array.from(
        document.querySelectorAll("[role='tablist'] a[role='tab']")
      );
      const activeTabIndex = tabs.findIndex(
        (element) => element.ariaSelected === "true"
      );
      if (activeTabIndex < 0) return;
      const indexOfTabToClick =
        e.key === "["
          ? activeTabIndex === 0
            ? -1
            : activeTabIndex - 1
          : activeTabIndex === tabs.length - 1
          ? -1
          : activeTabIndex + 1;
      if (indexOfTabToClick < 0) return;
      if (tabs[indexOfTabToClick]) {
        tabs[indexOfTabToClick].click();
      }
    }
  });
})(config);
