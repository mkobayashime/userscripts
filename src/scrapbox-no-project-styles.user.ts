(function () {
  "use strict";

  /**
   * 有効化するプロジェクトの id またはマッチする RegExp. 空配列の場合全プロジェクトで有効.
   * @type Array<string | RegExp>
   */
  const enabledProjectIds = [];

  const isProjectEnabled = (projectId) => {
    if (enabledProjectIds.length === 0) return true;
    return enabledProjectIds.some((pattern) => {
      if (typeof pattern === "string") {
        return pattern === projectId;
      }
      return pattern.test(projectId);
    });
  };

  const pageObserver = new MutationObserver(() => {
    const settingPagesPattern = new RegExp(
      "https://scrapbox.io/(projects/[^/]+/)?settings/"
    );

    const url = window.location.href;

    if (!settingPagesPattern.test(url)) {
      const projectId = window.location.href.match(
        RegExp("^https://scrapbox.io/(?<projectId>.*)/.*$")
      ).groups.projectId;

      if (isProjectEnabled(projectId)) {
        const projectStyle = document.querySelector(
          `link[href='/api/code/${projectId}/settings/style.css']`
        );
        if (projectStyle) {
          // 空文字列だとそのままスタイルが当たってしまうことがあるので仕方なく
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
})();
