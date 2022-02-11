// ==UserScript==
// @name         Instagram - Like with Space
// @namespace    mkobayashime
// @version      1.0.0
// @description  Like photo in the center of the screen with Space key
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

  window.onkeydown = (e) => {
    if (e.code === "Space") {
      e.preventDefault()

      const photoWrappers = Array.from(document.getElementsByTagName("article"))

      const photoWrapperInCenter = photoWrappers.find((element) => {
        const windowHalfHeight = window.innerHeight / 2
        const { top, height } = element.getBoundingClientRect()

        return top <= windowHalfHeight && top + height >= windowHalfHeight
      })
      if (!photoWrapperInCenter) return

      const likeButtonSvg = photoWrapperInCenter.querySelector(
        "[aria-label='Like'], [aria-label='Unlike']"
      )
      if (!likeButtonSvg) return

      const likeButtonInner = likeButtonSvg.parentElement
      if (likeButtonInner) likeButtonInner.click()
    }
  }
})()
