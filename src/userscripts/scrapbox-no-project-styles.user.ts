(() => {
  /**
   * このスクリプトを有効化するプロジェクトの id またはマッチする RegExp. 空配列の場合全プロジェクトで有効.
   * @type Array<string | RegExp>
   */
  const enabledProjectIds: (string | RegExp)[] = [];

  /**
   * このスクリプトを無効化するプロジェクトの id またはマッチする RegExp. `enabledProjectIds` を上書きします.
   * @type Array<string | RegExp>
   */
  const disabledProjectIds: (string | RegExp)[] = [];

  const isProjectEnabled = (projectId: string) => {
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
      /https:\/\/scrapbox.io\/(projects\/[^\/]+\/)?settings\//;

    const url = window.location.href;

    if (!settingPagesPattern.test(url)) {
      const projectId = /^https:\/\/scrapbox.io\/(?<projectId>.*)\/.*$/.exec(
        window.location.href,
      )?.groups?.projectId;

      if (!projectId) return;

      if (isProjectEnabled(projectId)) {
        const projectStyle = document.querySelector<HTMLLinkElement>(
          `link[href='/api/code/${projectId}/settings/style.css']`,
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
