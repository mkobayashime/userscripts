import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import * as A from "fp-ts/lib/Array.js";
import * as O from "fp-ts/lib/Option.js";
import * as Ord from "fp-ts/lib/Ord.js";
import { pipe } from "fp-ts/lib/function.js";
import * as string from "fp-ts/lib/string.js";
import { globSync } from "glob";
import * as v from "valibot";

type FileProperties = {
  filename: string;
  title: string;
  description?: string;
};

type FileKind = "script" | "style";

const getFiles = (): {
  scripts: string[];
  styles: string[];
} => {
  try {
    return {
      scripts: pipe(
        globSync(path.resolve("src", "userscripts", "*", "index.user.ts")),
        A.sort(string.Ord),
      ),
      styles: pipe(
        globSync(path.resolve("src", "*.user.css")),
        A.sort(string.Ord),
      ),
    };
  } catch (err) {
    console.error(err);
    return { scripts: [], styles: [] };
  }
};

const parseUserStyleComment = async ({
  filepath,
}: {
  filepath: string;
}): Promise<O.Option<FileProperties>> => {
  try {
    const file = await readFile(filepath);
    const lines = file.toString().split("\n");

    if (
      lines.length === 0 ||
      lines.some((line) => line.includes("docgen-ignore"))
    )
      return O.none;

    const commentPrefix = {
      title: "@name",
      description: "@description",
    };

    const titleLine = lines.find((line) =>
      line.startsWith(commentPrefix.title),
    );
    const descriptionLine = lines.find((line) =>
      line.startsWith(commentPrefix.description),
    );

    if (titleLine === undefined) return O.none;
    return O.some({
      filename: path.basename(filepath),
      title: titleLine.slice(commentPrefix.title.length).trim(),
      description: descriptionLine
        ?.slice(commentPrefix.description.length)
        .trim(),
    });
  } catch (err) {
    console.error(err);
    return O.none;
  }
};

const userscriptSourceSchema = v.object({
  default: v.object({
    name: v.string(),
    description: v.string(),
  }),
});

const getUserScriptProperties = async ({
  files,
}: {
  files: string[];
}): Promise<FileProperties[]> =>
  (
    await Promise.all(
      files.map(async (filepath) => {
        const imported = (await import(filepath)) as unknown;
        const parsed = v.safeParse(userscriptSourceSchema, imported);
        return parsed.success
          ? {
              title: parsed.output.default.name,
              description: parsed.output.default.description,
              filename: `${path.basename(path.dirname(filepath))}.user.js`,
            }
          : undefined;
      }),
    )
  ).filter((s) => s !== undefined);

const getUserStyleProperties = async ({
  files,
}: {
  files: string[];
}): Promise<FileProperties[]> =>
  pipe(
    await Promise.all(
      files.map(async (file) => {
        return parseUserStyleComment({ filepath: file });
      }),
    ),
    A.compact,
    A.sort<FileProperties>(
      Ord.fromCompare((a, b) => string.Ord.compare(a.title, b.title)),
    ),
  );

const generateMdFileEntry = ({
  filename,
  title,
  description,
  fileKind,
}: FileProperties & { fileKind: FileKind }): string => {
  return `
### [${title}](https://github.com/mkobayashime/userscripts/raw/main/${
    fileKind === "script" ? "dist" : "src"
  }/${filename})

${description ?? ""}
  `.trim();
};

const updateReadme = async (scriptsMarkdown: string): Promise<void> => {
  const readme = (await readFile(path.resolve(".", "README.md"))).toString();
  if (!readme) return;

  const readmeKeyword = "<!-- docgen -->";
  const readmeCommonPart = readme.slice(
    0,
    readme.indexOf(readmeKeyword) + readmeKeyword.length,
  );

  const updatedReadme = `${readmeCommonPart}\n\n${scriptsMarkdown}`;
  await writeFile(path.resolve("README.md"), updatedReadme);
};

void (async () => {
  const { scripts, styles } = getFiles();

  const scriptFileProperties = await getUserScriptProperties({
    files: scripts,
  });
  const styleFileProperties = await getUserStyleProperties({
    files: styles,
  });

  const scriptsMarkdown = scriptFileProperties
    .map((fileProperties) =>
      generateMdFileEntry({
        ...fileProperties,
        filename: fileProperties.filename.replace(/.user.ts$/, ".user.js"),
        fileKind: "script",
      }),
    )
    .join("\n\n");
  const stylesMarkdown = styleFileProperties
    .map((fileProperties) =>
      generateMdFileEntry({ ...fileProperties, fileKind: "style" }),
    )
    .join("\n\n");

  const joinedMarkdown = [
    "## Scripts (`*.user.js`)",
    scriptsMarkdown,
    "## Styles (`*.user.css`)",
    stylesMarkdown,
  ].join("\n\n");

  await updateReadme(joinedMarkdown);
})();
