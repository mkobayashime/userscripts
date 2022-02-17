// ==UserScript==
// @name         Instagram - Arrow keys
// @namespace    mkobayashime
// @version      1.0.2
// @description  Next/Prev post with arrow/h/l keys
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/instagram-arrow.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/src/instagram-arrow.user.js
// @include      https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  const getPostInTheCenter = () => {
    const postWrappers = Array.from(document.getElementsByTagName("article"))

    return postWrappers.find((element) => {
      const windowHalfHeight = window.innerHeight / 2
      const { top, height } = element.getBoundingClientRect()

      return top <= windowHalfHeight && top + height >= windowHalfHeight
    })
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "l" || e.key === "ArrowRight") {
      e.preventDefault()

      const post = getPostInTheCenter()
      if (!post) return

      const nextButton = post.querySelector("[aria-label='Next']")
      if (nextButton) nextButton.click()
    }

    if (e.key === "h" || e.key === "ArrowLeft") {
      e.preventDefault()

      const post = getPostInTheCenter()
      if (!post) return

      const prevButton = post.querySelector("[aria-label='Go Back']")
      if (prevButton) prevButton.click()
    }
  })
})()
