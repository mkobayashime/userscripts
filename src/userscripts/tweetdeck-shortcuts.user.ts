import { isTyping } from "./utils/isTyping";

const config = {};

// eslint-disable-next-line no-empty-pattern
(({}: typeof config) => {
  document.body.addEventListener("keypress", (e) => {
    if (isTyping()) return;

    // workaround for the mysterious page reloading
    // when you hit Escape
    if (e.key === "Escape") {
      e.stopImmediatePropagation();
    }

    if (
      e.key === "l" || // default Like
      e.key === "u" || // default Mute
      e.key === "x" // default Block
    ) {
      e.stopImmediatePropagation();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;

    if (e.key === "Backspace") {
      const closeStackButton = document.querySelector<HTMLElement>(
        "[aria-label='Close stack']"
      );
      if (closeStackButton) closeStackButton.click();
    }

    if (e.key === "Escape") {
      const closeButton = document.querySelector<HTMLElement>(
        "[aria-label='Close']"
      );
      if (closeButton) closeButton.click();
    }

    if (e.key === "f") {
      document.dispatchEvent(
        new KeyboardEvent("keypress", {
          keyCode: 76, // `l`
        })
      );
    }

    /**
     * 0–9 keys to focus columns
     */
    if (e.keyCode >= 48 && e.keyCode < 58) {
      document.dispatchEvent(
        new KeyboardEvent("keypress", {
          keyCode: 67,
        })
      );
      document.dispatchEvent(
        new KeyboardEvent("keypress", {
          keyCode: e.keyCode,
        })
      );
    }
  });
})(config);

export {};
