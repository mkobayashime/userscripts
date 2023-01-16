// ==UserScript==
// @name         Copy lyrics
// @namespace    mkobayashime
// @version      1.3.0
// @description  Copy lyrics automatically in supported sites
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/copy-lyrics.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/copy-lyrics.user.js
// @match        https://www.google.com/search*
// @match        https://www.uta-net.com/song/*
// @match        https://j-lyric.net/*
// @match        https://www.musixmatch.com/*
// @match        https://linkco.re/*/songs/*/lyrics*
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
    }
  });
})();
