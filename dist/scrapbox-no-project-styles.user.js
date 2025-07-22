// ==UserScript==
// @name         Scrapbox - No project styles
// @namespace    mkobayashime
// @version      1.6.4
// @description  Scrapbox のプロジェクト単位で設定されているスタイルを無効化します
// @icon         https://www.google.com/s2/favicons?domain=scrapbox.io
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @homepageURL  https://github.com/mkobayashime/userscripts
// @match        https://scrapbox.io/*
// @run-at       document-end
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-no-project-styles.user.js
// @downloadURL  https://github.com/mkobayashime/userscripts/raw/main/dist/scrapbox-no-project-styles.user.js
// ==/UserScript==

var userscriptConfig = {
  /**
   * このスクリプトを有効化するプロジェクトの id またはマッチする RegExp. 空配列の場合全プロジェクトで有効.
   * @type Array<string | RegExp>
   */
  enabledProjectIds: [],
  /**
   * このスクリプトを無効化するプロジェクトの id またはマッチする RegExp. `enabledProjectIds` を上書きします.
   * @type Array<string | RegExp>
   */
  disabledProjectIds: [],
};

// src/userscripts/scrapbox-no-project-styles/index.user.ts
void (({ enabledProjectIds, disabledProjectIds }) => {
  const isProjectEnabled = (projectId) => {
    if (
      disabledProjectIds.some((pattern) => {
        if (typeof pattern === "string") {
          return pattern === projectId;
        }
        return pattern.test(projectId);
      })
    ) {
      return false;
    }
    if (enabledProjectIds.length === 0) return true;
    return enabledProjectIds.some((pattern) => {
      if (typeof pattern === "string") {
        return pattern === projectId;
      }
      return pattern.test(projectId);
    });
  };
  const pageObserver = new MutationObserver(() => {
    const settingPagesPattern =
      /https:\/\/scrapbox.io\/(projects\/[^/]+\/)?settings\//;
    const url = window.location.href;
    if (!settingPagesPattern.test(url)) {
      const projectId = /^https:\/\/scrapbox.io\/(?<projectId>.*)\/.*$/.exec(
        window.location.href,
      )?.groups?.projectId;
      if (!projectId) return;
      if (isProjectEnabled(projectId)) {
        const projectStyle = document.querySelector(
          `link[href='/api/code/${projectId}/settings/style.css']`,
        );
        if (projectStyle) {
          projectStyle.href = "dummy";
        }
      }
    }
  });
  const documentObserver = new MutationObserver(() => {
    const app = document.querySelector(".app");
    if (app) {
      documentObserver.disconnect();
      pageObserver.observe(app, {
        childList: true,
      });
    }
  });
  documentObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})(userscriptConfig);
