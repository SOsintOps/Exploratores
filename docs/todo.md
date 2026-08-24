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

### Communities Tool — Telegram search expansion

The Telegram section of `pages/communities.html` currently exposes six buttons
(`t.me` profile, `t.me/s` preview, Telesco.pe, Telemetr.io, TGStat group search,
Lyzem channel search). Three strands are worth evaluating.

**1. Site-operator dorks beyond `site:t.me`**

A large share of Telegram content is indexed by general search engines through
mirrors, previews and directory sites rather than through `t.me` itself. Adding a
Telegram category to the dork templates of `pages/dorks.html` — and/or a keyword
button group on the Telegram section of `communities.html` — would cover:

| Operator | What it surfaces |
| --- | --- |
| `site:telegra.ph` | Telegraph long-form posts, frequently used by channels for articles and dumps |
| `site:telegram.org` | Official site, blog and API/docs pages |
| `site:nicegram.app` | Third-party web previews of channels and posts |
| `site:telegram.im` | Channel/user mirror |
| `site:tgstat.*` | TGStat catalogue and statistics (`.com`, `.ru`) |
| `site:telemetr.me` | Channel analytics and rankings |
| `site:telega.in` | Ad-exchange listings for channels |
| `site:telega.io` | Ad-exchange listings and channel catalogue |
| `site:tlgrm.*` | Channel directory (`.ru`, `.eu`) |
| `site:tgramsearch.com` | Channel/group search index |
| `site:telegramchannels.me` | Channel directory |
| `site:tgchannels.org` | Channel directory |
| `site:tglib.net` | Channel library |

Also worth including in the same block: `site:telegram.me` (the legacy alias of
`t.me`) and the invite-link pattern `"t.me/joinchat" "<keyword>"`, which surfaces
groups that never appear in directories.

Points to settle before implementing:

- Wildcard TLDs (`tgstat.*`, `tlgrm.*`) are handled inconsistently across engines.
  Yandex tolerates them; Google's support is unreliable. Either expand them into
  explicit alternatives (`site:tgstat.com OR site:tgstat.ru`) or restrict the
  wildcard variants to the engines that honour them.
- The dork generator of `dorks.html` builds a single `site:` term; multi-site
  templates need the `OR` form already used by the *All Social* and
  *Company Filings* templates.
- Several of these hosts are Russian-language and were unreachable from the CI
  sandbox (the network policy returns 403 for them), so liveness could not be
  confirmed here. Verify each host manually, or let `scripts/linkcheck` classify
  them, before turning any of them into a button.

**2. Additional dedicated Telegram sources**

Cross-checked against the two most complete public compilations,
[Awesome-Telegram-OSINT](https://github.com/ItIsMeCall911/Awesome-Telegram-OSINT)
and [The-Osint-Toolbox/Telegram-OSINT](https://github.com/The-Osint-Toolbox/Telegram-OSINT),
the following are not yet covered by the toolkit:

- **Search engines:** [Telegago](https://cse.google.com/cse?cx=006368593537057042503:efxu7xprihg)
  (Google CSE restricted to public Telegram content),
  [Intelligence X](https://intelx.io/tools?tab=telegram),
  [BUZZ.IM](https://search.buzz.im), [Telegram Search Engine](https://xtea.io/ts_en.html).
- **Directories:** [TelegramDB](https://telegramdb.org),
  [TelegramCatalog](https://telegramcatalog.com/en/channels),
  [Combot](https://combot.org/telegram/top/groups),
  [tgdr.io](https://tgdr.io), [tdirectory.me](https://tdirectory.me).
- **Archives:** the Wayback Machine holds historical snapshots of `t.me/s/<channel>`
  preview pages, which is the only practical way to recover deleted posts —
  a "Wayback channel preview" button would reuse the existing `getAndValidateTgUser`
  validator.
- **Bots (documentation only, not buttons):** `@userinfobot` (username → numeric ID),
  `@creationdatebot` (approximate account creation date),
  `@SangMataInfo_bot` (username history). These require an authenticated Telegram
  client, so they belong in the FAQ/guidelines rather than in the search library.

**3. Technique notes for the Help pages**

Worth documenting alongside the tools: forwarded-message headers identify the
originating channel, the forwarding graph maps affiliated channels, and any
selector recovered from a channel (e-mail, phone, domain, wallet) can be pivoted
into the other Exploratores pages. Only public content should be collected;
joining private groups under a pretext is out of scope for the toolkit.

### General

- **Additional sources from digitaldigging.org:** review the OSINT resource list at
  `https://digitaldigging.org/osint/` and identify entries not yet covered by the toolkit.

- **Dead-link triage:** manually verify the hosts flagged by the weekly link checker (issue *Weekly link-check report*, label `dead-links`) and replace or remove the tools on confirmed-dead hosts. First run (2026-08-07) flagged 16 non-resolving hosts (20 tool buttons) and 3 hosts with broken TLS.
