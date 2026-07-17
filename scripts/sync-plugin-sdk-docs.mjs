import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.resolve(
  process.env.PCLN_PLUGIN_SDK_WIKI || path.join(repositoryRoot, "..", "PCL-N-Plugin-SDK", "wiki")
);
const englishSourceDirectory = path.resolve(
  process.env.PCLN_PLUGIN_SDK_WIKI_EN || path.join(repositoryRoot, "..", "PCL-N-Plugin-SDK", "wiki-en")
);
const targets = [
  { source: sourceDirectory, target: path.join(repositoryRoot, "docs", "zhHans", "plugin-sdk") },
  { source: englishSourceDirectory, target: path.join(repositoryRoot, "docs", "en", "plugin-sdk") }
];

for (const { source, target } of targets) {
  const sourceEntries = (await readdir(source, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .sort((left, right) => left.name.localeCompare(right.name));

  if (!sourceEntries.some((entry) => entry.name === "Home.md")) {
    throw new Error(`SDK Wiki home page was not found: ${source}`);
  }

  await mkdir(target, { recursive: true });
  for (const entry of await readdir(target, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".md"))
      await rm(path.join(target, entry.name));
  }

  for (const entry of sourceEntries) {
    const targetName = entry.name === "Home.md" ? "index.md" : entry.name;
    await copyFile(path.join(source, entry.name), path.join(target, targetName));
  }

  console.log(`Synced ${sourceEntries.length} SDK Wiki pages to ${target}`);
}
