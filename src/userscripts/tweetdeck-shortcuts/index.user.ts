import { defineUserScript } from "bundlemonkey";
import { isTyping } from "../utils/isTyping";

export default defineUserScript({
  name: "TweetDeck Preview - Shortcuts",
  version: "0.2.4",
  description: "Refined shortcuts in the new (preview) version of TweetDeck",
  match: ["https://tweetdeck.twitter.com/*"],
  icon: "https://www.google.com/s2/favicons?domain=twitter.com",
  main: () => {
    document.body.addEventListener("keypress", (e) => {
      if (isTyping()) return;

      // workaround for the mysterious page reloading
      // when you hit Escape
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
      }

      if (
        // default Like
        e.key === "l" ||
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

      if (e.key === "Backspace") {
        const closeStackButton = document.querySelector<HTMLElement>(
          "[aria-label='Close stack']",
        );
        if (closeStackButton) closeStackButton.click();
      }

      if (e.key === "Escape") {
        const closeButton = document.querySelector<HTMLElement>(
          "[aria-label='Close']",
        );
        if (closeButton) closeButton.click();
      }

      if (e.key === "f") {
        document.dispatchEvent(
          new KeyboardEvent("keypress", {
            // `l`
            keyCode: 76,
          }),
        );
      }

      /**
       * 0–9 keys to focus columns
       */
      if (e.keyCode >= 48 && e.keyCode < 58) {
        document.dispatchEvent(
          new KeyboardEvent("keypress", {
            keyCode: 67,
          }),
        );
        document.dispatchEvent(
          new KeyboardEvent("keypress", {
            keyCode: e.keyCode,
          }),
        );
      }
    });
  },
});
