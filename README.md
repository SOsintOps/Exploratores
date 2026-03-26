# Exploratores OSINT Toolkit 3.0β

![Exploratores Toolkit Logo](assets/images/exploratores.jpg)

[GitHub Repository](https://github.com/SOsintOps/Exploratores)

**Exploratores** is a modular and responsive OSINT toolkit designed to support investigative workflows. Version 3.0β introduces multi-country IBAN analysis, a redesigned Toolkit Search, a fully data-driven JavaScript architecture, and enhanced phone number normalization.

---

## ✨ Key Features

- ✅ Clean and fully responsive layout with semantic HTML5.
- ✅ No server or backend dependencies required.
- ✅ Fully functional offline via `file://` protocol; external tools require internet.
- ✅ Centralized, data-driven JavaScript architecture (`main.js`, `validators.js`, `search-library.js`).
- ✅ Dynamically loaded navigation bar for easy site-wide updates.
- ✅ Modular pages with scoped focus (Names, Phones, Domains, IBAN, etc.).
- ✅ Toolkit Search with two-column scrollable results and live counter.
- ✅ Multi-country IBAN verifier with offline bank name resolution for 11 countries.

---

![version](https://img.shields.io/badge/version-3.0β-blue)

## 🔧 Requirements

- Any modern web browser (Chrome, Edge, Brave).
- No server or backend required to run the toolkit.
- **Internet access is mandatory** for the external search features to work.

## 📦 Installation

1. Clone or download the repository.
   ```bash
   git clone https://github.com/SOsintOps/Exploratores.git
   ```
2. Open **`launchme.html`** in your browser.
3. Start using the toolkit.

## 📂 Toolkit Sections

The toolkit is organized into the following sections, accessible from the main navigation menu:

* **Search Engines**: Clear Web and Tor search capabilities.
* **People & Identities**: Tools for investigating names, phone numbers, addresses, and more.
* **Social Media**: Search functions for major platforms (X/Twitter, Facebook, Instagram, LinkedIn, VK, Telegram).
* **Websites**: Tools for domain and IP address analysis.
* **GeoInt**: Mapping and geolocation tools.
* **Media Analysis**: Image, video, and document analysis tools.
* **Company & Finance**: Corporate records, virtual currencies, IBAN verification.
* **Tools**: CyberChef.
* **Help**: Guidelines, FAQ, Customise, Version History.

---

## 📚 Documentation

Detailed documentation is available directly in the toolkit under the **Help** menu:

* [Guidelines](pages/guidelines.html) — analytic standards, 5W1H framework, OPSEC best practices.
* [FAQ](pages/faq.html) — frequently asked questions, architecture overview, troubleshooting.
* [Customise](pages/customise.html) — guide to extending and customising the toolkit.
* [Version History](pages/versionhistory.html) — full changelog.

The `docs/` directory contains the Markdown source for [Guidelines](docs/guidelines.md), [FAQ](docs/faq.md), and [Customise](docs/customise.md).

---

## 🧭 How to Use Exploratores

1. Open **`launchme.html`** in a web browser.
2. Navigate to a specific section via the navigation bar.
4. Enter your search terms in the input fields and click the search buttons.
5. Some tools may require you to be logged into the respective service.
6. Always apply OPSEC principles while conducting investigations.

---

## 📚 References

- Community feedback from OSINT & Cybercrime analysts
- *Deep Dive: A Guide to Advanced Open Source Intelligence*
- *ICD 203: Analytic Standards*
- *Open Source Intelligence Techniques* by Michael Bazzell
- *Psychology of Intelligence Analysis* by Richards J. Heuer Jr.

---

## 🛠️ Credits

Project developed and maintained by Ramingo.
For contributions, suggestions, or bug reports, please open an issue or contact directly.
