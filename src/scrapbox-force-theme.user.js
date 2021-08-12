// ==UserScript==
// @name         Scrapbox Force Theme
// @namespace    mkobayashime
// @version      1.0.1
// @description  Scrapbox でプロジェクトに関わらず特定のテーマを使用します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/scrapbox-force-theme.user.js
// @include      https://scrapbox.io/*
// @icon         https://www.google.com/s2/favicons?domain=scrapbox.io
// @run-at       document-end
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

  /**
   * 適用するテーマ. html の data-project-theme に設定されるもの.
   * @type string
   */
  const themeId = "default-dark"

  /**
   * 有効化するプロジェクトの id またはマッチする RegExp. 空配列の場合全プロジェクトで有効.
   * @type Array<string | RegExp>
   */
  const enabledProjectIds = []

  const isProjectEnabled = (projectId) => {
    if (enabledProjectIds.length === 0) return true
    return enabledProjectIds.some((pattern) => {
      if (typeof pattern === "string") {
        return pattern === projectId
      }
      return pattern.test(projectId)
    })
  }

  const pageObserver = new MutationObserver(() => {
    if (document.documentElement.dataset.projectTheme !== themeId) {
      document.documentElement.dataset.projectTheme = themeId
    }
  })

  const settingPagesPattern = new RegExp(
    "https://scrapbox.io/(projects/[^/]+/)?settings/"
  )

  const url = window.location.href

  if (!settingPagesPattern.test(url)) {
    const projectId = window.location.href.match(
      RegExp("^https://scrapbox.io/(?<projectId>.*)/.*$")
    ).groups.projectId

    if (isProjectEnabled(projectId)) {
      pageObserver.observe(document.documentElement, { attributes: true })
    }
  }
})()
