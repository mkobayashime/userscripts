import { copyToClipboard } from "./utils/copyToClipboard";
import { enableSelection } from "./utils/enableSelection";

const googleSearch = () => {
  return Array.from(
    document.querySelectorAll("div[data-lyricid] > div > div > div > span")
  )
    .map((element) =>
      element instanceof HTMLSpanElement ? element.innerText : null
    )
    .filter((str) => str !== null)
    .join("\n");
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

const musixmatch = () =>
  Array.from(document.getElementsByClassName("mxm-lyrics__content "))
    .map((element) =>
      element instanceof HTMLElement ? element.innerText : null
    )
    .filter((str) => str)
    .join("\n");

const linkcore = () => {
  const wrapper = document.querySelector(".lyric_text");
  if (!wrapper) return;

  return Array.from(wrapper.children)
    .map((element) =>
      element instanceof HTMLElement ? element.innerText : null
    )
    .filter((str) => str !== null)
    .join("\n");
};

const lineMusic = () => {
  const wrapper = document.querySelector(".ly_text");
  if (!wrapper || !(wrapper instanceof HTMLElement)) {
    window.alert("Lyrics not found. Please open the lyrics modal.");
    return;
  }

  const text = wrapper.innerText;
  return text.replace(/歌詞\s*/, "");
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

      if (url.startsWith("https://www.musixmatch.com/")) {
        const lyrics = musixmatch();
        if (lyrics) await copyToClipboard(lyrics, false);
        return;
      }

      if (url.startsWith("https://linkco.re/")) {
        const lyrics = linkcore();
        if (lyrics) await copyToClipboard(lyrics);
        return;
      }

      if (url.startsWith("https://music.line.me/webapp/")) {
        const lyrics = lineMusic();
        if (lyrics) {
          await copyToClipboard(lyrics, false);
        }
      }
    }
  });
})();

export {};
