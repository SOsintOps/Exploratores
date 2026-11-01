// Dependency-free tests for scripts/catalogue/check-ids.mjs.
// Run with: node tests/check-ids.test.mjs
import { objectKeys, pageButtons, idProblems, readSources } from '../scripts/catalogue/check-ids.mjs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

let passed = 0;
const failures = [];
function test(name, fn) { try { fn(); passed++; } catch (e) { failures.push(`${name}: ${e.message}`); } }
function eq(actual, expected, label) {
  const a = JSON.stringify(actual), b = JSON.stringify(expected);
  if (a !== b) throw new Error(`${label || 'value'} — expected ${b}, got ${a}`);
}

const library = [
  'const SearchLibrary = {',
  '"names-alpha": { "urlTemplate": "https://a.example/{term}" },',
  '    "names-beta": { "urlTemplate": "https://b.example/{term}" },',
  '};'
].join('\r\n');
const januaMap = '    "names-alpha": { "label": "Alpha", "page": "Names"},\n';
const page = [
  '<button id="btn-a" class="button" data-search-id="names-alpha">Alpha</button>',
  '<button type="button" id="btn-b" data-search-id="names-beta">Beta</button>',
  '<script>document.querySelector(\'[data-search-id="names-alpha"]\');</script>'
].join('\n');

test('objectKeys: indented and unindented keys', () => eq(objectKeys(library), ['names-alpha', 'names-beta']));
test('pageButtons: script mentions ignored', () => eq(pageButtons(page).searchIds, ['names-alpha', 'names-beta']));
test('idProblems: clean sources', () => eq(idProblems({ library, januaMap, pages: { 'p.html': page } }), []));

test('idProblems: repeated catalogue key (the 3.10.3 CAC case)', () => {
  const lib = library.replace('};', '    "names-alpha": { "urlTemplate": "https://other.example/{term}" },\r\n};');
  eq(idProblems({ library: lib, januaMap, pages: {} }), ['search-library.js: key "names-alpha" is declared more than once']);
});
test('idProblems: repeated Janua key', () => {
  eq(idProblems({ library, januaMap: januaMap + januaMap, pages: {} }), ['janua-search-map.js: key "names-alpha" is declared more than once']);
});
test('idProblems: repeated button id and data-search-id', () => {
  const p = page + '\n<button id="btn-a" data-search-id="names-alpha">Alpha again</button>';
  eq(idProblems({ library, januaMap, pages: { 'p.html': p } }), [
    'p.html: button id "btn-a" is used more than once',
    'p.html: data-search-id "names-alpha" is used by more than one button',
  ]);
});
test('idProblems: button without catalogue entry', () => {
  const p = '<button id="btn-x" data-search-id="names-ghost">Ghost</button>';
  eq(idProblems({ library, januaMap, pages: { 'p.html': p } }), ['p.html: data-search-id "names-ghost" has no entry in search-library.js']);
});
test('real repository: no identifier problems', () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  eq(idProblems(readSources(root)), []);
});

if (failures.length) {
  console.error(`FAILED — ${failures.length} of ${passed + failures.length}:\n` + failures.map(f => '  - ' + f).join('\n'));
  process.exit(1);
}
console.log(`OK — ${passed} tests passed.`);
