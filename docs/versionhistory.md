# Version History

Changelog of all releases and improvements to the Exploratores OSINT Toolkit.

---

## 3.2.0 — 2026

- **New:** Redactor: cryptocurrency address detection — Bitcoin (legacy, P2SH and bech32/segwit-taproot), Ethereum and every EVM chain (`0x…`, also BSC/Polygon/Arbitrum wallets), Monero, Litecoin, Tron, Ripple. Matching is structural (prefix, alphabet, length); checksums are not verified. Solana and other plain-base58 formats without a fixed prefix are omitted by design: they would match too many random tokens.
- **New:** Redactor: national identity and social security numbers for 10+ jurisdictions — US SSN (dashed form), UK National Insurance number (compact and spaced, real restricted alphabet), Spain DNI/NIE (validated against the real check-letter alphabet), France NIR (compact and INSEE-spaced, Corsica 2A/2B included), Switzerland AVS (756 prefix), Romania CNP, Finland HETU, Nordic personal numbers (SE/DK/NO separated form), Czech/Slovak rodné číslo (slash form), Belgium national number (dotted form). Digit-only IDs with no distinctive structure (NL BSN, DE Steuer-ID, PL PESEL, HR OIB, UK NHS) are deliberately excluded and documented as custom-pattern material.
- **New:** Redactor: payment card coverage extended with JCB (3528–3589), Diners Club (300–305/36/38, 4-6-4 grouping) and UnionPay (62, 16–19 digits).
- **Improved:** Redactor: card numbers grouped with hyphens (`4111-1111-1111-1111`) are now detected for Visa, Mastercard, Discover, JCB and UnionPay; IBAN matching accepts lowercase and hyphen-separated forms in addition to compact and spaced.
- **Changed:** docs: the custom-pattern walkthrough example switched from `SSN_US` (now a built-in type) to a `CASE_ID` internal-reference example.

---

## 3.1.7 — 2026

- **Improved:** Redactor: the Redaction Map is now grouped by data family following the pattern order — payment cards first (AMEX, VISA, MASTERCARD, DISCOVER), then Codice Fiscale, VAT codes, email, IBAN, phone numbers, PCN, SE10, and custom patterns last — instead of alphabetically, so related types sit together.
- **Fixed:** Redactor: placeholder numbering now follows reading order — `[TYPE_1]` is always the first occurrence in the text. Previously numbers were assigned during the right-to-left substitution pass, so the last occurrence received `_1`.

---

## 3.1.6 — 2026

- **Security:** all Google Fonts references removed; Inter and Cinzel are now self-hosted in `assets/fonts/` (WOFF2, latin + latin-ext subsets). No third-party request — and therefore no Referer metadata — ever leaves a page, closing the last external dependency on pages that process PII.
- **Security:** Redactor: custom patterns are now screened against catastrophic backtracking (ReDoS): nested-quantifier structures are rejected outright and every new pattern must complete a timed canary run before being accepted.
- **Security:** Redactor: custom patterns loaded from `localStorage` are fully validated (type name, regex source, flags, colour) before use; the Redaction Map and Custom Patterns tables are built with DOM APIs instead of `innerHTML`, removing the structural dependency on manual HTML escaping.
- **Fixed:** Redactor: both CSV FileReaders now report read failures with an alert instead of failing silently.
- **Fixed:** Redactor: Restore CSV now shows the same large-file warning as Redact CSV before processing.
- **Fixed:** Redactor: clipboard copy failures (permission denied, non-HTTPS context) now show "Copy failed" on the button instead of a false "Copied!".
- **Improved:** Redactor: Import Map enforces hard caps (10,000 entries, 10,000 characters per value, 5 MB JSON) and first-mapping-wins conflict resolution when the same original value appears under two placeholders.
- **Improved:** Redactor: "Clear Session" renamed to "Clear Redaction Map"; UI notes clarify that custom patterns — including their type names — persist in `localStorage` and are not touched by the button.
- **Improved:** Redactor: duplicate type names are rejected inside `addCustomPattern` as well as in the UI; type names are restricted to `A–Z 0–9 _`; the CSV line-count warning also counts bare-CR (old Mac) line endings.
- **Chore:** internal working files (`todo/`, `docs/WIP/`, `pages/test/`, local status notes) removed from the repository ahead of public release.

---

## 3.1.5 — 2026

- **New:** Redactor: CSV restore mode added to the Restore section. Upload a previously redacted CSV file, apply the current session map to every cell, and download the result as `restored.csv`. The CSV parser follows RFC 4180 and handles quoted fields, embedded commas, and line breaks inside cells.
- **Improved:** Redactor: section heading and action button renamed from "Censor" / "Censor CSV" to "Redactor" / "Redact CSV" for consistency with the tool name.
- **New:** Help: dedicated guide pages added for the Redactor (`help-redactor.html`) and the IBAN Tool (`help-iban.html`), with step-by-step instructions and screenshots. Both pages are accessible from the Help menu.
- **Fixed:** `validators.js`: four VK element IDs aligned with the vk.html DOM (`getAndValidateVkUsername`, `getAndValidateVkUserId`, `getAndValidateVkTag`, `getAndValidateVkSmat`); the affected buttons read from non-existent inputs and silently failed. *(Shipped between 3.1.1 and 3.1.5 without its own changelog entry; folded into this release.)*
- **Improved:** Redactor: the plain 11-digit `VAT_IT` pattern now validates the office-code block (001–121), sharply reducing false positives on generic 11-digit numbers. *(Folded into this release.)*
- **Improved:** Redactor: text restore rewritten to use a single combined regex, removing the risk of partial placeholder substitution; the Redaction Map table is grouped by type with per-type counts. *(Folded into this release.)*
- **Fixed:** Redactor: Import Map now initialises counters for types never seen in the current session, preventing placeholder collisions after an import. *(Folded into this release.)*
- **Chore:** line endings normalised across 33 files via `.gitattributes` and `git renormalize`. *(Folded into this release.)*

---

## 3.1.1 — 2026

- **Fixed:** `main.js`: validator functions extracted from `ExploratoresValidators` were called without context, losing `this`. Affected buttons: GHunt (email), Tumblr username, SMAT/VK username, NetworksDB range — all silently failed on click. Fixed by calling validators with `.call(ExploratoresValidators, ...)`.
- **Fixed:** `indicator-classifier.js`: COORDINATES regex had a missing decimal point in the longitude group (`(?:\d+)?` instead of `(?:\.\d+)?`). Decimal coordinates such as `40.7128, -74.0060` were never classified as COORDINATES and produced no results in Janua.
- **Fixed:** `search-library.js` (`phoneint-dt-base`): URL template contained `{placeholder}`, which is not a key returned by `getAndValidateIntlPhone`; the button opened a broken URL. Replaced with `{e164}`.
- **Fixed:** `janua-search-map.js`: six entries introduced in 3.1.0 (YachtlyCrew, Hitta, Eniro, Mr Koll, Ratsit, Merinfo) were present in `search-library.js` but missing from `janua-search-map.js`; they never appeared in Janua dispatch results. Entries added.
- **Fixed:** `editorconfig` renamed to `.editorconfig`; without the leading dot, editors and IDEs never loaded the file and the declared rules (LF line endings, UTF-8, 2-space indent) were never applied.
- **Fixed:** Empty artefact files `20` and `p.type` introduced accidentally in a prior commit removed from the repository root.

---

## 3.1.0 — 2026

- **New:** Redactor: PII removal tool for text and CSV files before submission to AI models. Detects Email addresses, Codice Fiscale (IT), VAT/fiscal codes for 30+ countries, payment card numbers (AMEX CM11/CM13/CM15, Visa 13/16-digit, Mastercard Classic 51–55/New 2221–2720, Discover 6011/644–649/65xx — all compact and spaced), IBAN bank account numbers (compact and spaced), Italian mobile phone numbers (prefixes 32x–39x, with optional +39/0039 country code, compact and grouped), PCN codes (17+ digits), and SE10 merchant codes; replaces them with numbered placeholders (`[TYPE_N]`). Includes Copy/Import Map for cross-session persistence, Custom Patterns (user-defined regex with localStorage), large-input warning (>20,000 lines), and a Restore function. All processing is local; no data transmitted. Added to the Tools menu.
- **Improved:** Guidelines: "Criminal Intelligence: Manual for Analysts" (UNODC, Atkin 2011) added to Further Reading; books reordered from introductory to specific; likelihood table styled correctly.
- **Fixed:** `main.js`: `getAttribute('data-query-override')` returned `null` (not `undefined`) when attribute absent, causing all single-input validators to fail at click time. Affected: Search Engines, Email, Usernames, Vehicles. Fixed with `hasAttribute` guard.
- **Fixed:** Communities Tool: button selectors used `:nth-of-type` with class, which does not match by class in CSS — buttons never received `text-active` state. Fixed with adjacent-sibling selectors (`+`).
- **Fixed:** X (Twitter) Tools: same `:first-of-type`/`:last-of-type` selector issue in the Web Archives section. Fixed with adjacent-sibling selectors.
- **New:** Names Tool: Sweden added to National Registers with five sources: Hitta.se, Eniro, Mr Koll, Ratsit, and Merinfo. Each uses the verified search URL pattern for that service.
- **New:** Names Tool: YachtlyCrew added to General & Social Presence for searching yacht crew by name.
- **Fixed:** Names Tool: five buttons were incorrectly active without input due to `no_input: true` (Google Maps, Interpol Red Notices, OFAC Sanctions Search, Canada411, Search Systems). Flag removed; buttons now require name input.
- **Fixed:** Names Tool: Google Maps URL template contained the literal string `FULL_NAME_ENC` instead of the `{fullname}` placeholder; search never worked. Corrected.
- **Improved:** Names Tool: Canada411 URL updated to embed first and last name in the search query parameters instead of linking to the generic address page.
- **New:** IBAN Tool: added offline bank name resolution for 8 new countries: Albania (AL), Croatia (HR), Cyprus (CY), Greece (GR), Malta (MT), Montenegro (ME), Slovenia (SI), Turkey (TR). Coverage table updated accordingly.
- **Improved:** IBAN bank databases: all 8 new country databases replaced with data sourced from official registers: Slovenia from Banka Slovenije (bsi.si); Croatia from HNB VBDI register; Montenegro from Erste Bank Montenegro IBAN calculator; Turkey from AFAD official donation IBANs; Greece from Hellenic Bank Association HEBIC index and bank websites; Cyprus from Central Bank of Cyprus IBAN register; Albania (1 entry confirmed from Raiffeisen Bank Albania). Coverage table updated with accurate entry counts and quality ratings.

---

## 3.0 — 2026

- **New:** Navigation: dedicated *Help* menu (Guidelines, FAQ, Customise, Version History); *Tools* now contains CyberChef only.
- **Improved:** CyberChef updated to v10.22.1.
- **New:** IBAN Checker: Bing, Yandex, and Baidu search buttons added.
- **New:** Phone International: dial code normalisation: `0039` / `+39` / spaces all converted to E.164 automatically.
- **Improved:** IBAN page: external OSINT search merged into IBAN Checker section; auto-verify on input (no button needed); inline validation feedback on same line as input.
- **Improved:** Phone International: libphonenumber-js updated to latest; Truecaller URL now uses lowercase ISO code.
- **Improved:** `validators.js`: `getAndValidateIban` function added; `getAndValidateIntlPhone` enhanced with normalisation and conditional guards.
- **Improved:** `search-library.js`: IBAN Bing/Yandex/Baidu entries added; Truecaller template corrected to `{country_iso_lower}`.
- **Fixed:** IBAN search buttons never worked (validator function was missing).
- **Fixed:** Phone buttons always enabled regardless of input validity.
- **Fixed:** Phone intel display was always empty (`validationResult.data` was passed incorrectly).
- **Fixed:** Truecaller generated uppercase ISO in URL (e.g. `/IT/` instead of `/it/`).
- **Fixed:** US Phone: `updatePageState` did not unwrap the validator result object; buttons were never disabled and phone intel always showed an error.
- **Improved:** IBAN page: replaced IBAN.com with IBAN Calculator; removed broken SWIFT Search; buttons centred on page.
- **Improved:** OSINT language review: standardised register across all pages: replaced "Insert" with "Enter", removed "Please" softeners, fixed informal abbreviations (FB→Facebook, IG→Instagram), corrected "For proper function" phrasing, translated Italian headings in Search Engines, updated page titles for consistency, and adopted British English throughout.
- **Improved:** README: removed marketing emoji from headers; fixed numbered list; tightened credits phrasing.
- **Improved:** FAQ/Guidelines/Customise: tightened informal language ("side project"→"voluntary basis", "bulwark"→"safeguard", "Mindful"→"Disciplined Online Conduct"); standardised person/voice.
- **Improved:** Social media pages: clarified ambiguous labels ("Outgoing"→"Outgoing Mentions"), renamed headings for precision ("Virtual Currencies"→"Cryptocurrency Analysis", "Other Reverse Image Search"→"Video Thumbnail & Image Reverse Search").
- **Fixed:** Dorks page footer showed 3.0α instead of 3.0β; "VirusTotal" brand name corrected in Domains page.
- **Fixed:** VK page: moved "WORK IN PROGRESS" from h1 tag to proper NOTE banner.
- **New:** Phone International: Tellows reputation lookup added.
- **Fixed:** Search Engines: `updatePageState` did not unwrap the validator result object; buttons appeared active regardless of input.
- **Fixed:** Names: same validator unwrap bug; buttons were never properly disabled.
- **Improved:** IBAN page: NOTE label standardised to match the pattern used across all other pages.

---

## 3.0α — 2025

- **New:** Platform-specific URL parsing (VK, X/Twitter, Instagram, Telegram, Facebook, LinkedIn).
- **New:** IBAN: multi-country BBAN parser for 11 countries (IT, DE, FR, ES, GB, NL, BE, PT, AT, CH, PL).
- **New:** IBAN: local bank name databases for 10 countries (`assets/js/bankDatabases/`), resolving bank names entirely offline.
- **New:** IBAN: Local Database Coverage note with per-country bank count, coverage status, and update date.
- **New:** Toolkit Search: two-column scrollable layout (Function / Page) with sticky header and live result counter.
- **New:** Guidelines page added to the Tools menu and to `launchme.html`.
- **Improved:** `validators.js`: full refactor with consistent return structure and broader coverage.
- **Improved:** `search-library.js`: added IBAN search entries (Google, SWIFT, iban.com) and VK profile info.
- **Improved:** Navigation menu: CyberChef moved to first position; FAQ before Customise; Version History link added to How to Start.
- **Improved:** Navigation menu: fixed case-sensitive links for `guidelines.html` and `publiccompanyrecords.html`.
- **Improved:** All HTML files renamed to lowercase to enforce naming convention.
- **Improved:** FAQ: restructured into 7 logical sections with nested Table of Contents; new entry on updating IBAN bank databases.
- **Fixed:** Broken links across all pages resolved.
- **Fixed:** Missing CSS imports corrected.
- **Fixed:** Corrupted character in `guidelines.html` ("When" section).
- **Fixed:** Stale reference to `gemini.md` removed from `customise.html`.

---

## 2.6 — 2025

- **Fixed:** Broken links across all pages.
- **Fixed:** Missing CSS assets corrected.
- **Improved:** Version string consistency enforced across all 30+ pages.
- **Improved:** Documentation pages (`faq.md`, `customise.md`) updated.
- **Improved:** `assets/css/style.css`: minor layout fixes.
- **Improved:** `assets/menu/navigation.js`: link corrections.

---

## 2.5 — 2025

- **New:** Centralised architecture introduced: `main.js`, `validators.js`, `search-library.js` replace all inline `onclick` logic.
- **New:** `search-library.js` as centralised catalog of all search configurations (URL templates + validators).
- **New:** `validators.js` as shared validation library used across all pages.
- **New:** `config.js`: Light Version support: hide/show UI elements per-user via configuration.
- **New:** Pages: VK, IBAN (refactored), Search Engines (updated).
- **Improved:** Navigation bar via `navigation.js`: single definition, path-aware links.
- **Improved:** IBAN page: centralised search logic, cleaner layout.
- **Improved:** `launchme.html`: search function added.
- **Improved:** Separation of concerns enforced: no inline styles or scripts in HTML.

---

## 1.0 — Initial Release

- **New:** Initial release of the Exploratores OSINT Toolkit.
- **New:** Core pages: Names, Email, IP, Domains, Maps, Addresses, Images, Videos, Documents, Vehicles, Usernames, Phone (US & International), Social Media (Facebook, Instagram, X, LinkedIn, VK, Keybase), Virtual Currencies, Company Public Records, IBAN, CyberChef integration.
- **New:** Navigation menu via `navigation.js`.
- **New:** Guidelines, FAQ, License, Customise documentation pages.
