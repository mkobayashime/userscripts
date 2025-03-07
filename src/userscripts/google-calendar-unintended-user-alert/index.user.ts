import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "Google Calendar - Unintended User Alert",
  version: "3.0.2",
  description: "Alert when you open Google Calendar in unintended accounts",
  match: ["https://calendar.google.com/calendar/*"],
  icon: "https://www.google.com/s2/favicons?domain=google.com",
  runAt: "document-end",
  config: {
    /**
     * Put the account you want it to be treated as default
     *
     * **Caution**
     * Updating this script to next versions may reset this value.
     * Please re-fill it to make this script works again.
     *
     * @example ["foo@gmail.com", "bar@gmail.com"]
     */
    GOOGLE_ACCOUNT_ADDRESSES: [] as string[],
  },
  main: ({ GOOGLE_ACCOUNT_ADDRESSES }) => {
    const xUserEmailElement = document.getElementById("xUserEmail");
    if (!xUserEmailElement) return;

    if (!GOOGLE_ACCOUNT_ADDRESSES.includes(xUserEmailElement.innerText)) {
      window.alert(
        `Unintended account detected: ${xUserEmailElement.innerText}`,
      );
    }
  },
});
