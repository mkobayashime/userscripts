// ==UserScript==
// @name            Slack - No unintended reloads
// @namespace       mkobayashime
// @version         1.0.1
// @description     Alert when you reload/close Slack with a new draft
// @author          mkobayashime
// @homepage        https://github.com/mkobayashime/userscripts
// @updateURL       https://github.com/mkobayashime/userscripts/raw/main/src/slack-no-unintended-reload.user.js
// @include         https://app.slack.com/*
// @icon            https://www.google.com/s2/favicons?domain=slack.com
// @run-at          document-end
// @grant           none
// ==/UserScript==

;(function () {
  "use strict"

  window.addEventListener("beforeunload", (event) => {
    const messageInputContainer = document.getElementsByClassName(
      "ql-editor"
    )[0]
    if (messageInputContainer) {
      const isEmpty = new RegExp(".")

      const messageLines = messageInputContainer.children

      if (
        Array.from(messageLines).some((line) => isEmpty.test(line.innerText))
      ) {
        event.preventDefault()
        event.returnValue = ""
        return false
      }
    }
  })
})()
