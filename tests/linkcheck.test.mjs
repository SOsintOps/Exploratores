// Dependency-free tests for scripts/linkcheck/apply-history.mjs and
// scripts/catalogue/build-meta.mjs. Run with: node tests/linkcheck.test.mjs
import { applyHistory, confirmedHosts, hostOf, prBody } from '../scripts/linkcheck/apply-history.mjs';
import { loadCatalogue, sha256 } from '../scripts/catalogue/build-meta.mjs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

let passed = 0;
const failures = [];
function test(name, fn) { try { fn(); passed++; } catch (e) { failures.push(`${name}: ${e.message}`); } }
function eq(actual, expected, label) {
  if (actual !== expected) throw new Error(`${label || 'value'} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

const catalogue = [
  'const SearchLibrary = {',
  '    // --- comment line ---',
  '    "names-alpha": { "urlTemplate": "https://alpha.example/search?q={term}", "validator": "getAndValidateSearchTerm" },',
  '"names-beta": { "urlTemplate": "https://beta.example/{term}", "validator": "getAndValidateSearchTerm" },',
  '    "names-gamma": { "urlTemplate": "https://gamma.example/", "no_input": true },',
  '    "names-delta": { "urlTemplate": "https://delta.example/x", "disabled": "2026-01-01", "validator": "getAndValidateSearchTerm" },',
  '    "names-dyn": { "urlTemplate": "https://{username}.example.org/", "validator": "getAndValidateUsername" },',
  '    "names-quote": { "urlTemplate": "https://quote.example/?q=\\"{term}\\"", "validator": "getAndValidateSearchTerm" },',
  '};'
].join('\r\n');

const history = {
  'alpha.example': { class: 'DNS_FAIL', strikes: 2, firstSeen: '2026-08-07T13:00:00Z', lastStrike: '2026-08-17T13:13:00Z' },
  'beta.example': { class: 'GONE', strikes: 1, firstSeen: '2026-08-17T13:13:00Z', lastStrike: '2026-08-17T13:13:00Z' },
  'gamma.example': { class: 'TIMEOUT', strikes: 3, firstSeen: '2026-08-07T13:00:00Z', lastStrike: '2026-08-24T13:13:00Z' },
  'quote.example': { class: 'TLS_ERR', strikes: 2, firstSeen: '2026-08-07T13:00:00Z', lastStrike: '2026-08-17T13:13:00Z' }
};

test('hostOf: placeholder in path', () => eq(hostOf('https://alpha.example/search?q={term}'), 'alpha.example'));
test('hostOf: dynamic host is null', () => eq(hostOf('https://{username}.example.org/'), null));
test('hostOf: escaped quotes tolerated', () => eq(hostOf('https://quote.example/?q=\\"{term}\\"'), 'quote.example'));
test('hostOf: unparsable is null', () => eq(hostOf('bit.ly/{url}+'), null));

test('confirmedHosts: strikes>=2 and actionable only', () => {
  const c = confirmedHosts(history);
  eq(Object.keys(c).sort().join(','), 'alpha.example,quote.example');
  eq(c['alpha.example'], '2026-08-17', 'date');
});

const result = applyHistory(catalogue, history);
const out = result.source.split('\r\n');

test('applyHistory: confirmed host gets disabled flag after urlTemplate', () =>
  eq(out[2], '    "names-alpha": { "urlTemplate": "https://alpha.example/search?q={term}", "disabled": "2026-08-17", "validator": "getAndValidateSearchTerm" },'));
test('applyHistory: single strike untouched', () => eq(out[3], catalogue.split('\r\n')[3]));
test('applyHistory: TIMEOUT never disables', () => eq(out[4], catalogue.split('\r\n')[4]));
test('applyHistory: recovered host loses the flag', () =>
  eq(out[5], '    "names-delta": { "urlTemplate": "https://delta.example/x", "validator": "getAndValidateSearchTerm" },'));
test('applyHistory: dynamic host untouched', () => eq(out[6], catalogue.split('\r\n')[6]));
test('applyHistory: escaped-quote template handled', () =>
  eq(out[7], '    "names-quote": { "urlTemplate": "https://quote.example/?q=\\"{term}\\"", "disabled": "2026-08-17", "validator": "getAndValidateSearchTerm" },'));
test('applyHistory: comments, braces and CRLF preserved', () => {
  eq(out[0], 'const SearchLibrary = {'); eq(out[1], '    // --- comment line ---'); eq(out[8], '};');
  eq(result.source.includes('\r\n'), true, 'CRLF kept');
});
test('applyHistory: change lists', () => {
  eq(result.added.map(a => a.id).join(','), 'names-alpha,names-quote');
  eq(result.removed.map(r => r.id).join(','), 'names-delta');
});
test('applyHistory: idempotent', () => {
  const again = applyHistory(result.source, history);
  eq(again.source, result.source); eq(again.added.length, 0); eq(again.removed.length, 0);
});
test('applyHistory: empty history clears every flag', () => {
  const r = applyHistory(result.source, {});
  eq(r.added.length, 0); eq(r.removed.length, 2); eq(r.source.includes('"disabled"'), false);
});
test('applyHistory: rewritten catalogue still evaluates and carries the flag', () => {
  const lib = new Function(result.source + '\n;return SearchLibrary')();
  eq(lib['names-alpha'].disabled, '2026-08-17'); eq(lib['names-delta'].disabled, undefined); eq(Object.keys(lib).length, 6);
});
test('prBody: lists hosts and re-enabled tools', () => {
  const body = prBody(history, result.added, result.removed);
  eq(body.includes('| `alpha.example` | DNS_FAIL | 2026-08-17 | names-alpha |'), true, 'table row');
  eq(body.includes('- `names-delta` (delta.example)'), true, 'recovered');
});

test('sha256: independent of line endings', () => eq(sha256('a\r\nb\r\n'), sha256('a\nb\n')));
test('loadCatalogue: real catalogue evaluates', () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const lib = loadCatalogue(root);
  eq(typeof lib['searchengines-google'].urlTemplate, 'string');
  eq(Object.keys(lib).length > 800, true, 'size');
});

if (failures.length) {
  console.error(`FAILED — ${failures.length} of ${passed + failures.length}:\n` + failures.map(f => '  - ' + f).join('\n'));
  process.exit(1);
}
console.log(`OK — ${passed} tests passed.`);
