#!/usr/bin/env node
// Exploratores link-checker — stage 2: liveness probe + report.
// Reads out/targets.json (produced by extract-urls.mjs) and probes one URL
// per host. Classification rules:
//   - full-URL checks (template without placeholder): status semantics apply
//     (404/410 = GONE, 5xx = SERVER_ERR);
//   - origin checks (all templates for the host have placeholders): ANY HTTP
//     response proves the server is alive — only network-level failures
//     (DNS, refused, reset, timeout after retries) are suspicious;
//   - 401/403/405/418/429/999 and Cloudflare challenges = PROTECTED (alive);
//   - hosts listed in dns-only.txt get a DNS lookup only (bot-hostile or
//     geo-blocked services that drop plain HTTP clients);
//   - hosts listed in ignore.txt are skipped entirely.
// Two-strike policy: a host is only reported as confirmed dead/unreliable
// after failing two checks at least a week apart. Failure streaks persist in
// out/history.json; the CI restores the previous run's copy as
// out/previous-history.json (or seeds it from previous-results.json when
// upgrading from a run that predates the history file). Hosts that recover
// drop out of the history entirely.
// Modes:
//   node check.mjs               full run (CI or local)
//   node check.mjs --recheck     re-probe only suspicious hosts from the
//                                previous out/results.json (local last mile)
// Always exits 0: the report informs, humans decide.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lookup } from 'node:dns/promises';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, 'out');
const targets = JSON.parse(readFileSync(join(outDir, 'targets.json'), 'utf8'));

const readList = f => existsSync(join(here, f))
  ? readFileSync(join(here, f), 'utf8').split('\n').map(l => l.split('#')[0].trim()).filter(Boolean)
  : [];
const ignore = new Set(readList('ignore.txt'));
const dnsOnly = new Set(readList('dns-only.txt'));

const RECHECK = process.argv.includes('--recheck');
const SUSPICIOUS = new Set(['DNS_FAIL', 'TIMEOUT', 'CONN_REFUSED', 'CONN_RESET', 'GONE', 'SERVER_ERR', 'TLS_ERR', 'NET_OTHER']);
const previous = RECHECK && existsSync(join(outDir, 'results.json'))
  ? JSON.parse(readFileSync(join(outDir, 'results.json'), 'utf8'))
  : null;
if (RECHECK && !previous) {
  console.error('--recheck requires a previous out/results.json');
  process.exit(1);
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36';
const HEADERS = { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8', 'Accept-Language': 'en-GB,en;q=0.8' };
const TIMEOUT_MS = 15000;
const RETRIES = 2;
const PROTECTED_CODES = new Set([401, 403, 405, 418, 429, 999]);

function classifyResponse(status, headers, isFullUrl) {
  const server = (headers.get('server') || '').toLowerCase();
  const cf = headers.has('cf-ray') || server.includes('cloudflare');
  if (status >= 200 && status < 400) return { class: 'OK', status };
  if (PROTECTED_CODES.has(status) || (cf && [503, 520, 521, 522].includes(status))) return { class: 'PROTECTED', status };
  if (!isFullUrl) return { class: 'ALIVE_ERR', status };            // origin responded: server is up
  if (status === 404 || status === 410) return { class: 'GONE', status };
  if (status >= 500) return { class: 'SERVER_ERR', status };
  return { class: 'ALIVE_ERR', status };
}

function classifyError(e) {
  if (e.name === 'TimeoutError' || e.name === 'AbortError') return 'TIMEOUT';
  const cause = e.cause ?? e;
  const code = cause.code || '';
  const msg = `${cause.message || e.message || ''}`;
  if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') return 'DNS_FAIL';
  if (code === 'ECONNREFUSED') return 'CONN_REFUSED';
  if (code === 'ECONNRESET' || code === 'UND_ERR_SOCKET') return 'CONN_RESET';
  if (code === 'UND_ERR_CONNECT_TIMEOUT' || code === 'UND_ERR_HEADERS_TIMEOUT') return 'TIMEOUT';
  if (code.startsWith('CERT_') || code.startsWith('ERR_TLS') || code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'
      || code === 'DEPTH_ZERO_SELF_SIGNED_CERT' || code === 'SELF_SIGNED_CERT_IN_CHAIN'
      || /certificate|ssl|tls/i.test(msg)) return 'TLS_ERR';
  return 'NET_OTHER';
}

async function probe(host, entry) {
  if (dnsOnly.has(host)) {
    try { await lookup(host); return { class: 'DNS_ONLY_OK' }; }
    catch { return { class: 'DNS_FAIL' }; }
  }
  let last = null;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    if (attempt) await new Promise(r => setTimeout(r, 2000 * attempt));
    try {
      const res = await fetch(entry.check, { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS) });
      await res.body?.cancel();
      return classifyResponse(res.status, res.headers, entry.full);
    } catch (e) {
      last = { class: classifyError(e), err: String(e.cause?.message ?? e.message).slice(0, 120) };
      if (last.class === 'DNS_FAIL' || last.class === 'TLS_ERR') break;   // not transient
    }
  }
  return last;
}

const hosts = Object.entries(targets.hosts)
  .filter(([h]) => !ignore.has(h))
  .filter(([h]) => !RECHECK || SUSPICIOUS.has(previous[h]?.class));
console.log(`${RECHECK ? 'recheck' : 'full run'}: ${hosts.length} hosts`);

const results = previous ? { ...previous } : {};
const queue = [...hosts];
async function worker() {
  for (let item; (item = queue.shift());) {
    const [host, entry] = item;
    results[host] = await probe(host, entry);
  }
}
await Promise.all(Array.from({ length: 12 }, worker));

// --- failure history (two-strike policy) ---
const now = new Date().toISOString();
const STRIKE_GAP_MS = 6 * 24 * 3600 * 1000;   // "a week apart", with cron jitter allowance
let prevHistory = {};
if (existsSync(join(outDir, 'previous-history.json'))) {
  prevHistory = JSON.parse(readFileSync(join(outDir, 'previous-history.json'), 'utf8'));
} else if (existsSync(join(outDir, 'previous-results.json'))) {
  // Upgrade path: seed one strike from a pre-history run's raw results.
  const seedDate = existsSync(join(outDir, 'previous-targets.json'))
    ? JSON.parse(readFileSync(join(outDir, 'previous-targets.json'), 'utf8')).generated
    : now;
  for (const [h, r] of Object.entries(JSON.parse(readFileSync(join(outDir, 'previous-results.json'), 'utf8')))) {
    if (SUSPICIOUS.has(r.class)) prevHistory[h] = { class: r.class, strikes: 1, firstSeen: seedDate, lastStrike: seedDate };
  }
}
const history = {};
for (const [host, r] of Object.entries(results)) {
  if (!SUSPICIOUS.has(r.class)) continue;      // recovered hosts drop out of the history
  const prev = prevHistory[host];
  if (!prev) history[host] = { class: r.class, strikes: 1, firstSeen: now, lastStrike: now };
  else if (Date.now() - Date.parse(prev.lastStrike) >= STRIKE_GAP_MS)
    history[host] = { class: r.class, strikes: prev.strikes + 1, firstSeen: prev.firstSeen, lastStrike: now };
  else history[host] = { ...prev, class: r.class };   // re-run within the week: streak unchanged
}

// --- report ---
const counts = {};
for (const r of Object.values(results)) counts[r.class] = (counts[r.class] || 0) + 1;
const idsOf = h => targets.hosts[h]?.ids ?? [];
const strikesOf = h => history[h]?.strikes ?? 0;
const confirmed = h => strikesOf(h) >= 2;
const ACTIONABLE = ['DNS_FAIL', 'GONE', 'SERVER_ERR', 'TLS_ERR'];
const section = (title, pick, note) => {
  const rows = Object.entries(results)
    .filter(([h, r]) => pick(h, r))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([h, r]) => `| \`${h}\` | ${r.status ?? r.class}${r.err ? ` — ${r.err}` : ''} | ${strikesOf(h)} | ${idsOf(h).length} | ${idsOf(h).slice(0, 6).join(', ')}${idsOf(h).length > 6 ? ', …' : ''} |`);
  if (!rows.length) return `## ${title}\n\nNone. ✅\n`;
  return `## ${title}\n\n${note}\n\n| Host | Result | Strikes | Tools | data-search-id |\n|---|---|---|---|---|\n${rows.join('\n')}\n`;
};

const deadTools = Object.entries(results)
  .filter(([h, r]) => ['DNS_FAIL', 'GONE'].includes(r.class) && confirmed(h))
  .reduce((n, [h]) => n + idsOf(h).length, 0);
const report = `# Weekly link-check report

Generated: ${new Date().toISOString()} — templates: ${targets.templateCount}, hosts probed: ${Object.keys(results).length}, \`.onion\` skipped: ${targets.onion.length}.
Summary: ${Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(' · ')} — **${deadTools} tool buttons on confirmed-dead hosts**.
Policy: a host is confirmed dead/unreliable only after failing two checks at least a week apart (strikes ≥ 2); first-time failures sit in observation until the next weekly run.

${section('Confirmed dead (network)', (h, r) => r.class === 'DNS_FAIL' && confirmed(h), 'Domain has not resolved for two consecutive weekly checks. Replace or remove the tools.')}
${section('Confirmed dead (HTTP)', (h, r) => r.class === 'GONE' && confirmed(h), 'Full tool URL has answered 404/410 for two consecutive weekly checks. Fix or remove.')}
${section('Confirmed degraded (server errors)', (h, r) => r.class === 'SERVER_ERR' && confirmed(h), 'Persistent 5xx across weekly checks. Consider replacing the tools.')}
${section('Confirmed broken TLS', (h, r) => r.class === 'TLS_ERR' && confirmed(h), 'Certificate problems for two consecutive weekly checks — analysts will hit browser warnings too.')}
${section('In observation — first failed check', (h, r) => ACTIONABLE.includes(r.class) && !confirmed(h), 'Failed this run only. The next weekly check either confirms the host as dead/unreliable or clears it.')}
${section('Unverifiable from this network', (h, r) => ['TIMEOUT', 'CONN_REFUSED', 'CONN_RESET', 'NET_OTHER'].includes(r.class), 'No HTTP answer (possible datacenter-IP blocking). Re-check locally with: \`node scripts/linkcheck/check.mjs --recheck\`.')}
${section('Alive behind protection (informative)', (h, r) => r.class === 'PROTECTED', 'Bot-wall or login-wall answered — the service is up. No action needed.')}
`;

writeFileSync(join(outDir, 'history.json'), JSON.stringify(history, null, 1));
writeFileSync(join(outDir, 'results.json'), JSON.stringify(results, null, 1));
writeFileSync(join(outDir, 'report.md'), report);
console.log('classes:', JSON.stringify(counts));
console.log(`report: ${join(outDir, 'report.md')}`);
