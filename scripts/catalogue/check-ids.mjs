// Identifier guard for the catalogue and the tool pages. A repeated key in an
// object literal is not an error in JavaScript (the last one silently wins),
// and repeated ids in HTML raise no warning, so these checks read the source
// text instead of the evaluated objects. Used by verify-meta.mjs (CI).
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const KEY_RE = /^\s*"([a-z0-9-]+)"\s*:\s*\{/gm;

function repeated(list) {
  const seen = new Set();
  const dup = new Set();
  for (const x of list) (seen.has(x) ? dup : seen).add(x);
  return [...dup].sort();
}

// Keys declared in a catalogue-like source file, in order, repeats included.
export function objectKeys(source) {
  return [...source.matchAll(KEY_RE)].map(m => m[1]);
}

// id and data-search-id of every <button> tag in one page. Mentions inside
// scripts (querySelector('[data-search-id="..."]')) are not <button> tags.
export function pageButtons(html) {
  const ids = [];
  const searchIds = [];
  for (const [tag] of html.matchAll(/<button\b[^>]*>/g)) {
    const id = tag.match(/\sid="([^"]+)"/);
    const sid = tag.match(/\sdata-search-id="([^"]+)"/);
    if (id) ids.push(id[1]);
    if (sid) searchIds.push(sid[1]);
  }
  return { ids, searchIds };
}

// Problems as human-readable strings; empty array when everything is fine.
// pages: { 'pages/x.html': '<html>…' }
export function idProblems({ library, januaMap, pages }) {
  const problems = [];
  const libKeys = objectKeys(library);
  for (const k of repeated(libKeys)) problems.push(`search-library.js: key "${k}" is declared more than once`);
  for (const k of repeated(objectKeys(januaMap))) problems.push(`janua-search-map.js: key "${k}" is declared more than once`);
  const known = new Set(libKeys);
  for (const [name, html] of Object.entries(pages)) {
    const { ids, searchIds } = pageButtons(html);
    for (const id of repeated(ids)) problems.push(`${name}: button id "${id}" is used more than once`);
    for (const sid of repeated(searchIds)) problems.push(`${name}: data-search-id "${sid}" is used by more than one button`);
    for (const sid of new Set(searchIds)) if (!known.has(sid)) problems.push(`${name}: data-search-id "${sid}" has no entry in search-library.js`);
  }
  return problems;
}

export function readSources(root) {
  const pagesDir = join(root, 'pages');
  const pages = {};
  for (const f of readdirSync(pagesDir).filter(f => f.endsWith('.html')).sort())
    pages[`pages/${f}`] = readFileSync(join(pagesDir, f), 'utf8');
  return {
    library: readFileSync(join(root, 'assets', 'js', 'search-library.js'), 'utf8'),
    januaMap: readFileSync(join(root, 'assets', 'js', 'janua-search-map.js'), 'utf8'),
    pages,
  };
}
