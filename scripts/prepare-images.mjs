// Downscales original images so they can be committed.
//
//   npm run images                 -> process everything in images-originals/
//   npm run images -- --max 1600   -> use a smaller longest edge (e.g. for small content images)
//
// Reads from images-originals/ (git-ignored) and writes to src/assets/images/,
// keeping sub-folders. Images are rotated according to EXIF, metadata (incl. GPS)
// is stripped, and the longest edge is capped (never upscaled). Astro then creates
// the final responsive sizes from these files at build time.

import { mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import sharp from 'sharp';
import { IMAGE_EXTENSIONS, MAX_EDGE, ORIGINALS_DIR, OUTPUT_DIR } from './image-limits.mjs';

const maxArg = process.argv.indexOf('--max');
const maxEdge = maxArg > -1 ? Number(process.argv[maxArg + 1]) : MAX_EDGE;
const force = process.argv.includes('--force');
if (!Number.isFinite(maxEdge) || maxEdge < 100) {
  console.error('--max must be a number of pixels (e.g. --max 1600)');
  process.exit(1);
}

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

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const files = await walk(ORIGINALS_DIR);
if (files.length === 0) {
  console.log(`No images found in ${ORIGINALS_DIR}/. Put originals there and run again.`);
  process.exit(0);
}

let processed = 0;
for (const input of files) {
  const rel = relative(ORIGINALS_DIR, input);
  const image = sharp(input, { limitInputPixels: false, failOn: 'none' }).rotate();
  const meta = await image.metadata();
  const keepAlpha = Boolean(meta.hasAlpha);
  // Photos -> JPEG (small, universally supported as a source). Transparency -> PNG.
  const outExt = keepAlpha ? '.png' : '.jpg';
  const output = join(OUTPUT_DIR, rel.slice(0, -extname(rel).length) + outExt);

  if (!force) {
    try {
      if ((await stat(output)).mtimeMs >= (await stat(input)).mtimeMs) continue;
    } catch {}
  }

  await mkdir(dirname(output), { recursive: true });
  const pipeline = image.resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true });
  const info = keepAlpha
    ? await pipeline.png({ compressionLevel: 9, palette: false }).toFile(output)
    : await pipeline.jpeg({ quality: 85, mozjpeg: true }).toFile(output);

  const before = (await stat(input)).size;
  console.log(`${rel}: ${meta.width}x${meta.height}, ${mb(before)} -> ${relative('.', output)}: ${info.width}x${info.height}, ${mb(info.size)}`);
  processed++;
}

console.log(processed ? `\n✓ ${processed} image(s) written to ${OUTPUT_DIR}/` : '✓ All images are up to date.');
