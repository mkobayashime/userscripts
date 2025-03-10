import path from "node:path";

import typescript from "@rollup/plugin-typescript";
import chalk from "chalk";
import chokidar from "chokidar";
import * as rollup from "rollup";

import { copyToClipboardPlugin } from "../copyToClipboardRollupPlugin.js";
import { userscriptMetaPlugin } from "../src/userscripts/meta/rollupPlugin.js";

(() => {
  const watchedFiles: Set<string> = new Set([]);

  const chokidarWatcher = chokidar
    .watch("src/userscripts/*.user.ts")
    .on("change", (filepath) => {
      console.log("");

      if (!watchedFiles.has(filepath)) {
        watchedFiles.add(filepath);

        const watcher = rollup.watch({
          input: filepath,
          output: {
            dir: path.resolve(".dev"),
          },
          plugins: [
            typescript(),
            userscriptMetaPlugin(),
            copyToClipboardPlugin(),
          ],
        });

        watcher.on("event", (event) => {
          if (event.code === "BUNDLE_START") {
            console.log(`Bundling ${path.basename(filepath)}`);
          }
          if (event.code === "BUNDLE_END") {
            console.log(
              chalk.green(`Finished bundling ${path.basename(filepath)}`),
            );
          }
          if (event.code === "ERROR") {
            console.error(
              chalk.red(`Error in bundling ${path.basename(filepath)}`),
            );
            console.error(event.error);
          }

          if ("result" in event && event.result) {
            void event.result.close();
          }
        });
      }
    });

  chokidarWatcher.on("ready", () =>
    console.log(chalk.green("\nDev mode started: watching for file changes")),
  );
})();
