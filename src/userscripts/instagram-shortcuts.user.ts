import { isTyping } from "./utils/isTyping";

const config = {
  /**
   * Whether pressing Space on already liked post unlikes it or not.
   * Defaults to `false` to keep it consistent with the double tapping in mobile app.
   * @default false
   */
  UNLIKE: false,
};

(({ UNLIKE }: typeof config) => {
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

  const findParentButtonRecursively = ({
    origin,
    limit = 5,
  }: {
    origin: Element | null;
    limit: number;
  }): HTMLButtonElement | null => {
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

      const likeButtonSvg =
        buttonsArea.querySelector("[aria-label='Like']") ??
        buttonsArea.querySelector("[aria-label='いいね！']");
      const unlikeButtonSvg =
        buttonsArea.querySelector("[aria-label='Unlike']") ??
        buttonsArea.querySelector("[aria-label='「いいね！」を取り消す']");

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

      const nextButton =
        post.querySelector<HTMLButtonElement>("[aria-label='Next']") ??
        post.querySelector<HTMLButtonElement>("[aria-label='次へ']");
      if (nextButton) nextButton.click();
    }

    if (e.key === "h" || e.key === "ArrowLeft") {
      const post = getTargetPost();
      if (!post) return;

      const prevButton =
        post.querySelector<HTMLButtonElement>("[aria-label='Go Back']") ??
        post.querySelector<HTMLButtonElement>("[aria-label='戻る']");
      if (prevButton) prevButton.click();
    }
  });
})(config);

export {};
