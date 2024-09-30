const config: { GOOGLE_ACCOUNT_ADDRESSES: string[] } = {
  /**
   * Put the account you want it to be treated as default
   *
   * **Caution**
   * Updating this script to next versions may reset this value.
   * Please re-fill it to make this script works again.
   *
   * @example ["foo@gmail.com", "bar@gmail.com"]
   */
  GOOGLE_ACCOUNT_ADDRESSES: [],
};

(({ GOOGLE_ACCOUNT_ADDRESSES }: typeof config) => {
  const xUserEmailElement = document.getElementById("xUserEmail");
  if (!xUserEmailElement) return;

  if (!GOOGLE_ACCOUNT_ADDRESSES.includes(xUserEmailElement.innerText)) {
    window.alert(`Unintended account detected: ${xUserEmailElement.innerText}`);
  }
})(config);

export {};
