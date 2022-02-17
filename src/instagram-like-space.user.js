// ==UserScript==
// @name         Instagram - Like with Space
// @namespace    mkobayashime
// @version      1.0.2
// @description  Like post in the center of the screen with Space key
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/instagram-like-space.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/src/instagram-like-space.user.js
// @include      https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault()

      const postWrappers = Array.from(document.getElementsByTagName("article"))

      const postWrapperInCenter = postWrappers.find((element) => {
        const windowHalfHeight = window.innerHeight / 2
        const { top, height } = element.getBoundingClientRect()

        return top <= windowHalfHeight && top + height >= windowHalfHeight
      })
      if (!postWrapperInCenter) return

      const likeButtonSvg = postWrapperInCenter.querySelector(
        "[aria-label='Like'], [aria-label='Unlike']"
      )
      if (!likeButtonSvg) return

      const likeButtonInner = likeButtonSvg.parentElement
      if (likeButtonInner) likeButtonInner.click()
    }
  })
})()
