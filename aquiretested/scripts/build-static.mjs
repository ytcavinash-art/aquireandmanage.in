import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectRoot, 'dist');
const repositoryOutputDir = path.join(projectRoot, '..', 'dist');
const staticDirectories = ['assets', 'css', 'data', 'images', 'js'];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const publicDir = path.join(projectRoot, 'public');
for (const entry of await readdir(publicDir, { withFileTypes: true })) {
  await cp(
    path.join(publicDir, entry.name),
    path.join(outputDir, entry.name),
    { recursive: entry.isDirectory(), force: true },
  );
}

for (const directory of staticDirectories) {
  await cp(
    path.join(projectRoot, directory),
    path.join(outputDir, directory),
    { recursive: true, force: true },
  );
}

const rootEntries = await readdir(projectRoot, { withFileTypes: true });
const htmlFiles = rootEntries.filter(
  (entry) => entry.isFile() && entry.name.endsWith('.html'),
);

for (const file of htmlFiles) {
  await cp(
    path.join(projectRoot, file.name),
    path.join(outputDir, file.name),
    { force: true },
  );
}

await rm(repositoryOutputDir, { recursive: true, force: true });
await cp(outputDir, repositoryOutputDir, { recursive: true, force: true });

console.log(
  `Static build complete: ${htmlFiles.length} HTML pages and required assets copied to ${outputDir} and ${repositoryOutputDir}.`,
);
