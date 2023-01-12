// ==UserScript==
// @name         Copy lyrics
// @namespace    mkobayashime
// @version      1.0.0
// @description  Copy lyrics automatically in supported sites
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/copy-lyrics.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/copy-lyrics.user.js
// @match        https://www.google.com/search*
// @match        https://www.uta-net.com/song/*
// @match        https://j-lyric.net/*
// @grant        none
// ==/UserScript==

const copyToClipboard = async (text, useClipboardAPI = true) => {
  if (!text) return;
  console.log(text);
  if (useClipboardAPI) {
    // tend to fail due to CSP
    await window.navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
};

const enableSelection = () => {
  const a = document.body;
  const b = a.parentNode;
  if (b) {
    b.removeChild(a), b.appendChild(a.cloneNode(!0));
  }
};

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
