// ==UserScript==
// @name         MDN - Force English
// @namespace    mkobayashime
// @version      1.0.2
// @description  Redirect Japanese pages in MDN to corresponding English pages
// @icon         https://www.google.com/s2/favicons?domain=developer.mozilla.org
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://developer.mozilla.org/ja/docs/*
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/mdn-force-english.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/mdn-force-english.user.js
// ==/UserScript==

// src/userscripts/mdn-force-english/index.user.ts
void (() => {
  if (
    window.location.href.startsWith("https://developer.mozilla.org/ja/docs/")
  ) {
    window.location.href = window.location.href.replace(
      /^https:\/\/developer.mozilla.org\/ja\/docs\//,
      "https://developer.mozilla.org/en-US/docs/",
    );
  }
})();
