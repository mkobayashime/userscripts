// ==UserScript==
// @name         TweetDeck - Auto save draft
// @description  Auto save composing tweet and restore it with Alt+P shortcut
// @namespace    mkobayashime
// @version      1.4.0
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/tweetdeck-auto-save-draft.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/tweetdeck-auto-save-draft.user.js
// @match        https://tweetdeck.twitter.com/
// @icon         https://www.google.com/s2/favicons?domain=tweetdeck.twitter.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const storageKey = "___auto-saved-draft";

  const getTextArea = () =>
    document.querySelector(
      "div[data-drawer='compose'] textarea.js-compose-text"
    );

  window.setInterval(() => {
    const textarea = getTextArea();
    if (!textarea) return;

    const draft = textarea.value;
    if (!draft) return;

    window.localStorage.setItem(storageKey, draft);
  }, 500);

  window.onkeydown = (e) => {
    if (e.altKey && e.code === "KeyP") {
      const textarea = getTextArea();
      if (!textarea) return;

      const draft = window.localStorage.getItem(storageKey);
      if (!draft) return;

      textarea.value = draft;
    }
  };
})();
