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

### General

- **Additional sources from digitaldigging.org:** review the OSINT resource list at
  `https://digitaldigging.org/osint/` and identify entries not yet covered by the toolkit.

- **Dead-link triage:** manually verify the hosts flagged by the weekly link checker (issue *Weekly link-check report*, label `dead-links`) and replace or remove the tools on confirmed-dead hosts. First run (2026-08-07) flagged 16 non-resolving hosts (20 tool buttons) and 3 hosts with broken TLS.

