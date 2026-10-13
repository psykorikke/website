// Verifies that every internal link and asset referenced by the site resolves.
//
//   node scripts/check-site.mjs            -> checks the local build in ./dist
//   node scripts/check-site.mjs <base-url> -> checks the deployed site over HTTP
//
// Exits with code 1 if anything is missing, so CI fails loudly.

import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const target = process.argv[2];
const remote = Boolean(target && /^https?:\/\//.test(target));
const distDir = 'dist';
const baseUrl = remote ? target.replace(/\/$/, '') : '';

const REF_PATTERN = /(?:href|src)="([^"]+)"|url\(["']?([^"')]+)["']?\)/g;
const SRCSET_PATTERN = /srcset="([^"]+)"/g;

function internalRefs(text) {
  const raw = [];
  for (const m of text.matchAll(REF_PATTERN)) raw.push(m[1] ?? m[2]);
  // srcset lists several candidates: "a.webp 360w, b.webp 560w"
  for (const m of text.matchAll(SRCSET_PATTERN)) {
    for (const part of m[1].split(',')) raw.push(part.trim().split(/\s+/)[0]);
  }
  const refs = new Set();
  for (const r of raw) {
    const ref = r.split('#')[0].split('?')[0];
    if (ref.startsWith('/') && !ref.startsWith('//')) refs.add(ref);
  }
  return refs;
}

async function exists(path) {
  if (remote) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(baseUrl + path, { redirect: 'follow' });
        if (res.ok) return { ok: true, body: res, status: res.status };
        if (attempt === 3) return { ok: false, status: res.status };
      } catch (err) {
        if (attempt === 3) return { ok: false, status: String(err) };
      }
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
  const candidates = [path, join(path, 'index.html'), `${path}.html`];
  for (const c of candidates) {
    try {
      if ((await stat(join(distDir, c))).isFile()) return { ok: true, file: join(distDir, c) };
    } catch {}
  }
  return { ok: false, status: 'missing in dist/' };
}

async function listPages() {
  if (remote) return ['/'];
  const pages = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith('.html')) pages.push('/' + full.slice(distDir.length + 1));
    }
  }
  await walk(distDir);
  return pages;
}

async function readText(path, result) {
  if (remote) return result.body.text();
  return readFile(result.file, 'utf8');
}

const queue = await listPages();
const seen = new Set();
const failures = [];

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);

  const result = await exists(path);
  if (!result.ok) {
    failures.push(`${path} -> ${result.status}`);
    continue;
  }
  // Follow references inside HTML and CSS; other assets only need to exist.
  const isDoc = path === '/' || path.endsWith('/') || path.endsWith('.html') || !/\.[a-z0-9]+$/i.test(path);
  if (isDoc || path.endsWith('.css')) {
    const text = await readText(path, result);
    for (const ref of internalRefs(text)) if (!seen.has(ref)) queue.push(ref);
  }
}

const where = remote ? baseUrl : `${distDir}/`;
if (![...seen].some((p) => p.endsWith('.css'))) failures.push('no stylesheet referenced from the pages');
if (failures.length) {
  console.error(`✗ ${failures.length} broken reference(s) on ${where}:`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`✓ ${seen.size} internal pages and assets OK on ${where}`);
