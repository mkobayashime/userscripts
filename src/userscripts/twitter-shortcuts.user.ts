import { isTyping } from "./utils/isTyping";

const config = {};

// eslint-disable-next-line no-empty-pattern
(({}: typeof config) => {
  document.body.addEventListener("keypress", (e) => {
    if (isTyping()) return;

    if (
      e.key === "u" || // default Mute
      e.key === "x" // default Block
    ) {
      e.stopImmediatePropagation();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (isTyping()) return;

    if (e.key === "Escape") {
      const closeButton = document.querySelector<HTMLElement>(
        "[aria-label='Close']"
      );
      if (closeButton) closeButton.click();
    }

    if (e.key === " ") {
      e.preventDefault();
    }

    if (e.key === "[" || e.key === "]") {
      if (!window.location.href.startsWith("https://twitter.com/home")) return;

      const timelineTabs = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[role='tablist'] a[href='/home'][role='tab']"
        )
      );

      const activeTabIndex = timelineTabs.findIndex(
        (element) => element.ariaSelected === "true"
      );
      if (activeTabIndex < 0) return;

      const indexOfTabToClick =
        e.key === "["
          ? activeTabIndex === 0
            ? -1
            : activeTabIndex - 1
          : activeTabIndex === timelineTabs.length - 1
          ? -1
          : activeTabIndex + 1;
      if (indexOfTabToClick < 0) return;

      if (timelineTabs[indexOfTabToClick]) {
        timelineTabs[indexOfTabToClick].click();
      }
    }
  });
})(config);

export {};
