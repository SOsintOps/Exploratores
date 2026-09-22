// Dependency-free tests for assets/js/catalogue-updater.js.
// Run with: node tests/catalogue-updater.test.mjs   (Node >= 20: global fetch, crypto.subtle)
// The browser is stubbed: localStorage is a Map, fetch answers from a table
// of canned responses, SearchLibrary/ExploratoresValidators are minimal.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'assets', 'js', 'catalogue-updater.js'), 'utf8');

let passed = 0;
const failures = [];
async function test(name, fn) { try { await fn(); passed++; } catch (e) { failures.push(`${name}: ${e.message}`); } }
function eq(actual, expected, label) {
  if (actual !== expected) throw new Error(`${label || 'value'} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
const sha = text => createHash('sha256').update(text).digest('hex');

const META_URL = 'https://raw.githubusercontent.com/SOsintOps/Exploratores/v3/assets/data/catalogue-meta.json';
const DATA_URL = 'https://raw.githubusercontent.com/SOsintOps/Exploratores/v3/assets/data/search-library.json';

// Builds a fresh sandbox, loads the script and returns { api, storage, calls }.
function boot({ settings, storage = new Map(), responses = {}, validators = true, library = true, brokenStorage = false } = {}) {
  if (settings !== undefined) storage.set('exploratores-settings', JSON.stringify(settings));
  const calls = [];
  const localStorage = brokenStorage ? {
    getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); }
  } : {
    getItem: k => (storage.has(k) ? storage.get(k) : null),
    setItem: (k, v) => { if (String(v).length > 10_000_000) throw new Error('quota'); storage.set(k, String(v)); },
    removeItem: k => { storage.delete(k); }
  };
  const sandbox = {
    console, crypto: globalThis.crypto, TextEncoder, localStorage, Date,
    fetch: async (url) => {
      calls.push(url);
      const r = responses[url];
      if (!r) throw new Error('network');
      return { ok: r.ok !== false, json: async () => JSON.parse(r.body), text: async () => r.body };
    }
  };
  sandbox.window = sandbox;
  if (library) sandbox.SearchLibrary = {
    'names-alpha': { urlTemplate: 'https://alpha.example/{term}', validator: 'getAndValidateSearchTerm' },
    'names-beta': { urlTemplate: 'https://beta.example/{term}', validator: 'getAndValidateSearchTerm' }
  };
  if (validators) sandbox.ExploratoresValidators = { getAndValidateSearchTerm() {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return { api: sandbox.CatalogueUpdater, storage, calls, sandbox };
}

const remote = {
  'names-alpha': { urlTemplate: 'https://alpha.example/new/{term}', validator: 'getAndValidateSearchTerm' },
  'names-beta': { urlTemplate: 'https://beta.example/{term}', disabled: '2026-08-17', validator: 'getAndValidateSearchTerm' },
  'names-future': { urlTemplate: 'https://future.example/{x}', validator: 'getAndValidateFuture' }
};
const dataText = JSON.stringify(remote, null, 1) + '\n';
const meta = { version: '3.7.0', updated_at: '2026-09-22T15:00:00Z', entries: 3, disabled: 1, sha256: sha(dataText), data_url: DATA_URL };
const good = { [META_URL]: { body: JSON.stringify(meta) }, [DATA_URL]: { body: dataText } };
const cacheFor = (m, entries) => new Map([['exploratores-catalogue', JSON.stringify({ meta: m, entries, downloadedAt: '2026-09-22T15:01:00Z' })]]);

await test('load: nothing happens without settings (no fetch, library untouched)', async () => {
  const { calls, sandbox, api } = boot();
  eq(calls.length, 0, 'fetch calls'); eq(sandbox.SearchLibrary['names-alpha'].urlTemplate, 'https://alpha.example/{term}');
  eq(api.status().enabled, false);
});

await test('applyCache: cached entries override, unknown validator and bad entries skipped', async () => {
  const storage = cacheFor(meta, { ...remote, 'bad-entry': { validator: 'x' }, 'BAD KEY': { urlTemplate: 'https://x/' } });
  const { sandbox } = boot({ storage });
  eq(sandbox.SearchLibrary['names-alpha'].urlTemplate, 'https://alpha.example/new/{term}', 'override');
  eq(sandbox.SearchLibrary['names-beta'].disabled, '2026-08-17', 'disabled flag carried');
  eq(sandbox.SearchLibrary['names-future'], undefined, 'unknown validator skipped');
  eq(sandbox.SearchLibrary['bad-entry'], undefined); eq(sandbox.SearchLibrary['BAD KEY'], undefined);
});

await test('applyCache: without validators on the page (home) every entry is applied', async () => {
  const { sandbox } = boot({ storage: cacheFor(meta, remote), validators: false });
  eq(typeof sandbox.SearchLibrary['names-future'], 'object');
});

await test('check: disabled setting → skipped, no network', async () => {
  const { api, calls } = boot({ settings: { catalogueAutoUpdate: false }, responses: good });
  eq((await api.check()).status, 'skipped-disabled'); eq(calls.length, 0);
});

await test('check: enabled → downloads, verifies and caches; applied on next boot', async () => {
  const storage = new Map();
  const { api, calls } = boot({ settings: { catalogueAutoUpdate: true }, storage, responses: good });
  const r = await api.check({ force: true });
  eq(r.status, 'updated'); eq(calls.includes(DATA_URL), true, 'data fetched');
  const cached = JSON.parse(storage.get('exploratores-catalogue'));
  eq(cached.meta.sha256, meta.sha256); eq(Object.keys(cached.entries).length, 3);
  const st = api.status();
  eq(st.cached.version, '3.7.0'); eq(st.lastResult, 'updated'); eq(typeof st.lastCheckAt, 'string');
  const next = boot({ storage });
  eq(next.sandbox.SearchLibrary['names-alpha'].urlTemplate, 'https://alpha.example/new/{term}', 'applied at next load');
});

await test('check: enabled at load triggers an automatic check once a day', async () => {
  const storage = new Map();
  const first = boot({ settings: { catalogueAutoUpdate: true }, storage, responses: good });
  await new Promise(r => setTimeout(r, 20));
  eq(first.calls[0], META_URL, 'auto check on load');
  const second = boot({ storage, responses: good });
  await new Promise(r => setTimeout(r, 20));
  eq(second.calls.length, 0, 'recent check → no new request');
  eq((await second.api.check()).status, 'skipped-recent');
});

await test('check: same sha as cache → up-to-date without downloading data', async () => {
  const { api, calls } = boot({ settings: { catalogueAutoUpdate: true }, storage: cacheFor(meta, remote), responses: good });
  eq((await api.check({ force: true })).status, 'up-to-date'); eq(calls.includes(DATA_URL), false);
});

await test('check: checksum mismatch is rejected and nothing is cached', async () => {
  const storage = new Map();
  const bad = { [META_URL]: { body: JSON.stringify({ ...meta, sha256: 'ab'.repeat(32) }) }, [DATA_URL]: { body: dataText } };
  const { api } = boot({ settings: { catalogueAutoUpdate: true }, storage, responses: bad });
  eq((await api.check({ force: true })).status, 'rejected-checksum'); eq(storage.has('exploratores-catalogue'), false);
});

await test('check: malformed data and entry-count mismatch are rejected', async () => {
  const broken = '{"names-alpha": {"urlTemplate": ';
  const r1 = { [META_URL]: { body: JSON.stringify({ ...meta, sha256: sha(broken) }) }, [DATA_URL]: { body: broken } };
  eq((await boot({ responses: r1 }).api.check({ force: true })).status, 'rejected-data', 'malformed');
  const r2 = { [META_URL]: { body: JSON.stringify({ ...meta, entries: 2 }) }, [DATA_URL]: { body: dataText } };
  eq((await boot({ responses: r2 }).api.check({ force: true })).status, 'rejected-data', 'count');
});

await test('check: metadata pointing outside the repository is refused', async () => {
  const evil = { [META_URL]: { body: JSON.stringify({ ...meta, data_url: 'https://evil.example/x.json' }) } };
  const { api, calls } = boot({ responses: evil });
  eq((await api.check({ force: true })).status, 'invalid-meta'); eq(calls.length, 1);
});

await test('check: network failure → unreachable, state records the attempt', async () => {
  const { api } = boot({});
  const r = await api.check({ force: true });
  eq(r.status, 'unreachable'); eq(api.status().lastResult, 'unreachable');
});

await test('discard: removes cache and state', async () => {
  const storage = cacheFor(meta, remote);
  const { api } = boot({ storage });
  api.discard();
  eq(storage.has('exploratores-catalogue'), false); eq(api.status().cached, null);
});

await test('storage unavailable: script loads, status is inert, check reports storage-full', async () => {
  const { api } = boot({ brokenStorage: true, responses: good });
  eq(api.status().enabled, false);
  eq((await api.check({ force: true })).status, 'storage-full');
});

await test('load: page without SearchLibrary does not throw', async () => {
  const { api } = boot({ library: false, storage: cacheFor(meta, remote) });
  eq(api.applyCache(), -1);
});

if (failures.length) {
  console.error(`FAILED — ${failures.length} of ${passed + failures.length}:\n` + failures.map(f => '  - ' + f).join('\n'));
  process.exit(1);
}
console.log(`OK — ${passed} tests passed.`);
