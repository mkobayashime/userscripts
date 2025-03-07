import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "Scrapbox - Clear Watch List",
  version: "1.3.1",
  description: "Scrapbox の Watch List を自動的に全削除します",
  match: ["https://scrapbox.io/*"],
  runAt: "document-end",
  icon: "https://www.google.com/s2/favicons?domain=scrapbox.io",
  main: () => {
    localStorage.setItem("projectsLastAccessed", "{}");
    localStorage.setItem("lastProject", "{}");
  },
});
