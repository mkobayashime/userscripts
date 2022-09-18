/* eslint sort-keys-fix/sort-keys-fix: "warn" */

export type UserScriptMeta = {
  name: string;
  namespace?: string;
  version: string;
  description: string;
  descriptionJp?: string;
  match: string;
  icon?: string;
  runAt?:
    | "document-end"
    | "document-start"
    | "document-body"
    | "document-idle"
    | "context-menu";
  grant?: string;
};

export const meta: { [name: string]: UserScriptMeta | undefined } = {
  "etc-meisai-shortcuts": {
    description:
      "ETC利用照会サービスに h/l などのショートカットキーを追加します",
    match: "https://www2.etc-meisai.jp/etc/*",
    name: "ETC利用照会サービス - Shortcut keys",
    runAt: "document-end",
    version: "1.2.1",
  },
  "freee-shortcuts": {
    description: "freee にショートカットキーを追加します",
    icon: "https://www.google.com/s2/favicons?domain=freee.co.jp",
    match: "https://secure.freee.co.jp/*",
    name: "freee shortcut keys",
    runAt: "document-end",
    version: "1.3.1",
  },
  "google-calendar-unintended-user-alert": {
    description: "Alert when you open Google Calendar in unintended accounts",
    icon: "https://www.google.com/s2/favicons?domain=google.com",
    match: "https://calendar.google.com/calendar/*",
    name: "Google Calendar - Unintended User Alert",
    runAt: "document-end",
    version: "3.0.1",
  },
  "instagram-shortcuts": {
    description:
      "Space key to like, arrow/h/l keys to next/previous photo in the post",
    icon: "https://www.google.com/s2/favicons?domain=instagram.com",
    match: "https://www.instagram.com/*",
    name: "Instagram - Shortcut keys",
    runAt: "document-end",
    version: "2.1.0",
  },
  "lifull-homes-shortcuts": {
    description: "Next/Prev image with arrow/h/l keys",
    icon: "https://www.google.com/s2/favicons?domain=homes.co.jp",
    match: "https://www.homes.co.jp/*",
    name: "HOME'S - Shortcut keys",
    runAt: "document-end",
    version: "1.3.0",
  },
  "moneytree-shortcuts": {
    description: "Moneytree にショートカットキーを追加します",
    icon: "https://www.google.com/s2/favicons?domain=getmoneytree.com",
    match: "https://app.getmoneytree.com/*",
    name: "Moneytree shortcut keys",
    runAt: "document-end",
    version: "1.3.1",
  },
  "note-auto-save-drafts": {
    description: "Auto save draft articles periodically",
    icon: "https://www.google.com/s2/favicons?domain=note.com",
    match: "https://editor.note.com/notes/*",
    name: "note - Auto save drafts",
    runAt: "document-end",
    version: "2.0.0",
  },
  "pinterest-save-from-site-shortcuts": {
    description: 'Ctrl+Enter in "Save from site"',
    icon: "https://www.google.com/s2/favicons?domain=pinterest.jp",
    match: "https://www.pinterest.jp/pin-builder/",
    name: 'Pinterest - Shortcuts in "Save from site"',
    runAt: "document-end",
    version: "1.2.1",
  },
  "scrapbox-clear-watch-list": {
    description: "Scrapbox の Watch List を自動的に全削除します",
    icon: "https://www.google.com/s2/favicons?domain=scrapbox.io",
    match: "https://scrapbox.io/*",
    name: "Scrapbox - Clear Watch List",
    runAt: "document-end",
    version: "1.3.0",
  },
  "scrapbox-force-theme": {
    description: "Scrapbox でプロジェクトに関わらず特定のテーマを使用します",
    icon: "https://www.google.com/s2/favicons?domain=scrapbox.io",
    match: "https://scrapbox.io/*",
    name: "Scrapbox - Force Theme",
    runAt: "document-end",
    version: "1.3.1",
  },
  "scrapbox-no-project-styles": {
    description:
      "Scrapbox のプロジェクト単位で設定されているスタイルを無効化します",
    icon: "https://www.google.com/s2/favicons?domain=scrapbox.io",
    match: "https://scrapbox.io/*",
    name: "Scrapbox - No project styles",
    runAt: "document-end",
    version: "1.5.1",
  },
  "scrapbox-project-notice-in-new-page": {
    description:
      "Scrapbox ページを新たに作成する際、意図したプロジェクトか確認するアラートを表示します",
    icon: "https://www.google.com/s2/favicons?domain=scrapbox.io",
    match: "https://scrapbox.io/*",
    name: "Scrapbox - Project name notice in new page",
    version: "1.2.1",
  },
  "slack-no-autofocus": {
    description:
      "Disable autofocus to the message input field after moved to another channel",
    icon: "https://www.google.com/s2/favicons?sz=64&domain=slack.com",
    match: "https://app.slack.com/client/*",
    name: "Slack - No autofocus in moving channels",
    version: "1.2.1",
  },
  "slack-no-desktop-app": {
    description:
      "Open workspace in the browser after signing in, not in desktop app",
    icon: "https://www.google.com/s2/favicons?sz=64&domain=slack.com",
    match: "https://*.slack.com/ssb/*",
    name: "Slack - No desktop app",
    version: "1.2.0",
  },
  "slack-no-unintended-reload": {
    description: "Alert when you reload/close Slack with a new draft",
    icon: "https://www.google.com/s2/favicons?domain=slack.com",
    match: "https://app.slack.com/*",
    name: "Slack - No unintended reloads",
    runAt: "document-end",
    version: "1.3.0",
  },
  "tweetdeck-auto-save-draft": {
    description: "Auto save composing tweet and restore it with Alt+P shortcut",
    icon: "https://www.google.com/s2/favicons?domain=tweetdeck.twitter.com",
    match: "https://tweetdeck.twitter.com/",
    name: "TweetDeck - Auto save draft",
    runAt: "document-end",
    version: "1.4.0",
  },
  "tweetdeck-no-unintended-reload": {
    description: "Alert when you reload/close TweetDeck with a composing tweet",
    descriptionJp:
      "書きかけのツイートがある状態で TweetDeck をリロードしたり閉じてしまうのを防ぎます",
    icon: "https://www.google.com/s2/favicons?domain=tweetdeck.twitter.com",
    match: "https://tweetdeck.twitter.com/",
    name: "TweetDeck - No unintended reloads",
    runAt: "document-end",
    version: "1.3.0",
  },
  "zozotown-shortcuts": {
    description: "Next/Prev image with arrow/h/l keys",
    icon: "https://www.google.com/s2/favicons?domain=zozo.jp",
    match: "https://zozo.jp/*",
    name: "ZOZOTOWN - Shortcut keys",
    runAt: "document-end",
    version: "1.4.0",
  },
};
