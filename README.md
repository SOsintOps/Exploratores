# Exploratores OSINT Toolkit 3.3.0

![Exploratores Toolkit Logo](assets/images/exploratores.jpg)

[GitHub Repository](https://github.com/SOsintOps/Exploratores)

![version](https://img.shields.io/badge/version-3.3.0-blue)

**Exploratores** is a modular and responsive OSINT toolkit designed to support investigative workflows. Version 3.3.0 updates the embedded CyberChef to v11.2.0. Version 3.2.0 greatly extends Redactor detection: cryptocurrency addresses (Bitcoin, Ethereum/EVM, Monero, Litecoin, Tron, Ripple), national identity and social security numbers for 10+ jurisdictions (US SSN, UK NINO, ES DNI/NIE, FR NIR, CH AVS, RO CNP, FI HETU, Nordic personal numbers, CZ/SK rodné číslo, BE national number), three more card networks (JCB, Diners Club, UnionPay), and hyphenated/lowercase card and IBAN forms. Version 3.1.7 groups the Redaction Map by data family (payment cards first, then fiscal codes, email, IBAN, phone) and makes placeholder numbering follow reading order. Version 3.1.6 is a security and hardening release: all fonts are now self-hosted (no third-party requests leave any page), and the Redactor gains ReDoS protection for custom patterns, stricter input validation, and explicit error reporting for file and clipboard operations. Version 3.1.5 adds CSV restore to the Redactor, renames the Censor section to Redactor, and introduces dedicated help pages for the Redactor and IBAN tools. Version 3.1.1 was a patch release fixing four bugs identified in 3.1.0. Version 3.1.0 added the Redactor tool for browser-side PII removal before LLM submission, and official bank databases for 8 new IBAN countries. Version 3.0 introduced multi-country IBAN analysis, a redesigned Toolkit Search, a centralised JavaScript architecture, and enhanced phone number normalization.

---

## Key Features

- Fully responsive layout built with semantic HTML5.
- No server or backend dependencies required.
- Fully functional offline via `file://` protocol; external tools require internet.
- Centralised JavaScript architecture (`main.js`, `validators.js`, `search-library.js`).
- Navigation bar defined once, shared across all pages.
- Modular pages with scoped focus (Names, Phones, Domains, IBAN, etc.).
- Toolkit Search with two-column scrollable results and live counter.
- Multi-country IBAN verifier with offline bank name resolution for 11 countries.

---



## Requirements

- Any modern web browser (Chrome, Edge, Brave).
- No server or backend required to run the toolkit.
- **Internet access is mandatory** for the external search features to work.

## Installation

1. Clone or download the repository.
   ```bash
   git clone https://github.com/SOsintOps/Exploratores.git
   ```
2. Open **`launchme.html`** in your browser.
3. Begin your investigation by selecting a section from the navigation menu.

## Toolkit Sections

The toolkit is organized into the following sections, accessible from the main navigation menu:

* **Search Engines**: Clear Web and Tor search capabilities.
* **People & Identities**: Tools for investigating names, phone numbers, addresses, and more.
* **Social Media**: Search functions for major platforms (X/Twitter, Facebook, Instagram, LinkedIn, VK, Telegram).
* **Websites**: Tools for domain and IP address analysis.
* **GeoInt**: Mapping and geolocation tools.
* **Media Analysis**: Image, video, and document analysis tools.
* **Company & Finance**: Corporate records, virtual currencies, IBAN verification.
* **Tools**: CyberChef, Redactor (browser-side PII removal and restoration).
* **Help**: Guidelines, FAQ, Customise, Version History.

---

## Documentation

Detailed documentation is available directly in the toolkit under the **Help** menu:

* [Guidelines](docs/guidelines.md): analytic standards, 5W1H method, OPSEC best practices.
* [FAQ](docs/faq.md): frequently asked questions, architecture overview, troubleshooting.
* [Customise](docs/customise.md): guide to extending and customising the toolkit.
* [Version History](docs/versionhistory.md): full changelog.
* [Ideas & Roadmap](docs/todo.md): ideas and sources under consideration for future implementation.

The `docs/` directory contains the Markdown source for [Guidelines](docs/guidelines.md), [FAQ](docs/faq.md), and [Customise](docs/customise.md).

---

## How to Use Exploratores

1. Open **`launchme.html`** in a web browser.
2. Navigate to a specific section via the navigation bar.
3. Enter your search terms in the input fields and click the search buttons.
4. Some tools may require you to be logged into the respective service.
5. Always apply OPSEC principles while conducting investigations.

---

## References

- Community feedback from OSINT & Cybercrime analysts
- *Deep Dive: A Guide to Advanced Open Source Intelligence* by Rae L. Baker
- *ICD 203: Analytic Standards*
- *Open Source Intelligence Techniques* by Michael Bazzell
- *Psychology of Intelligence Analysis* by Richards J. Heuer Jr.

---

## Credits

Project developed and maintained by Ramingo.
To report issues or propose enhancements, open an issue on the GitHub repository.
