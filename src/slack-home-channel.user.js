// ==UserScript==
// @name            Slack - Quick home channel
// @namespace       mkobayashime
// @version         1.0.0
// @description     Go back to your home channel with Ctrl+B shortcut. Ctrl+Shift+B to set current channel as home channel.
// @author          mkobayashime
// @homepage        https://github.com/mkobayashime/userscripts
// @updateURL       https://github.com/mkobayashime/userscripts/raw/main/src/slack-home-channel.user.js
// @include         https://app.slack.com/*
// @icon            https://www.google.com/s2/favicons?domain=slack.com
// @run-at          document-end
// @grant           none
// ==/UserScript==

;(function () {
  "use strict"

  const getWorkspaceId = () => {
    const pathname = window.location.pathname
    if (!pathname.startsWith("/client/")) return

    const pathnameWithoutPrefix = pathname.replace("/client/", "")

    return pathnameWithoutPrefix.includes("/")
      ? pathnameWithoutPrefix.slice(0, pathnameWithoutPrefix.indexOf("/"))
      : pathnameWithoutPrefix
  }

  const getStorageKey = () => {
    const workspaceId = getWorkspaceId()
    if (!workspaceId) return

    return `__quick_home_channel-${workspaceId}`
  }

  const setHomeChannel = () => {
    const currentChannelElement = document.querySelector(
      ".p-channel_sidebar__channel--selected"
    )
    if (!currentChannelElement) return

    const currentChannel = currentChannelElement.innerText
    if (!currentChannel) return

    const storageKey = getStorageKey()
    if (!storageKey) return

    window.localStorage.setItem(storageKey, currentChannel)
  }

  const moveToHomeChannel = () => {
    const storageKey = getStorageKey()
    if (!storageKey) return

    const homeChannel = window.localStorage.getItem(storageKey)
    if (!homeChannel) return

    const channels = Array.from(
      document.getElementsByClassName("p-channel_sidebar__name")
    )

    const homeChannelElement = channels.find(
      (el) => el.innerText === homeChannel
    )
    if (homeChannelElement) {
      homeChannelElement.click()
    }
  }

  window.onkeydown = (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === "KeyB") {
      setHomeChannel()
    }
    if (e.ctrlKey && e.code === "KeyB") {
      moveToHomeChannel()
    }
  }
})()
