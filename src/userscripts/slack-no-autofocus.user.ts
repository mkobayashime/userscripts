const waitForChannelNameWrapper = async (): Promise<Element> =>
  new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      throw new Error("Timeout: Getting channel name wrapper");
    }, 30000);

    const interval = window.setInterval(() => {
      const channelNameWrapper = document.querySelector(
        ".p-workspace__primary_view"
      );

      if (channelNameWrapper) {
        resolve(channelNameWrapper);

        window.clearInterval(interval);
        window.clearTimeout(timeout);
      }
    }, 200);
  });

(async function () {
  const channelNameWrapper = await waitForChannelNameWrapper();

  new MutationObserver((e) => {
    const oldAriaLabel = e[0].oldValue;

    if (!(e[0].target instanceof HTMLElement)) return;
    const currentAriaLabel = e[0].target.ariaLabel;

    if (!oldAriaLabel || !currentAriaLabel) return;

    if (oldAriaLabel !== currentAriaLabel) {
      if (!(document.activeElement instanceof HTMLElement)) return;
      document.activeElement.blur();
    }
  }).observe(channelNameWrapper, { attributeOldValue: true });
})();
