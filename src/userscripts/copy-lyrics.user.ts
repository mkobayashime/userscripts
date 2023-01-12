import { copyToClipboard } from "./utils/copyToClipboard";
import { enableSelection } from "./utils/enableSelection";

const googleSearch = () => {
  const wrapper = document.querySelector("div[data-lyricid]");
  if (!wrapper) return;

  const paragraphsWrapper = wrapper.children[1];
  if (!paragraphsWrapper) return;

  const paragraphs = Array.from(paragraphsWrapper.children);
  if (!paragraphs || paragraphs.length === 0) return;

  return paragraphs
    .map((element) => {
      if (!(element instanceof HTMLElement)) return null;
      return element.innerText;
    })
    .filter((str) => str)
    .join("\n\n");
};

const utaNet = () => {
  enableSelection();
  const area = document.getElementById("kashi_area");
  if (!area) return;
  return area.innerText;
};

const jLyric = () => {
  const wrapper = document.getElementById("Lyric");
  if (!wrapper) return;
  return wrapper.innerText;
};

//
(async () => {
  const url = window.location.href;

  document.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      if (url.startsWith("https://www.google.com/search")) {
        const lyrics = googleSearch();
        console.log(lyrics);
        if (lyrics) {
          await copyToClipboard(lyrics, false);
        }
        return;
      }

      if (url.startsWith("https://www.uta-net.com/song/")) {
        const lyrics = utaNet();
        if (lyrics) {
          await copyToClipboard(lyrics);
        }
        return;
      }

      if (url.startsWith("https://j-lyric.net/")) {
        const lyrics = jLyric();
        if (lyrics) {
          await copyToClipboard(lyrics, false);
        }
        return;
      }
    }
  });
})();

export {};
