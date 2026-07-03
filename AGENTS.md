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
  - Auxiliary modules: `dispatcher.js`, `toolkit-search.js`, `indicator-classifier.js`, `janua-search-map.js`, `settings-page.js`.
  - `assets/js/bankDatabases/` — per-country offline bank-name data for the IBAN tool.
- `assets/menu/navigation.js` — single navigation definition shared by all pages (`#navbar-placeholder`).
- `docs/` — Markdown sources of the Help pages (`guidelines.md`, `faq.md`, `customise.md`, `versionhistory.md`). Each has an HTML twin in `pages/` that must stay content-aligned.
- `tools/cc/` — embedded CyberChef build.

## Conventions

- No inline styles or scripts in tool pages; buttons never use `onclick` — always `data-search-id`.
- Element ids follow `[type]-[page]-[name]` (e.g. `btn-names-personadb`); `data-search-id` follows `[page]-[name]`.
- 2-space indentation in HTML/JS; British English in documentation.
- Validate user input via `validators.js` before opening any search URL.

## Versioning

- Bug fixes → patch bump (x.y.Z); new features → minor bump (x.Y.0).
- On every bump: update the README (title, badge, latest-release note), the footer of every HTML page (including `launchme.html`), and add the changelog entry to BOTH `docs/versionhistory.md` and `pages/versionhistory.html` with identical wording.
