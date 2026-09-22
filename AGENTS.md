# Exploratores OSINT Toolkit — Agent Guide

Static HTML/CSS/vanilla-JavaScript OSINT toolkit. No build step, no backend, no package manager, no framework.

## Run

- Open `launchme.html` in a modern browser (Chrome, Edge, Brave). No local server required.
- Internet access is needed only for the external search tools; the Redactor, IBAN tool and CyberChef work fully offline.

## Architecture

- `pages/` — one HTML page per tool section. Filenames are always lowercase.
- `assets/js/` — core files:
  - `main.js` — the engine: a single click handler dispatches buttons via their `data-search-id`.
  - `validators.js` — `ExploratoresValidators` object; validators return `{ isValid, message, data }` and accept `(config, queryOverride)`.
  - `search-library.js` — `SearchLibrary` catalog mapping each `data-search-id` to `{ urlTemplate, validator }`.
  - `config.js` — global flags (Light Version, `selectorsToHide`).
  - Auxiliary modules: `dispatcher.js`, `toolkit-search.js`, `indicator-classifier.js`, `janua-search-map.js`, `settings-page.js`, `redactor.js` (page logic of `pages/redactor.html`).
  - `catalogue-updater.js` — optional in-browser refresh of the catalogue for offline copies (off by default, toggle in `pages/settings.html`): applies the localStorage cache on top of `SearchLibrary` synchronously at load and, when enabled, checks `assets/data/catalogue-meta.json` on GitHub once a day (SHA-256 verified download of `search-library.json`). **Every page that loads `search-library.js` must load `catalogue-updater.js` right after it.**
  - `assets/js/bankDatabases/` — per-country offline bank-name data for the IBAN tool.
- `assets/menu/navigation.js` — single navigation definition shared by all pages (`#navbar-placeholder`).
- `docs/` — Markdown sources of the Help pages (`guidelines.md`, `faq.md`, `customise.md`, `versionhistory.md`). Each has an HTML twin in `pages/` that must stay content-aligned.
- `tools/cc/` — embedded CyberChef build.
- `scripts/linkcheck/` — weekly link-health checker (see below).
- `scripts/catalogue/` — `build-meta.mjs` exports the catalogue to `assets/data/` (`search-library.json` + `catalogue-meta.json`); `verify-meta.mjs` is the CI guard that fails when the export is stale.
- `.github/workflows/linkcheck.yml` — CI schedule for the link checker.

## Conventions

- No inline styles or scripts in tool pages; buttons never use `onclick` — always `data-search-id`.
- Element ids follow `[type]-[page]-[name]` (e.g. `btn-names-personadb`); `data-search-id` follows `[page]-[name]`.
- 2-space indentation in HTML/JS; British English in documentation.
- Validate user input via `validators.js` before opening any search URL.

## Tests

- `node tests/validators.test.js` — dependency-free suite covering every validator in `validators.js` (DOM is stubbed; `ibankit.js` is loaded for the IBAN checksum path). No npm install needed.
- `node tests/linkcheck.test.mjs` — covers `apply-history.mjs` (disable/re-enable, CRLF preservation, idempotence) and the catalogue export hashing.
- `node tests/catalogue-updater.test.mjs` — covers `catalogue-updater.js` with stubbed `fetch`/`localStorage` (cache application, validator guard, checksum and structure rejection, daily interval, discard).
- `node scripts/catalogue/verify-meta.mjs` — fails when `assets/data/` no longer matches `search-library.js` or the README version.
- CI runs all of them on every push and pull request (`.github/workflows/tests.yml`).

## Link health CI

- `.github/workflows/linkcheck.yml` runs weekly (Sunday 13:13 UTC, plus manual `workflow_dispatch`): `extract-urls.mjs` collects every URL template from `search-library.js` and the inline scripts of `dorks.html`/`vk.html`, then `check.mjs` probes one URL per host and classifies the outcome. `dns-only.txt` and `ignore.txt` hold per-host overrides.
- Two-strike policy: a host is confirmed dead/unreliable only after failing two checks at least a week apart; single failures sit "in observation". Failure history (`history.json`) and cumulative statistics (`runs.csv`, `issues.csv`) persist across runs via the `linkcheck-results` artifact (90-day retention).
- Findings are published in the single open issue labelled `dead-links`; removing or replacing confirmed-dead tools stays a manual decision.
- Stage 3 (`apply-history.mjs`): entries on confirmed hosts (strikes ≥ 2, class DNS_FAIL/GONE/SERVER_ERR/TLS_ERR) get `"disabled": "YYYY-MM-DD"` in `search-library.js`, recovered hosts lose it, and the export is rebuilt; the run opens or updates the pull request `auto/disable-dead-links` (peter-evans/create-pull-request) — nothing lands on `v3` without a merge. `main.js` greys disabled buttons out and refuses to open them; `toolkit-search.js` skips them. Never set `disabled` by hand. Requires the repository setting "Allow GitHub Actions to create and approve pull requests".
- Run locally with Node ≥ 18: `node scripts/linkcheck/extract-urls.mjs && node scripts/linkcheck/check.mjs` (outputs in `scripts/linkcheck/out/`, gitignored; `--recheck` re-probes only the suspicious hosts).

## Versioning

- Bug fixes → patch bump (x.y.Z); new features → minor bump (x.Y.0).
- On every bump: update the README (title, badge, latest-release note), the footer of every HTML page (including `launchme.html`), and add the changelog entry to BOTH `docs/versionhistory.md` and `pages/versionhistory.html` with identical wording.
- After any catalogue change or version bump run `node scripts/catalogue/build-meta.mjs` and commit `assets/data/` (the CI verify step fails otherwise).
