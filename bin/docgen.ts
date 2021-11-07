import path from "path"
import { readFile, writeFile } from "fs/promises"
import { pipe } from "fp-ts/lib/function.js"
import * as O from "fp-ts/lib/Option.js"
import * as A from "fp-ts/lib/Array.js"
import * as Ord from "fp-ts/lib/Ord.js"
import * as string from "fp-ts/lib/string.js"
import glob from "glob"

type FileProperties = {
  filename: string
  title: string
  description?: string
}

type FileKind = "script" | "style"

const getFiles = async (): Promise<
  Array<{
    filepath: string
    kind: FileKind
  }>
> => {
  try {
    return pipe(
      await glob.sync(path.resolve("src", "*.user.@(js|css)")),
      A.sort(string.Ord),
      A.map((filepath) => ({
        filepath,
        kind: filepath.endsWith(".user.js") ? "script" : "style",
      }))
    )
  } catch (err) {
    console.error(err)
    return []
  }
}

const parseFileComment = async ({
  filepath,
  kind,
}: {
  filepath: string
  kind: FileKind
}): Promise<O.Option<FileProperties>> => {
  try {
    const file = await readFile(filepath)
    const lines = file.toString().split("\n")

    const commentPrefix = {
      title: kind === "script" ? "// @name" : "@name",
      description: kind === "script" ? "// @description " : "@description",
    }

    const titleLine = lines.find((line) => line.startsWith(commentPrefix.title))
    const descriptionLine = lines.find((line) =>
      line.startsWith(commentPrefix.description)
    )

    if (titleLine === undefined) return O.none
    return O.some({
      filename: path.basename(filepath),
      title: titleLine.slice(commentPrefix.title.length).trim(),
      description: descriptionLine
        ?.slice(commentPrefix.description.length)
        .trim(),
    })
  } catch (err) {
    console.error(err)
    return O.none
  }
}

const generateMdFileEntry = ({
  filename,
  title,
  description,
}: FileProperties): string => {
  return `
### [${title}](https://github.com/mkobayashime/userscripts/raw/main/src/${filename})

${description ?? ""}
  `.trim()
}

const updateReadme = async (scriptsMarkdown: string): Promise<void> => {
  const readme = await (
    await readFile(path.resolve(".", "README.md"))
  ).toString()
  if (!readme) return

  const readmeKeyword = "<!-- docgen -->"
  const readmeCommonPart = readme.slice(
    0,
    readme.indexOf(readmeKeyword) + readmeKeyword.length
  )

  const updatedReadme = readmeCommonPart + "\n\n" + scriptsMarkdown
  await writeFile(path.resolve("README.md"), updatedReadme)
}

//
;(async () => {
  const files = await getFiles()
  const filesProperties = pipe(
    await Promise.all(
      files.map(async (file) => {
        return await parseFileComment(file)
      })
    ),
    A.compact,
    A.sort<FileProperties>(
      Ord.fromCompare((a, b) => string.Ord.compare(a.title, b.title))
    )
  )
  const scriptsMarkdown = filesProperties
    .map((fileProperties) => generateMdFileEntry(fileProperties))
    .join("\n\n")
  // console.log(scriptsMarkdown)
  updateReadme(scriptsMarkdown)
})()
