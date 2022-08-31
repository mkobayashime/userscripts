// ==UserScript==
// @name         Instagram - Shortcut keys
// @namespace    mkobayashime
// @version      2.0.0
// @description  Space key to like, arrow/h/l keys to next/previous photo in the post
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/instagram-shortcuts.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/instagram-shortcuts.user.js
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?domain=instagram.com
// @run-at       document-end
// @grant        none
// ==/UserScript==

const config = {
  /**
   * Whether pressing Space on already liked post unlikes it or not.
   * Defaults to `false` to keep it consistent with the double tapping in mobile app.
   * @default false
   */
  UNLIKE: false,
};
(({ UNLIKE }) => {
  const isTyping = () => {
    const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
    return inputTags.includes(document.activeElement.tagName.toUpperCase());
  };
  const getTargetPost = () => {
    const postWrappers = Array.from(
      document.querySelectorAll('article[role="presentation"]')
    );
    if (postWrappers.length === 1) return postWrappers[0];
    return postWrappers.find((element) => {
      const windowHalfHeight = window.innerHeight / 2;
      const { top, height } = element.getBoundingClientRect();
      return top <= windowHalfHeight && top + height >= windowHalfHeight;
    });
  };
  const findParentButtonRecursively = (
    { origin, limit } = { origin: null, limit: 5 }
  ) => {
    if (!origin || limit < 0) return null;
    if (origin instanceof HTMLButtonElement) return origin;
    return findParentButtonRecursively({
      origin: origin.parentElement,
      limit: limit - 1,
    });
  };
  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;
    if (e.code === "Space") {
      e.preventDefault();
      const targetPost = getTargetPost();
      if (!targetPost) return;
      const buttonsArea = targetPost.querySelector("section");
      if (!buttonsArea) return;
      const likeButtonSvg = buttonsArea.querySelector("[aria-label='Like']");
      const unlikeButtonSvg = buttonsArea.querySelector(
        "[aria-label='Unlike']"
      );
      if (!UNLIKE && unlikeButtonSvg) return;
      const buttonSvgToClick = unlikeButtonSvg ?? likeButtonSvg;
      if (!buttonSvgToClick) return;
      const buttonToClick = findParentButtonRecursively({
        origin: buttonSvgToClick,
        limit: 5,
      });
      if (buttonToClick) buttonToClick.click();
    }
    if (e.key === "l" || e.key === "ArrowRight") {
      const post = getTargetPost();
      if (!post) return;
      const nextButton = post.querySelector("[aria-label='Next']");
      if (nextButton) nextButton.click();
    }
    if (e.key === "h" || e.key === "ArrowLeft") {
      const post = getTargetPost();
      if (!post) return;
      const prevButton = post.querySelector("[aria-label='Go Back']");
      if (prevButton) prevButton.click();
    }
  });
})(config);
