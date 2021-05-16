// ==UserScript==
// @name         No project styles in Scrapbox
// @namespace    mkobayashime
// @version      1.1.0
// @description  Scrapbox のプロジェクト単位で設定されているスタイルを無効化します
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/src/scrapbox-no-project-styles.user.js
// @include      https://scrapbox.io/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"

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

  const settingPagesPattern = new RegExp(
    "https://scrapbox.io/(projects/[^/]+/)?settings/"
  )

  const url = window.location.href

  if (!settingPagesPattern.test(url)) {
    const projectId = window.location.href.match(
      RegExp("^https://scrapbox.io/(?<projectId>.*)/.*$")
    ).groups.projectId

    if (isProjectEnabled(projectId)) {
      const interval = window.setInterval(() => {
        const projectStyle = document.querySelector(
          `link[href='/api/code/${projectId}/settings/style.css']`
        )
        if (projectStyle) {
          // 読み込み前に projectStyle 消すとなぜか何も表示されなくなる
          const pageListItems = document.querySelectorAll(
            ".page-list .page-list-item"
          )
          if (pageListItems.length) {
            projectStyle.remove()
            window.clearInterval(interval)
          }
        }
      }, 200)

      window.setTimeout(() => {
        window.clearInterval(interval)
      }, 3000)
    }
  }
})()
