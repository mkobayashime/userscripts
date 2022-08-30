import path from "path";
import { readFile, writeFile } from "fs/promises";
import { pipe } from "fp-ts/lib/function.js";
import * as O from "fp-ts/lib/Option.js";
import * as A from "fp-ts/lib/Array.js";
import * as Ord from "fp-ts/lib/Ord.js";
import * as string from "fp-ts/lib/string.js";
import glob from "glob";

type FileProperties = {
  filename: string;
  title: string;
  description?: string;
};

type FileKind = "script" | "style";

const getFiles = async (): Promise<{
  scripts: string[];
  styles: string[];
}> => {
  try {
    return {
      scripts: pipe(
        glob.sync(path.resolve("src", "*.user.js")),
        A.sort(string.Ord)
      ),
      styles: pipe(
        glob.sync(path.resolve("src", "*.user.css")),
        A.sort(string.Ord)
      ),
    };
  } catch (err) {
    console.error(err);
    return { scripts: [], styles: [] };
  }
};

const parseFileComment = async ({
  filepath,
  kind,
}: {
  filepath: string;
  kind: FileKind;
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
      title: kind === "script" ? "// @name" : "@name",
      description: kind === "script" ? "// @description " : "@description",
    };

    const titleLine = lines.find((line) =>
      line.startsWith(commentPrefix.title)
    );
    const descriptionLine = lines.find((line) =>
      line.startsWith(commentPrefix.description)
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

const getFilesProperties = async ({
  files,
  kind,
}: {
  files: string[];
  kind: FileKind;
}) =>
  pipe(
    await Promise.all(
      files.map(async (file) => {
        return await parseFileComment({ filepath: file, kind });
      })
    ),
    A.compact,
    A.sort<FileProperties>(
      Ord.fromCompare((a, b) => string.Ord.compare(a.title, b.title))
    )
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
    readme.indexOf(readmeKeyword) + readmeKeyword.length
  );

  const updatedReadme = readmeCommonPart + "\n\n" + scriptsMarkdown;
  await writeFile(path.resolve("README.md"), updatedReadme);
};

//
(async () => {
  const { scripts, styles } = await getFiles();

  const scriptFileProperties = await getFilesProperties({
    files: scripts,
    kind: "script",
  });
  const styleFileProperties = await getFilesProperties({
    files: styles,
    kind: "style",
  });

  const scriptsMarkdown = scriptFileProperties
    .map((fileProperties) =>
      generateMdFileEntry({ ...fileProperties, fileKind: "script" })
    )
    .join("\n\n");
  const stylesMarkdown = styleFileProperties
    .map((fileProperties) =>
      generateMdFileEntry({ ...fileProperties, fileKind: "style" })
    )
    .join("\n\n");

  const joinedMarkdown = [
    "## Scripts (`*.user.js`)",
    scriptsMarkdown,
    "## Styles (`*.user.css`)",
    stylesMarkdown,
  ].join("\n\n");

  updateReadme(joinedMarkdown);
})();
