// ==UserScript==
// @name         Slack - No desktop app
// @namespace    mkobayashime
// @version      1.1.0
// @author       mkobayashime
// @description  Open workspace in the browser after signing in, not in desktop app
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/slack-no-desktop-app.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/slack-no-desktop-app.user.js
// @match        https://*.slack.com/ssb/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=slack.com
// @grant        none
// ==/UserScript==

(async function () {
  "use strict";

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("entry_point") === "workspace_signin") {
    window.location.href = window.location.origin;
  }
})();
