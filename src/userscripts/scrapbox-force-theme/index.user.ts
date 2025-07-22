import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "Scrapbox - Force Theme",
  version: "1.3.4",
  description: "Scrapbox でプロジェクトに関わらず特定のテーマを使用します",
  match: ["https://scrapbox.io/*"],
  icon: "https://www.google.com/s2/favicons?domain=scrapbox.io",
  runAt: "document-end",
  config: {
    /**
     * 適用するテーマ. html の data-project-theme に設定されるもの.
     * @type string
     */
    themeId: "default-dark",

    /**
     * 有効化するプロジェクトの id またはマッチする RegExp. 空配列の場合全プロジェクトで有効.
     * @type Array<string | RegExp>
     */
    enabledProjectIds: [] as (string | RegExp)[],
  },
  main: ({ themeId, enabledProjectIds }) => {
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
      /https:\/\/scrapbox.io\/(projects\/[^/]+\/)?settings\//;

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
  },
});
