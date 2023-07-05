// ==UserScript==
// @name         Instagram - Shortcut keys
// @namespace    mkobayashime
// @version      2.2.1
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

const isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return (
    inputTags.includes(document.activeElement?.tagName.toUpperCase() ?? "") ||
    document.activeElement?.attributes.getNamedItem("role")?.value === "textbox"
  );
};

const config = {
  /**
   * Whether pressing Space on already liked post unlikes it or not.
   * Defaults to `false` to keep it consistent with the double tapping in mobile app.
   * @default false
   */
  UNLIKE: false,
};
(({ UNLIKE }) => {
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
  window.document.documentElement.addEventListener("keydown", (e) => {
    if (isTyping()) return;
    if (e.code === "Space") {
      e.preventDefault();
      e.stopImmediatePropagation();
      const targetPost = getTargetPost();
      if (!targetPost) return;
      const buttonsArea = targetPost.querySelector("section");
      if (!buttonsArea) return;
      const likeButtonSvg =
        buttonsArea.querySelector("[aria-label='Like']") ??
        buttonsArea.querySelector("[aria-label='いいね！']");
      const unlikeButtonSvg =
        buttonsArea.querySelector("[aria-label='Unlike']") ??
        buttonsArea.querySelector("[aria-label='「いいね！」を取り消す']");
      if (!UNLIKE && unlikeButtonSvg) return;
      const buttonSvgToClick = unlikeButtonSvg ?? likeButtonSvg;
      if (!buttonSvgToClick) return;
      buttonSvgToClick.parentElement?.click();
    }
    if (e.key === "l" || e.key === "ArrowRight") {
      e.stopImmediatePropagation();
      const post = getTargetPost();
      if (!post) return;
      const nextButton =
        post.querySelector("[aria-label='Next']") ??
        post.querySelector("[aria-label='次へ']");
      if (nextButton) nextButton.click();
    }
    if (e.key === "h" || e.key === "ArrowLeft") {
      const post = getTargetPost();
      if (!post) return;
      const prevButton =
        post.querySelector("[aria-label='Go Back']") ??
        post.querySelector("[aria-label='戻る']");
      if (prevButton) prevButton.click();
    }
  });
})(config);
