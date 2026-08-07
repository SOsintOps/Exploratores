#!/usr/bin/env node
// Exploratores link-checker — stage 1: extraction.
// Collects every external URL template from the search catalogue
// (assets/js/search-library.js) and from the inline page scripts that
// open URLs directly (pages/dorks.html, pages/vk.html), then derives one
// liveness-check URL per host: the full URL when at least one template
// for that host has no placeholder, otherwise the origin. Templates on
// .onion hosts and host-less templates are listed but never probed.
// Output: scripts/linkcheck/out/targets.json (consumed by check.mjs).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const read = f => readFileSync(join(root, f), 'utf8');

const templates = [];

const lib = read('assets/js/search-library.js');
for (const m of lib.matchAll(/"([a-z0-9-]+)"\s*:\s*\{\s*"urlTemplate"\s*:\s*"((?:[^"\\]|\\.)*)"/g)) {
  templates.push({ id: m[1], url: m[2].replace(/\\"/g, '"') });
}

for (const page of ['pages/dorks.html', 'pages/vk.html']) {
  const seen = new Set();
  for (const m of read(page).matchAll(/['"](https?:\/\/[^'"]+)['"]/g)) {
    if (seen.has(m[1])) continue;
    seen.add(m[1]);
    templates.push({ id: `${page}#inline`, url: m[1] });
  }
}

const hosts = {};
const onion = [];
const skipped = [];

for (const { id, url } of templates) {
  // Dynamic host (e.g. "https://{domain}/robots.txt", "https://{username}.tumblr.com/"):
  // there is no fixed server to probe — list it, never check it.
  if (/^[a-z]+:\/\/[^/]*\{/i.test(url)) {
    skipped.push({ id, url, reason: 'dynamic host (placeholder in hostname)' });
    continue;
  }
  let parsed;
  try {
    parsed = new URL(url.replace(/\{[a-zA-Z0-9_]+\}/g, 'x'));
  } catch {
    skipped.push({ id, url, reason: 'no host or unparsable (e.g. the bit.ly "{url}+" template)' });
    continue;
  }
  const host = parsed.hostname.toLowerCase();
  if (host.endsWith('.onion')) {
    onion.push({ id, host });
    continue;
  }
  const hasPlaceholder = /\{[a-zA-Z0-9_]+\}/.test(url);
  const entry = hosts[host] ?? (hosts[host] = { check: `${parsed.protocol}//${parsed.host}/`, full: false, ids: [] });
  entry.ids.push(id);
  if (!hasPlaceholder && !entry.full) {
    entry.check = url;
    entry.full = true;
  }
}

const outDir = join(here, 'out');
mkdirSync(outDir, { recursive: true });
const targets = { generated: new Date().toISOString(), templateCount: templates.length, hosts, onion, skipped };
writeFileSync(join(outDir, 'targets.json'), JSON.stringify(targets, null, 1));
console.log(`templates: ${templates.length} | hosts: ${Object.keys(hosts).length} | onion (skipped): ${onion.length} | hostless (skipped): ${skipped.length}`);
