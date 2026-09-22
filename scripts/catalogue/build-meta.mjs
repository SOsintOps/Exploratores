#!/usr/bin/env node
// Exploratores catalogue export — builds the two files that the optional
// in-browser catalogue update reads from raw.githubusercontent.com:
//   assets/data/search-library.json   pure-data export of SearchLibrary
//   assets/data/catalogue-meta.json   { version, updated_at, entries, disabled, sha256, data_url }
// assets/js/search-library.js stays the single source of truth; this script
// only derives from it. Run it after every catalogue change (the CI test
// `verify-meta.mjs` fails when the export is stale). Idempotent: when the
// export is unchanged, updated_at is kept as it was.
// The SHA-256 is computed over the JSON text with LF line endings, so the
// value is the same on every platform and matches what GitHub serves.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

export const DATA_URL = 'https://raw.githubusercontent.com/SOsintOps/Exploratores/v3/assets/data/search-library.json';

export function loadCatalogue(root) {
  const source = readFileSync(join(root, 'assets', 'js', 'search-library.js'), 'utf8');
  const sandbox = { console };
  vm.createContext(sandbox);
  return vm.runInContext(source + '\n;SearchLibrary', sandbox);
}

export function readmeVersion(root) {
  const m = readFileSync(join(root, 'README.md'), 'utf8').match(/^# Exploratores OSINT Toolkit (\d+\.\d+\.\d+)/m);
  if (!m) throw new Error('Version not found in README.md title');
  return m[1];
}

export const sha256 = text => createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex');

// Returns { json, meta } as they should be on disk for the current catalogue.
export function buildExport(root, previousMeta = {}) {
  const catalogue = loadCatalogue(root);
  const json = JSON.stringify(catalogue, null, 1) + '\n';
  const hash = sha256(json);
  const entries = Object.keys(catalogue).length;
  const disabled = Object.values(catalogue).filter(e => e.disabled).length;
  const version = readmeVersion(root);
  const unchanged = previousMeta.sha256 === hash && previousMeta.version === version;
  const meta = {
    version,
    updated_at: unchanged && previousMeta.updated_at ? previousMeta.updated_at : new Date().toISOString().slice(0, 19) + 'Z',
    entries,
    disabled,
    sha256: hash,
    data_url: DATA_URL
  };
  return { json, meta };
}

export function readMeta(root) {
  try { return JSON.parse(readFileSync(join(root, 'assets', 'data', 'catalogue-meta.json'), 'utf8')); }
  catch { return {}; }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const dataDir = join(root, 'assets', 'data');
  mkdirSync(dataDir, { recursive: true });
  const { json, meta } = buildExport(root, readMeta(root));
  writeFileSync(join(dataDir, 'search-library.json'), json);
  writeFileSync(join(dataDir, 'catalogue-meta.json'), JSON.stringify(meta, null, 2) + '\n');
  console.log(`catalogue ${meta.version}: ${meta.entries} entries, ${meta.disabled} disabled, sha256 ${meta.sha256.slice(0, 12)}…, updated_at ${meta.updated_at}`);
}
