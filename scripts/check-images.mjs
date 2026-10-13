// Fails if any committed image is too large (file size or dimensions).
// Run with `npm run check:images`; CI runs it before building.

import { readdir, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import sharp from 'sharp';
import {
  IMAGE_EXTENSIONS,
  MAX_COMMITTED_BYTES,
  MAX_COMMITTED_EDGE,
  MAX_PUBLIC_BYTES,
} from './image-limits.mjs';

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (IMAGE_EXTENSIONS.includes(extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

const kb = (b) => `${Math.round(b / 1024)} KB`;
const problems = [];
let count = 0;

for (const [dir, maxBytes] of [['src', MAX_COMMITTED_BYTES], ['public', MAX_PUBLIC_BYTES]]) {
  for (const file of await walk(dir)) {
    count++;
    const { size } = await stat(file);
    const { width = 0, height = 0 } = await sharp(file, { limitInputPixels: false }).metadata();
    const edge = Math.max(width, height);
    if (size > maxBytes) problems.push(`${file}: ${kb(size)} (max ${kb(maxBytes)})`);
    if (edge > MAX_COMMITTED_EDGE) problems.push(`${file}: ${width}x${height}px (max ${MAX_COMMITTED_EDGE}px longest edge)`);
  }
}

if (problems.length) {
  console.error('✗ Images too large to commit. Put the original in images-originals/ and run `npm run images`:');
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`✓ ${count} committed image(s) within size limits`);
