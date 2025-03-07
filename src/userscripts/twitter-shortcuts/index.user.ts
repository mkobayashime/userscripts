import { defineUserScript } from "bundlemonkey";
import { isTyping } from "../utils/isTyping";

export default defineUserScript({
  name: "Twitter - Shortcuts",
  version: "0.4.3",
  description: "Refined shortcuts in Twitter for web",
  match: ["https://twitter.com/*"],
  icon: "https://www.google.com/s2/favicons?domain=twitter.com",
  main: () => {
    const findTweetInCenter = () => {
      if (/^https:\/\/twitter.com\/.*\/status\//.exec(window.location.href)) {
        return document.querySelector<HTMLElement>(
          "article[data-testid='tweet'][tabindex='-1']",
        );
      }

      const tweetWrappers = Array.from(
        document.querySelectorAll<HTMLElement>("article[data-testid='tweet']"),
      );

      if (tweetWrappers.length === 0) return;
      if (tweetWrappers.length === 1) return tweetWrappers[0];

      return tweetWrappers.find((element) => {
        const windowHalfHeight = window.innerHeight / 2;
        const { top, height } = element.getBoundingClientRect();

        return top <= windowHalfHeight && top + height >= windowHalfHeight;
      });
    };

    document.body.addEventListener("keypress", (e) => {
      if (isTyping()) return;

      if (
        // default Mute
        e.key === "u" ||
        // default Block
        e.key === "x"
      ) {
        e.stopImmediatePropagation();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (isTyping()) return;

      if (e.key === "Escape") {
        const closeButton = document.querySelector<HTMLElement>(
          "[aria-label='Close']",
        );
        if (closeButton) closeButton.click();
      }

      if (e.key === " ") {
        e.preventDefault();
      }

      if (e.key === "[" || e.key === "]") {
        const tabs = Array.from(
          document.querySelectorAll<HTMLElement>(
            "[role='tablist'] a[role='tab']",
          ),
        );

        const activeTabIndex = tabs.findIndex(
          (element) => element.ariaSelected === "true",
        );
        if (activeTabIndex < 0) return;

        const indexOfTabToClick =
          e.key === "["
            ? activeTabIndex === 0
              ? -1
              : activeTabIndex - 1
            : activeTabIndex === tabs.length - 1
              ? -1
              : activeTabIndex + 1;
        if (indexOfTabToClick < 0) return;

        if (tabs[indexOfTabToClick]) {
          tabs[indexOfTabToClick].click();
        }
      }

      if (e.ctrlKey && e.key === "e") {
        const tweetURLMatch =
          /^https:\/\/twitter\.com\/\S+\/status\/\d+[^/]*/.exec(
            window.location.href,
          );
        if (!tweetURLMatch) return;

        e.preventDefault();
        window.open(`${tweetURLMatch[0]}/likes`);
      }

      if (e.ctrlKey && e.key === "l") {
        e.preventDefault();

        const targetTweet = findTweetInCenter();
        if (!targetTweet) return;

        const likeButton = targetTweet.querySelector(
          "[data-testid='like'][role='button'], [data-testid='unlike'][role='button']",
        );
        if (likeButton instanceof HTMLElement) likeButton.click();
      }
    });
  },
});
