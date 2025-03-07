(() => {
  /**
   * 適用するテーマ. html の data-project-theme に設定されるもの.
   * @type string
   */
  const themeId = "default-dark";

  /**
   * 有効化するプロジェクトの id またはマッチする RegExp. 空配列の場合全プロジェクトで有効.
   * @type Array<string | RegExp>
   */
  const enabledProjectIds: (string | RegExp)[] = [];

  const isProjectEnabled = (projectId: string) => {
    if (enabledProjectIds.length === 0) return true;
    return enabledProjectIds.some((pattern) => {
      if (typeof pattern === "string") {
        return pattern === projectId;
      }
      return pattern.test(projectId);
    });
  };

  const pageObserver = new MutationObserver(() => {
    if (document.documentElement.dataset.projectTheme !== themeId) {
      document.documentElement.dataset.projectTheme = themeId;
    }
  });

  const settingPagesPattern =
    /https:\/\/scrapbox.io\/(projects\/[^\/]+\/)?settings\//;

  const url = window.location.href;

  if (!settingPagesPattern.test(url)) {
    const projectId = /^https:\/\/scrapbox.io\/(?<projectId>.*)\/.*$/.exec(
      window.location.href,
    )?.groups?.projectId;

    if (!projectId) return;

    if (isProjectEnabled(projectId)) {
      pageObserver.observe(document.documentElement, { attributes: true });
    }
  }
})();
