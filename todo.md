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

---

## Completed

| Item | Version |
|------|---------|
| Button activation bug across all pages (main.js null/undefined on `getAttribute`) | 3.1.0 |
| Search Engines buttons non-functional | 3.1.0 |
| Usernames Tool buttons non-functional | 3.1.0 |
| Email Tool buttons non-functional | 3.1.0 |
| Vehicles Tool VIN Finder buttons non-functional | 3.1.0 |
| Communities Tool buttons never activated | 3.1.0 |
| X (Twitter) Tools — Web Archives buttons never activated | 3.1.0 |
| International Phone: normalise `0039` / `+39` / spaces to E.164 | 3.0 |
| IBAN bank databases: Albania, Croatia, Cyprus, Greece, Malta, Montenegro, Slovenia, Turkey | 3.1.0 |
| Names Tool — Sweden: Hitta.se, Eniro, Mr Koll, Ratsit, Merinfo | 3.1.0 |
| Names Tool — YachtlyCrew (General & Social Presence) | 3.1.0 |
| Names Tool — fix `no_input` on Google Maps, Interpol, OFAC, Canada411, Search Systems | 3.1.0 |
| Names Tool — Google Maps URL template broken (`FULL_NAME_ENC` literal) | 3.1.0 |
| Names Tool — Canada411 URL now embeds name in search parameters | 3.1.0 |
