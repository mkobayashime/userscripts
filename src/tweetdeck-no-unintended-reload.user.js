// ==UserScript==
// @name            No unintended reloads in TweetDeck
// @namespace       mkobayashime
// @version         1.0.1
// @description     Display confirmation dialogue when you reload/close TweetDeck with a new draft tweet
// @description:jp  書きかけのツイートがある状態で TweetDeck をリロードしたり閉じてしまうのを防ぎます
// @author          mkobayashime
// @homepage        https://github.com/mkobayashime/userscripts
// @updateURL       https://github.com/mkobayashime/userscripts/raw/main/src/tweetdeck-no-unintended-reload.user.js
// @include         https://tweetdeck.twitter.com/
// @icon            https://www.google.com/s2/favicons?domain=tweetdeck.twitter.com
// @run-at          document-end
// @grant           none
// ==/UserScript==

;(function () {
  "use strict"

  window.addEventListener("beforeunload", (event) => {
    const textarea = document.getElementsByTagName("textarea")[0]
    if (textarea) {
      if (textarea.value) {
        event.preventDefault()
        event.returnValue = ""
      }
    }
  })
})()
