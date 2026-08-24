# Ideas & Roadmap

This file collects ideas, source suggestions, and potential improvements to be evaluated for future implementation. Items are added here as they are identified; they are moved to the changelog once implemented.

---

## Pending

### Names Tool

- **Company data (Italy):** add a section or dedicated page to surface company/VAT data. Candidate sources:
  - [atoka.io](https://atoka.io/public/it/azienda/wannawin-srl/c81c1523132c)
  - [informazione-aziende.it](https://www.informazione-aziende.it/Azienda_COLONNA-FRANCESCO-E-MONDELLI-LETIZIA-SNC)

- **US people search — additional sources:** the following sites partially obscure results but may surface useful metadata:
  - [instantcheckmate.com](https://www.instantcheckmate.com)
  - [intelius.com](https://www.intelius.com)

- **Sweden — birthday.se:** date-of-birth lookup by name and city. Example:
  `https://www.birthday.se/Julia-Arnander/Stockholm/1985/f20cd250aa`

### Phone Tools

- **Japan — jpnumber.com:** reverse phone lookup for Japanese numbers. Example:
  `https://www.jpnumber.com/searchnumber.do?number=08021651552`

### Telegram — dedicated page

**Decision:** move Telegram out of `pages/communities.html` into its own
`pages/telegram.html`, listed under *Social Media* in `navigation.js`. Rationale:
`keybase.html` already justifies a dedicated page at 6 buttons and 1 section —
exactly the current size of the Telegram section — and Telegram is the only major
platform missing from the *Social Media* menu. The expansion below would otherwise
take the Telegram section to ~25 buttons inside a page whose other four sections
hold 4–10 each.

Dorks stay out of the new page: they belong in `pages/dorks.html` as a *Telegram*
category, next to the existing *Social Media* templates.

#### Page layout — three input groups

The layout follows the input-type grouping already used by `communities.html`.

**Group 1 — username / channel** (`input-telegram-user`, validator `getAndValidateTgUser`)

| Button | `urlTemplate` | Status |
| --- | --- | --- |
| Profile/Channel | `https://t.me/{username}` | already live |
| Channel Preview | `https://t.me/s/{username}` | already live |
| Telesco.pe | `https://telesco.pe/{username}` | already live |
| Telemetr.io | `https://telemetr.io/en/channels/search?q={username}` | already live |
| Preview History | `https://web.archive.org/web/*/t.me/s/{username}*` | new |
| Link Mentions | `https://www.google.com/search?q=%22t.me%2F{username}%22` | new |

**Group 2 — channel + keyword** (two inputs, new validator `getAndValidateTgChannelQuery`)

This is the highest-value addition and has no equivalent anywhere else in the
toolkit: `https://t.me/s/{username}?q={keyword}` searches *inside* a public
channel, in the browser, with no Telegram account. It also matches file names and
extensions, so it doubles as a document finder within a channel.

The companion `https://t.me/s/{username}?before={message_id}` pages backwards
through history and is the practical way to reach a channel's earliest posts.
The `before=` parameter is confirmed by indexed URLs of the form
`https://t.me/s/tgdatabase?before=338`; the `q=` parameter is documented by
[hatless1der](https://hatless1der.com/telegram-osint-basics-5-tips-anyone-can-do-right-now/)
but could not be probed from the sandbox — verify both in a browser before shipping.

**Group 3 — keyword** (`input-telegram-key`, validator `getAndValidateTgKey`)

| Button | `urlTemplate` | Status |
| --- | --- | --- |
| TGStat | `https://tgstat.com/en/search?q={keyword}` | already live |
| Lyzem | `https://lyzem.com/search?q={keyword}` | already live |
| Telegago | `https://cse.google.com/cse?cx=006368593537057042503:efxu7xprihg&q={keyword}` | new |
| OSINT.ME CSE | `https://cse.google.com/cse?cx=6c3e0c0d3da8e3b4a&q={keyword}` | new |
| Telegraph | `https://www.google.com/search?q=site%3Atelegra.ph+%22{keyword}%22` | new |
| Invite Links | `https://www.google.com/search?q=%22t.me%2Fjoinchat%22+%22{keyword}%22` | new |

Telegago and the OSINT.ME CSE are Google Custom Search Engines restricted to public
Telegram domains; both are cited by
[Bellingcat's toolkit](https://github.com/bellingcat/toolkit/blob/main/gitbook/tools/telegago/README.md),
and both accept a plain `&q=` parameter, so they drop straight into a `urlTemplate`.
They use different indexes and return different results — hence both.

#### Telegram category for `dorks.html`

The mirror and directory hosts are weak as individual buttons but strong as one
index-widening template, so they belong here rather than on the page:

- `site:t.me OR site:telegram.me` — canonical, both domains
- `site:telegra.ph` — Telegraph long-form posts
- `site:tgstat.com OR site:tgstat.ru OR site:telemetr.me OR site:tlgrm.eu OR site:tgramsearch.com OR site:telegramchannels.me OR site:tgchannels.org OR site:tglib.net OR site:telegram.im OR site:nicegram.app` — mirrors and directories
- `site:t.me "joinchat"` — invite links to groups absent from every directory
- `site:t.me intext:"@"` — usernames and handles in bios

Wildcard TLDs (`tgstat.*`, `tlgrm.*`) are unreliable on Google and are expanded
explicitly above; keep the wildcard form only for the Yandex preset.

#### Deliberately excluded

- **TelegramDB** — the search runs through a bot with a credit system, not a URL,
  so there is no `urlTemplate` to write.
- **The long-tail directories** (~60 in
  [Awesome-Telegram-OSINT](https://github.com/ItIsMeCall911/Awesome-Telegram-OSINT))
  — largely Russian- and Chinese-language, of uneven upkeep. The bundle dork above
  covers them without adding 60 buttons to maintain.
- **Lookup bots** (`@userinfobot`, `@creationdatebot`, `@SangMataInfo_bot`,
  `@tgscanrobot`) — need an authenticated client, and several ask for the
  investigator's own phone number. Document them in the Help pages with the OPSEC
  caveat; never as buttons.
- **Nearby/geolocation tools** (Geogramint, telegram-nearby-map, CCTV) — all
  marked non-functional upstream since the Nearby feature changed.

#### Migration checklist

Rename `communities-tg-*` → `telegram-*` per the `[page]-[name]` convention:

- `pages/telegram.html` — new page, standard `data-search-id` route (not an inline
  script, so `scripts/linkcheck/extract-urls.mjs` picks the URLs up automatically)
- `search-library.js` — 6 entries renamed, new ones added
- `janua-search-map.js` — 6 entries, including `page: "Communities"` → `"Telegram"`,
  otherwise the buttons disappear from Janua
- `validators.js` — `input-communities-tgUser`/`tgKey` → `input-telegram-user`/`key`
- `pages/communities.html` — drop the section and its `setInitialPageState` block
- `assets/menu/navigation.js` — one entry under *Social Media*
- `tests/validators.test.js` — `getAndValidateTgUser`/`TgKey` are currently
  untested; add coverage while touching them, plus the new channel+keyword validator

Minor version bump: README, the footer of every HTML page, and the changelog in
both `docs/versionhistory.md` and `pages/versionhistory.html`.

Host liveness for the new third-party hosts is still unverified — the sandbox
network policy rejects them — so confirm in a browser or via `scripts/linkcheck`
before shipping.

### General

- **Additional sources from digitaldigging.org:** review the OSINT resource list at
  `https://digitaldigging.org/osint/` and identify entries not yet covered by the toolkit.

- **Dead-link triage:** manually verify the hosts flagged by the weekly link checker (issue *Weekly link-check report*, label `dead-links`) and replace or remove the tools on confirmed-dead hosts. First run (2026-08-07) flagged 16 non-resolving hosts (20 tool buttons) and 3 hosts with broken TLS.
