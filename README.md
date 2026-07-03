# Exploratores OSINT Toolkit 3.4.1

![Exploratores Toolkit Logo](assets/images/exploratores.jpg)

[GitHub Repository](https://github.com/SOsintOps/Exploratores)

![version](https://img.shields.io/badge/version-3.4.1-blue)

**Exploratores** is a modular and responsive OSINT toolkit designed to support investigative workflows: curated search tools for people, domains, images, social platforms and more, plus built-in utilities such as the Redactor (browser-side PII removal), multi-country IBAN analysis and an embedded CyberChef.

Version 3.4.1 realigns the documentation with the codebase (FAQ, Customise, Version History), fixes a dead external link and unifies the layout of the help pages. See the full [version history](docs/versionhistory.md) for previous releases.

---

## Key Features

- Fully responsive layout built with semantic HTML5.
- No server or backend dependencies required.
- Centralised JavaScript architecture.
- Modular pages with scoped focus (Names, Phones, Domains, IBAN, etc.).
- Multi-country IBAN verifier with offline bank name resolution for 11 countries.
- Redactor: browser-side PII removal and restoration with numbered placeholders, exportable Redaction Map, CSV support and user-defined custom patterns — designed for safely submitting case text to external AI models.
- Embedded CyberChef (v11.2.0) for local data conversion, decoding and analysis.

---

## Requirements

- Any modern web browser (Chrome, Edge, Brave).
- No server or backend required to run the toolkit.
- **Internet access is mandatory** for the external search features to work.
- The use of a VPN is recommended while conducting investigations, to protect your identity and location.

## Installation

1. Clone or download the repository.
   ```bash
   git clone https://github.com/SOsintOps/Exploratores.git
   ```
2. Open **`launchme.html`** in your browser.

## Toolkit Sections

The toolkit is organised into the following sections, accessible from the main navigation menu:

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
- *Deep Dive: A Guide to Advanced Open Source Intelligence* by Rae L. Baker — [Wiley](https://www.wiley.com/en-us/Deep+Dive%3A+Exploring+the+Real+World+Value+of+Open+Source+Intelligence-p-9781119933243) | [Amazon](https://www.amazon.com/dp/1119933242)
- *ICD 203: Analytic Standards* — [free PDF (ODNI)](https://www.dni.gov/files/documents/ICD/ICD%20203%20Analytic%20Standards.pdf)
- *Open Source Intelligence Techniques* by Michael Bazzell — [IntelTechniques](https://inteltechniques.com/book1.html)
- *Psychology of Intelligence Analysis* by Richards J. Heuer Jr. — [free PDF (CIA CSI)](https://www.cia.gov/resources/csi/books-monographs/psychology-of-intelligence-analysis-2/)

---

## Credits

Project developed and maintained by Ramingo.
To report issues or propose enhancements, open an issue on the GitHub repository.
