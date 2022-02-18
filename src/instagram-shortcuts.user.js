// ==UserScript==
// @name         Instagram - Shortcut keys
// @namespace    mkobayashime
// @version      1.0.0
// @description  Space key to like, arrow/h/l keys to next/previous photo in the post
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/instagram-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/src/instagram-shortcuts.user.js
// @include      https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

/**
 * Whether pressing Space on already liked post unlikes it or not.
 * Defaults to `false` to keep it consistent with the double tapping in mobile app.
 * @default false
 */
const UNLIKE = false

;(function () {
  "use strict"

  const isTyping = () => {
    const inputTags = ["INPUT", "TEXTAREA", "SELECT"]
    return inputTags.includes(document.activeElement.tagName.toUpperCase())
  }

  const getTargetPost = () => {
    const postWrappers = Array.from(document.getElementsByTagName("article"))

    return postWrappers.find((element) => {
      const windowHalfHeight = window.innerHeight / 2
      const { top, height } = element.getBoundingClientRect()

      return top <= windowHalfHeight && top + height >= windowHalfHeight
    })
  }

  window.addEventListener("keydown", (e) => {
    if (isTyping()) return

    if (e.code === "Space") {
      e.preventDefault()

      const targetPost = getTargetPost()
      if (!targetPost) return

      const likeButtonSvg = targetPost.querySelector("[aria-label='Like']")
      const unlikeButtonSvg = targetPost.querySelector("[aria-label='Unlike']")

      if (!UNLIKE && unlikeButtonSvg) return

      /**
       * Prioritize `unlikeButtonSvg` over `likeButtonSvg` in order not to
       * click like button of comments
       */
      const buttonSvgToClick = unlikeButtonSvg ?? likeButtonSvg
      if (!buttonSvgToClick) return

      const buttonInner = buttonSvgToClick.parentElement
      if (buttonInner) buttonInner.click()
    }

    if (e.key === "l" || e.key === "ArrowRight") {
      const post = getTargetPost()
      if (!post) return

      const nextButton = post.querySelector("[aria-label='Next']")
      if (nextButton) nextButton.click()
    }

    if (e.key === "h" || e.key === "ArrowLeft") {
      const post = getTargetPost()
      if (!post) return

      const prevButton = post.querySelector("[aria-label='Go Back']")
      if (prevButton) prevButton.click()
    }
  })
})()
