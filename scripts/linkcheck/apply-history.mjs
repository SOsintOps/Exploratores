#!/usr/bin/env node
// Exploratores link-checker — stage 3: apply confirmed failures to the catalogue.
// Reads out/history.json (written by check.mjs) and marks every catalogue entry
// whose host is CONFIRMED dead/unreliable (strikes >= 2 and an actionable
// class: DNS_FAIL, GONE, SERVER_ERR, TLS_ERR) with
//   "disabled": "YYYY-MM-DD"      (date of the confirming strike)
// The engine (main.js) greys those buttons out and refuses to open them; the
// Toolkit Search hides them. Entries whose host has recovered — or is no longer
// confirmed — lose the flag again, so the flag is owned by the checker: do not
// set it by hand, fix or remove the entry instead.
// The catalogue file is edited line by line (the object is never re-serialised),
// so indentation, comments and line endings are preserved byte for byte.
// Also writes out/pr-body.md, the body of the automated pull request.
// Modes:
//   node apply-history.mjs             apply and write
//   node apply-history.mjs --dry-run   report only
// Always exits 0.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ACTIONABLE = new Set(['DNS_FAIL', 'GONE', 'SERVER_ERR', 'TLS_ERR']);
// The tail group uses [\s\S] rather than "." so a trailing \r (CRLF files) is kept.
const ENTRY_RE = /^(\s*"([a-z0-9-]+)"\s*:\s*\{\s*"urlTemplate"\s*:\s*"((?:[^"\\]|\\.)*)")([\s\S]*)$/;
const DISABLED_RE = /,\s*"disabled"\s*:\s*"[^"]*"/;

// Same host derivation as extract-urls.mjs: dynamic hosts and unparsable
// templates have no fixed server and are never touched.
export function hostOf(urlTemplate) {
  const url = urlTemplate.replace(/\\"/g, '"');
  if (/^[a-z]+:\/\/[^/]*\{/i.test(url)) return null;
  try { return new URL(url.replace(/\{[a-zA-Z0-9_]+\}/g, 'x')).hostname.toLowerCase(); }
  catch { return null; }
}

// Hosts confirmed by the two-strike policy → date of the confirming strike.
export function confirmedHosts(history) {
  const out = {};
  for (const [host, h] of Object.entries(history)) {
    if (h.strikes >= 2 && ACTIONABLE.has(h.class)) out[host] = String(h.lastStrike).slice(0, 10);
  }
  return out;
}

// Returns { source, added, removed } — `source` is the rewritten catalogue text.
export function applyHistory(source, history) {
  const confirmed = confirmedHosts(history);
  const added = [];
  const removed = [];
  const lines = source.split('\n').map(line => {
    const m = line.match(ENTRY_RE);
    if (!m) return line;
    const [, head, id, template, rest] = m;
    const host = hostOf(template);
    const isDisabled = DISABLED_RE.test(rest);
    if (host && confirmed[host]) {
      if (isDisabled) return line;
      added.push({ id, host, date: confirmed[host] });
      return `${head}, "disabled": "${confirmed[host]}"${rest}`;
    }
    if (isDisabled) {
      removed.push({ id, host });
      return head + rest.replace(DISABLED_RE, '');
    }
    return line;
  });
  return { source: lines.join('\n'), added, removed };
}

export function prBody(history, added, removed) {
  const confirmed = confirmedHosts(history);
  const byHost = {};
  for (const a of added) (byHost[a.host] ??= []).push(a.id);
  const lines = ['Automated update from the weekly link check (two-strike policy).', ''];
  if (added.length) {
    lines.push(`## Marked as disabled (${added.length} tool${added.length === 1 ? '' : 's'})`, '',
      '| Host | Class | Confirmed on | data-search-id |', '|---|---|---|---|');
    for (const host of Object.keys(byHost).sort())
      lines.push(`| \`${host}\` | ${history[host].class} | ${confirmed[host]} | ${byHost[host].join(', ')} |`);
    lines.push('');
  }
  if (removed.length) {
    lines.push(`## Re-enabled — host recovered (${removed.length} tool${removed.length === 1 ? '' : 's'})`, '',
      removed.map(r => `- \`${r.id}\` (${r.host})`).join('\n'), '');
  }
  lines.push('Merging this pull request greys the affected buttons out on the site; fixing or removing the entries stays a manual decision.');
  return lines.join('\n') + '\n';
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = join(here, '..', '..');
  const outDir = join(here, 'out');
  const historyPath = join(outDir, 'history.json');
  const catalogue = join(root, 'assets', 'js', 'search-library.js');
  const dryRun = process.argv.includes('--dry-run');

  if (!existsSync(historyPath)) {
    console.error(`No ${historyPath} — run check.mjs first.`);
    process.exit(0);
  }
  const history = JSON.parse(readFileSync(historyPath, 'utf8'));
  const before = readFileSync(catalogue, 'utf8');
  const { source, added, removed } = applyHistory(before, history);

  for (const a of added) console.log(`disable  ${a.id}  (${a.host}, confirmed ${a.date})`);
  for (const r of removed) console.log(`enable   ${r.id}  (${r.host} recovered)`);
  console.log(`confirmed hosts: ${Object.keys(confirmedHosts(history)).length} | disabled: +${added.length} | re-enabled: ${removed.length}${dryRun ? ' | dry run' : ''}`);

  if (!dryRun && source !== before) {
    writeFileSync(catalogue, source);
    writeFileSync(join(outDir, 'pr-body.md'), prBody(history, added, removed));
    console.log(`written: ${catalogue}`);
  }
}
