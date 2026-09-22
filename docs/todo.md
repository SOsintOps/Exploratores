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

### Telegram Tool

The dedicated page shipped in 3.5.0. Still open:

- **Technique notes for the Help pages:** forwarded-message headers identify the
  originating channel, the forwarding graph maps affiliated channels, and any
  selector recovered from a channel (e-mail, phone, domain, wallet) can be pivoted
  into the other Exploratores pages.

- **Lookup bots, documentation only:** `@userinfobot` (username → numeric ID),
  `@creationdatebot` (approximate account creation date), `@SangMataInfo_bot`
  (username history), `@tgscanrobot` (group membership). These need an
  authenticated client and several ask for the investigator's own phone number, so
  they belong in the FAQ with that OPSEC caveat — never as buttons.

- **Host liveness:** the third-party hosts added in 3.5.0 have not yet been probed;
  let `scripts/linkcheck` classify them. The two `t.me/s/<channel>` parameters are no longer in doubt:
  both `?q=` and `?before=` were confirmed in a browser on 2026-08-24.

- **Deliberately not added:** TelegramDB (bot with a credit system, no URL to
  template), the ~60 long-tail directories of Awesome-Telegram-OSINT (covered
  collectively by the Dork Builder bundle) and the Nearby-based geolocation tools
  (Geogramint, telegram-nearby-map, CCTV), all non-functional upstream.

### Country Sources

Country-specific registries and lookups are being added one nation at a time, as sections inside the existing thematic pages (Names → National Registers, Company Public Records, Maps, Vehicles, Domains → ccTLD WHOIS, International Phones). Planned order: Italy, then Europe (France, Netherlands, Poland, Estonia, Latvia, Lithuania, Bulgaria, Switzerland, United Kingdom; Germany and Spain once a curated source exists), Russia, China (with Taiwan and Hong Kong), then the Middle East (Iran, Iraq, Israel, Saudi Arabia, Syria, United Arab Emirates).

Reference directories, in order of trust:

- [OSINT for countries V2.0 (Provereno Media)](https://github.com/Provereno-Media/OSINT-for-countries-V2.0) — GPL-3.0, hand-curated, 33 countries, one repository per country with seven standard categories (open data, legal entities, maps and cadastre, vehicles, people, procurement, WHOIS). Primary source. The original index at [paulpogoda/OSINT-for-countries-V2.0](https://github.com/paulpogoda/OSINT-for-countries-V2.0) points there.
- [OSINT-for-countries organisation](https://github.com/OSINT-for-countries) — one `OSINT_in_<Country>` repository for nearly every country. Content is AI-generated (per its own profile), unlicensed and contains visible errors: candidate list only, every URL is verified before use.
- [wddadk/OSINT-for-countries](https://github.com/wddadk/OSINT-for-countries) — an index of indexes covering all UN member states; each country section links other directories (OSINT Guru, cyberint.uk, start.me pages, OCCRP, SAWEST, third-party GitHub repositories). Used to discover sources the two above miss.

Rules: every URL is opened in a browser before entering the catalogue; search endpoints with a query parameter become buttons with a validator, portals that only offer a form or a login become `no_input` links; paid or registration-only services are noted in the button title; discarded candidates are listed here with the reason.

### General

- **Additional sources from digitaldigging.org:** review the OSINT resource list at
  `https://digitaldigging.org/osint/` and identify entries not yet covered by the toolkit.

- **Dead-link triage:** since 3.6.0 the weekly run proposes the `disabled` flags itself through the `auto/disable-dead-links` pull request; what remains manual is reviewing that pull request and replacing or removing the tools on confirmed-dead hosts (issue *Weekly link-check report*, label `dead-links`). First run (2026-08-07) flagged 16 non-resolving hosts (20 tool buttons) and 3 hosts with broken TLS.
