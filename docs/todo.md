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

- **Host liveness:** the third-party hosts added in 3.5.0 could not be probed from
  the CI sandbox (the network policy rejects them). The `t.me/s/<channel>?q=`
  parameter in particular is documented rather than verified — confirm it in a
  browser, and let `scripts/linkcheck` classify the rest.

- **Deliberately not added:** TelegramDB (bot with a credit system, no URL to
  template), the ~60 long-tail directories of Awesome-Telegram-OSINT (covered
  collectively by the Dork Builder bundle) and the Nearby-based geolocation tools
  (Geogramint, telegram-nearby-map, CCTV), all non-functional upstream.

### General

- **Additional sources from digitaldigging.org:** review the OSINT resource list at
  `https://digitaldigging.org/osint/` and identify entries not yet covered by the toolkit.

- **Dead-link triage:** manually verify the hosts flagged by the weekly link checker (issue *Weekly link-check report*, label `dead-links`) and replace or remove the tools on confirmed-dead hosts. First run (2026-08-07) flagged 16 non-resolving hosts (20 tool buttons) and 3 hosts with broken TLS.
