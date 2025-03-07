import { isTyping } from "../utils/isTyping";

document.body.addEventListener("keydown", (e) => {
  if (isTyping()) return;

  if (e.code === "Period") {
    e.stopImmediatePropagation();
    return false;
  }
});
