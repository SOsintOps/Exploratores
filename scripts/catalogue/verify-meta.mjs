#!/usr/bin/env node
// CI guard: fails (exit 1) when assets/data/search-library.json or
// assets/data/catalogue-meta.json no longer match assets/js/search-library.js
// or the README version. Fix with: node scripts/catalogue/build-meta.mjs
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildExport, readMeta, sha256 } from './build-meta.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const meta = readMeta(root);
const { json, meta: expected } = buildExport(root, meta);
const problems = [];

let onDisk = '';
try { onDisk = readFileSync(join(root, 'assets', 'data', 'search-library.json'), 'utf8'); }
catch { problems.push('assets/data/search-library.json is missing'); }
if (onDisk && sha256(onDisk) !== expected.sha256) problems.push('assets/data/search-library.json is stale');

for (const key of ['version', 'entries', 'disabled', 'sha256', 'data_url'])
  if (meta[key] !== expected[key]) problems.push(`catalogue-meta.json: ${key} is ${JSON.stringify(meta[key])}, expected ${JSON.stringify(expected[key])}`);
if (!meta.updated_at) problems.push('catalogue-meta.json: updated_at missing');

if (problems.length) {
  console.error('Catalogue export out of date:\n - ' + problems.join('\n - ') + '\nRun: node scripts/catalogue/build-meta.mjs');
  process.exit(1);
}
console.log(`catalogue export OK (${expected.entries} entries, ${expected.disabled} disabled, version ${expected.version})`);
