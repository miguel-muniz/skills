import { constants } from 'node:fs';
import { copyFile, mkdir, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

// A caller's development environment must not select development JSX helpers.
process.env.NODE_ENV = 'production';
const { build } = await import('vite');

// Run from the prototype root through its npm export script.
const root = process.cwd();
const scratch = await mkdtemp(path.join(tmpdir(), 'prototype-html-'));

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(filename) : [filename];
  }));
  return nested.flat();
}

try {
  await build({
    root,
    mode: 'production',
    configFile: path.join(root, 'vite.export.config.ts'),
    build: { outDir: scratch, emptyOutDir: false },
  });
  const files = await filesIn(scratch);
  if (files.length !== 1 || !files[0].endsWith('.html')) {
    throw new Error('Export must contain exactly one HTML file. Inline remaining assets and retry.');
  }
  const outputDirectory = path.join(root, 'exports');
  await mkdir(outputDirectory, { recursive: true });
  const name = path.basename(root).replace(/[^a-zA-Z0-9_-]+/g, '-') || 'prototype';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const destination = path.join(outputDirectory, `${name}-${timestamp}-${randomUUID().slice(0, 8)}.html`);
  await copyFile(files[0], destination, constants.COPYFILE_EXCL);
  console.log(`Portable prototype: ${destination}`);
} finally {
  // Only remove the isolated directory created by this invocation.
  await rm(scratch, { recursive: true, force: true });
}
