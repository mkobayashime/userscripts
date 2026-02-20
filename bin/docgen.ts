import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Glob } from "bun";
import * as v from "valibot";

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
      scripts: await Array.fromAsync(
        new Glob(
          path.resolve(
            import.meta.dirname,
            "..",
            "src",
            "userscripts",
            "*",
            "index.user.ts",
          ),
        ).scan(),
      ),
      styles: await Array.fromAsync(
        new Glob(
          path.resolve(import.meta.dirname, "..", "src", "*.user.css"),
        ).scan(),
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
}): Promise<FileProperties | null> => {
  try {
    const file = await readFile(filepath);
    const lines = file.toString().split("\n");

    if (
      lines.length === 0 ||
      lines.some((line) => line.includes("docgen-ignore"))
    )
      return null;

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

    if (titleLine === undefined) return null;
    return {
      filename: path.basename(filepath),
      title: titleLine.slice(commentPrefix.title.length).trim(),
      description: descriptionLine
        ?.slice(commentPrefix.description.length)
        .trim(),
    };
  } catch (err) {
    console.error(err);
    return null;
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
  )
    .filter((s) => s !== undefined)
    .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));

const getUserStyleProperties = async ({
  files,
}: {
  files: string[];
}): Promise<FileProperties[]> =>
  (
    await Promise.all(
      files.map(async (file) => {
        return parseUserStyleComment({ filepath: file });
      }),
    )
  )
    .filter((s) => s !== null)
    .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));

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
  const { scripts, styles } = await getFiles();

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
