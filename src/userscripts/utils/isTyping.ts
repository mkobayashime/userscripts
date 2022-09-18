export const isTyping = () => {
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];
  return inputTags.includes(
    document.activeElement?.tagName.toUpperCase() ?? ""
  );
};
