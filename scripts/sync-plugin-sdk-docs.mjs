import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.resolve(
  process.env.PCLN_PLUGIN_SDK_WIKI || path.join(repositoryRoot, "..", "PCL-N-Plugin-SDK", "wiki")
);
const targetDirectory = path.join(repositoryRoot, "docs", "zhHans", "plugin-sdk");

const sourceEntries = (await readdir(sourceDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .sort((left, right) => left.name.localeCompare(right.name));

if (!sourceEntries.some((entry) => entry.name === "Home.md")) {
  throw new Error(`SDK Wiki home page was not found: ${sourceDirectory}`);
}

await mkdir(targetDirectory, { recursive: true });
for (const entry of await readdir(targetDirectory, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".md"))
    await rm(path.join(targetDirectory, entry.name));
}

for (const entry of sourceEntries) {
  const targetName = entry.name === "Home.md" ? "index.md" : entry.name;
  await copyFile(path.join(sourceDirectory, entry.name), path.join(targetDirectory, targetName));
}

console.log(`Synced ${sourceEntries.length} SDK Wiki pages to ${targetDirectory}`);

