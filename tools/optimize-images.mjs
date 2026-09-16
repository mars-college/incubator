/*
 * Derivative image builder for the Incubator Camp site.
 *
 * The originals in photos/ are what the camp lead delivers, at camera
 * resolution — a single one runs 2 to 10 MB. Nothing on the site loads an
 * original. This script writes three web-sized sets beside them, and the pages
 * reference those:
 *
 *   photos/web/<path>.jpg    max 2000px, q80  — gallery frames, share card backgrounds
 *   photos/thumb/<path>.jpg  max  900px, q78  — index strips, portraits, KzA grid
 *   photos/tray/<path>.jpg   max  200px, q70  — gallery filmstrip thumbnails
 *
 * Relative paths and base names are preserved exactly (only the extension
 * changes), so a new drop of originals needs no path bookkeeping — copy the
 * files in and run this again. Existing derivatives are skipped unless the
 * original is newer, so re-running is cheap.
 *
 * Run from the repo root:
 *   node tools/optimize-images.mjs
 *
 * Needs sharp. There is no package.json here on purpose (the site has no build
 * step), so the script borrows the copy in the mars-v2 site next door, and
 * falls back to a globally installed one:
 *   node tools/optimize-images.mjs                       # auto-detect
 *   SHARP=/path/to/sharp/dist/index.mjs node tools/...   # explicit
 */
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { dirname, join, extname } from 'path';

const CANDIDATES = [
  process.env.SHARP,
  '../../mars-v2/node_modules/sharp/dist/index.mjs',   // the sibling site, from tools/
  '../../../web/mars-v2/node_modules/sharp/dist/index.mjs',
  'sharp',
].filter(Boolean);

let sharp;
for (const c of CANDIDATES) {
  try { sharp = (await import(c.startsWith('.') ? new URL(c, import.meta.url).href : c)).default; break; }
  catch { /* try the next one */ }
}
if (!sharp) {
  console.error('sharp not found. Set SHARP=/path/to/sharp/dist/index.mjs, or `npm i -g sharp`.');
  process.exit(1);
}

const SETS = [
  { dir: 'web',   max: 2000, quality: 80 },
  { dir: 'thumb', max:  900, quality: 78 },
  { dir: 'tray',  max:  200, quality: 70 },
];
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png']);
const GENERATED = new Set(SETS.map((s) => s.dir));

function originals(dir = 'photos', found = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (dir === 'photos' && GENERATED.has(name)) continue;   // never re-encode our own output
      originals(p, found);
    } else if (SOURCE_EXT.has(extname(name).toLowerCase())) {
      found.push(p);
    }
  }
  return found;
}

let built = 0, skipped = 0, bytesIn = 0, bytesOut = 0;

for (const src of originals()) {
  const rel = src.slice('photos/'.length);
  const srcTime = statSync(src).mtimeMs;
  bytesIn += statSync(src).size;

  for (const set of SETS) {
    const out = join('photos', set.dir, rel.replace(/\.[^.]+$/, '.jpg'));
    if (existsSync(out) && statSync(out).mtimeMs >= srcTime) { skipped++; bytesOut += statSync(out).size; continue; }
    mkdirSync(dirname(out), { recursive: true });
    await sharp(src)
      .rotate()                                                  // honor EXIF orientation, then drop it
      .resize({ width: set.max, height: set.max, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: set.quality, mozjpeg: true, progressive: true })
      .toFile(out);
    bytesOut += statSync(out).size;
    built++;
  }
}

const mb = (n) => (n / 1048576).toFixed(1) + 'MB';
console.log(`built ${built}, up to date ${skipped}`);
console.log(`originals ${mb(bytesIn)} -> derivatives ${mb(bytesOut)}`);
