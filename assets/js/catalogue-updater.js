// assets/js/catalogue-updater.js
// Optional in-browser refresh of the search catalogue for offline copies of
// the toolkit. Off by default (Settings → Catalogue updates): when enabled,
// once a day the page fetches assets/data/catalogue-meta.json from the
// project's GitHub repository; when the metadata announces a newer catalogue
// the JSON export is downloaded, its SHA-256 verified against the metadata
// and the result cached in localStorage. The cached catalogue is applied on
// top of SearchLibrary at the start of every page load (synchronously, before
// main.js runs), so a download becomes effective from the next page opened.
// Entries whose validator does not exist in the local validators.js are left
// untouched — that keeps an old copy of the toolkit safe with a newer export.
// GitHub Pages visitors never need this: the site is redeployed on every push.
// Load this script right after search-library.js on every page that uses it.
(function () {
  'use strict';

  const SETTINGS_KEY = 'exploratores-settings';
  const STATE_KEY = 'exploratores-catalogue-state';
  const CACHE_KEY = 'exploratores-catalogue';
  const META_URL = 'https://raw.githubusercontent.com/SOsintOps/Exploratores/v3/assets/data/catalogue-meta.json';
  const DATA_ORIGIN = 'https://raw.githubusercontent.com/SOsintOps/Exploratores/';
  const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000;
  const MAX_DATA_BYTES = 4 * 1024 * 1024;

  function readJson(key) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }
  function remove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* storage unavailable */ }
  }

  function isEnabled() {
    const s = readJson(SETTINGS_KEY);
    return !!(s && s.catalogueAutoUpdate === true);
  }

  function isEntry(v) {
    return !!v && typeof v === 'object' && typeof v.urlTemplate === 'string' && v.urlTemplate.length > 0;
  }

  function validatorKnown(entry) {
    if (!entry.validator) return true;
    if (typeof ExploratoresValidators === 'undefined') return true;   // pages without validators (home)
    return typeof ExploratoresValidators[entry.validator] === 'function';
  }

  // Applies the cached catalogue to SearchLibrary. Returns the number of
  // entries replaced, or -1 when nothing could be applied.
  function applyCache() {
    if (typeof SearchLibrary === 'undefined') return -1;
    const cache = readJson(CACHE_KEY);
    if (!cache || !cache.entries || typeof cache.entries !== 'object') return -1;
    let applied = 0;
    for (const key of Object.keys(cache.entries)) {
      const entry = cache.entries[key];
      if (!/^[a-z0-9-]+$/.test(key) || !isEntry(entry) || !validatorKnown(entry)) continue;
      SearchLibrary[key] = entry;
      applied++;
    }
    return applied;
  }

  async function sha256Hex(text) {
    const bytes = new TextEncoder().encode(text.replace(/\r\n/g, '\n'));
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function validMeta(meta) {
    return !!meta && typeof meta === 'object'
      && /^[0-9a-f]{64}$/.test(meta.sha256 || '')
      && typeof meta.updated_at === 'string'
      && typeof meta.data_url === 'string' && meta.data_url.indexOf(DATA_ORIGIN) === 0
      && Number.isInteger(meta.entries) && meta.entries > 0;
  }

  const now = () => new Date().toISOString().slice(0, 19) + 'Z';

  // Checks for a newer catalogue. Resolves to { status, ... }:
  //   skipped-disabled | skipped-recent | unreachable | invalid-meta |
  //   up-to-date | rejected-checksum | rejected-data | updated | storage-full
  async function check(options) {
    const force = !!(options && options.force);
    const state = readJson(STATE_KEY) || {};
    if (!force) {
      if (!isEnabled()) return { status: 'skipped-disabled' };
      if (state.lastCheckAt && Date.now() - Date.parse(state.lastCheckAt) < CHECK_INTERVAL_MS) return { status: 'skipped-recent', state };
    }
    const done = (status, extra) => {
      state.lastCheckAt = now();
      state.lastResult = status;
      writeJson(STATE_KEY, state);
      return Object.assign({ status, state }, extra || {});
    };

    let meta;
    try {
      const res = await fetch(META_URL, { cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' });
      if (!res.ok) return done('unreachable');
      meta = await res.json();
    } catch (e) { return done('unreachable'); }
    if (!validMeta(meta)) return done('invalid-meta');

    const cache = readJson(CACHE_KEY);
    if (cache && cache.meta && cache.meta.sha256 === meta.sha256) {
      state.lastMeta = meta;
      return done('up-to-date', { meta });
    }

    let text;
    try {
      const res = await fetch(meta.data_url, { cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' });
      if (!res.ok) return done('unreachable');
      text = await res.text();
    } catch (e) { return done('unreachable'); }
    if (text.length > MAX_DATA_BYTES) return done('rejected-data');
    if ((await sha256Hex(text)) !== meta.sha256) return done('rejected-checksum');

    let data;
    try { data = JSON.parse(text); } catch (e) { return done('rejected-data'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return done('rejected-data');
    const keys = Object.keys(data);
    if (keys.length !== meta.entries || !keys.every(k => isEntry(data[k]))) return done('rejected-data');

    if (!writeJson(CACHE_KEY, { meta, entries: data, downloadedAt: now() })) return done('storage-full');
    state.lastMeta = meta;
    return done('updated', { meta });
  }

  function discard() {
    remove(CACHE_KEY);
    remove(STATE_KEY);
  }

  function status() {
    const cache = readJson(CACHE_KEY);
    const state = readJson(STATE_KEY) || {};
    return {
      enabled: isEnabled(),
      lastCheckAt: state.lastCheckAt || null,
      lastResult: state.lastResult || null,
      cached: cache && cache.meta ? {
        version: cache.meta.version, updated_at: cache.meta.updated_at, entries: cache.meta.entries,
        disabled: cache.meta.disabled, downloadedAt: cache.downloadedAt
      } : null
    };
  }

  const api = { applyCache, check, discard, status, META_URL, CHECK_INTERVAL_MS };
  if (typeof window !== 'undefined') window.CatalogueUpdater = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;

  applyCache();
  if (isEnabled()) check().catch(function () { /* network problems are not the page's business */ });
})();
