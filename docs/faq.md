# Frequently Asked Questions (FAQ)

Frequently asked questions about the toolkit — usage, architecture, and troubleshooting.

## Table of Contents

* [Why is the toolkit named "Exploratores"?](#why-is-the-toolkit-named-exploratores)
* [Who were the "Exploratores" historically?](#who-were-the-exploratores-historically)
* [What is the main purpose of the Exploratores OSINT Toolkit?](#what-is-the-main-purpose-of-the-exploratores-osint-toolkit)
* [What inspired the creation of the toolkit?](#what-inspired-the-creation-of-the-toolkit)
* [Can I use the Exploratores OSINT Toolkit outside of my team?](#can-i-use-the-exploratores-osint-toolkit-outside-of-my-team)
* [Is the Exploratores OSINT Toolkit covered by any warranty?](#is-the-exploratores-osint-toolkit-covered-by-any-warranty)
* [Are there any guarantees regarding the accuracy or reliability of the tools and results?](#are-there-any-guarantees-regarding-the-accuracy-or-reliability-of-the-tools-and-results)
* [Am I responsible for validating information found using the toolkit?](#am-i-responsible-for-validating-information-found-using-the-toolkit)
* [Where can I find resources to learn more about OSINT?](#where-can-i-find-resources-to-learn-more-about-osint)
* [What are some basic OPSEC best practices when using this toolkit?](#what-are-some-basic-opsec-best-practices-when-using-this-toolkit)
* [What are the ethical guidelines for using these tools?](#what-are-the-ethical-guidelines-for-using-these-tools)
* [Do I need to install additional software to use the toolkit?](#do-i-need-to-install-additional-software-to-use-the-toolkit)
* [Are my search activities tracked by the toolkit?](#are-my-search-activities-tracked-by-the-toolkit)
* [Do the external services I search know that I am using Exploratores?](#do-the-external-services-i-search-know-that-i-am-using-exploratores)
* [Is it necessary to create dedicated investigative accounts for using some of these tools?](#is-it-necessary-to-create-dedicated-investigative-accounts-for-using-some-of-these-tools)
* [Can the Exploratores OSINT Toolkit pages be customised?](#can-the-exploratores-osint-toolkit-pages-be-customised)
* [How is the maintenance of tools within the toolkit handled?](#how-is-the-maintenance-of-tools-within-the-toolkit-handled)
* [How can I suggest new tools or improvements?](#how-can-i-suggest-new-tools-or-improvements)
* [What is the recommended workflow for contributing a new page?](#what-is-the-recommended-workflow-for-contributing-a-new-page)
* [How can I create a new page or add features using a prompt for an LLM?](#how-can-i-create-a-new-page-or-add-features-using-a-prompt-for-an-llm)
* [Can you provide an example prompt for an LLM to create a basic Exploratores page template from scratch?](#can-you-provide-an-example-prompt-for-an-llm-to-create-a-basic-exploratores-page-template-from-scratch)
* [Were any Large Language Models (LLMs) unduly stressed during the creation of this toolkit?](#were-any-large-language-models-llms-unduly-stressed-during-the-creation-of-this-toolkit)
* [What is the logic behind the new centralised architecture?](#what-is-the-logic-behind-the-new-centralised-architecture)
* [How does the page state management (`updatePageState`) work?](#how-does-the-page-state-management-updatepagestate-work)
* [What are the steps to add a new search button?](#what-are-the-steps-to-add-a-new-search-button)
* [What should I check if a button click does nothing?](#what-should-i-check-if-a-button-click-does-nothing)
* [How do I update the IBAN bank databases?](#how-do-i-update-the-iban-bank-databases)
* [What is the "Light Version" for?](#what-is-the-light-version-for)
* [What is the Redactor tool and how does it work?](#what-is-the-redactor-tool-and-how-does-it-work)
* [What is the Redact → LLM → Restore workflow?](#what-is-the-redact--llm--restore-workflow)
* [How do I add custom detection patterns to the Redactor?](#how-do-i-add-custom-detection-patterns-to-the-redactor)

## About the Toolkit & Its Name

### Why is the toolkit named "Exploratores"?

"Exploratores" were the scouts or reconnaissance units in the Roman army, tasked with gathering intelligence about the terrain, enemy movements, and local resources ahead of the main legionary force. This toolkit is named in their spirit, aiming to provide modern digital "scouts" (OSINT practitioners) with the tools to explore the digital landscape and gather information effectively.

### Who were the "Exploratores" historically?

In ancient Rome, "Exploratores" were soldiers specifically chosen for their skills in reconnaissance, observation, and survival. They often operated in small groups, deep in potentially hostile territory, to provide crucial intelligence for military commanders, enabling informed strategic decisions. Their role was vital for the safety and success of military campaigns.

### What is the main purpose of the Exploratores OSINT Toolkit?

The Exploratores OSINT Toolkit aims to consolidate and organise a wide range of OSINT (Open Source Intelligence) tools and resources to facilitate investigation and information gathering activities. It provides a centralised access point and a consistent structure for these tools.

### What inspired the creation of the toolkit?

The idea of collecting OSINT search tools into a set of local, browser-based pages was inspired by the approach described in Michael Bazzell's book *Open Source Intelligence Techniques* (see [Further Reading](#where-can-i-find-resources-to-learn-more-about-osint)). The Exploratores codebase — the centralised architecture, search library, validators, and every tool page — is an original implementation developed for this project.

## Usage & Authorisation

### Can I use the Exploratores OSINT Toolkit outside of my team?

Yes. You can distribute, share, and customise Exploratores as needed. However, you will be responsible for any unapproved purposes or inappropriate use of this tool.

### Is the Exploratores OSINT Toolkit covered by any warranty?

No, the Exploratores OSINT Toolkit is provided "as is," without any warranty of any kind, either expressed or implied. This includes, but is not limited to, warranties of merchantability or fitness for a particular purpose.

### Are there any guarantees regarding the accuracy or reliability of the tools and results?

No guarantees are provided regarding the accuracy, completeness, reliability, or timeliness of the information obtained through the tools accessible via the toolkit. Each external tool has its own terms of service and limitations. The analyst is fully responsible for independently verifying and validating all collected information before using it for any purpose.

### Am I responsible for validating information found using the toolkit?

Yes. The Exploratores OSINT Toolkit provides access to various tools and external resources. However, any information, data, or "news" obtained through these tools must be critically evaluated and independently validated by you, the analyst, before being considered reliable or actionable. The toolkit itself does not verify the accuracy or truthfulness of the data retrieved from external sources.

## Learning & Best Practices

### Where can I find resources to learn more about OSINT?

The following texts are recommended as foundational references for OSINT practitioners and intelligence analysts:

*   ***Deep Dive: A Guide to Advanced Open Source Intelligence*** by Rae L. Baker: a practical guide to advanced OSINT methodologies and real-world applications.
*   **ICD 203: Analytic Standards**: the US Intelligence Community Directive defining the analytic tradecraft standards that govern intelligence products.
*   ***Open Source Intelligence Techniques*** by Michael Bazzell: the industry-standard reference for OSINT tools and collection techniques, updated regularly.
*   ***Psychology of Intelligence Analysis*** by Richards J. Heuer Jr.: a foundational text on understanding and mitigating cognitive biases in analytical judgment.

Additionally, following specialised blogs, participating in webinars, and joining professional OSINT communities are valuable for staying updated on the latest techniques and tools.

### What are some basic OPSEC best practices when using this toolkit?

Operational Security (OPSEC) is critical. While using this toolkit, always consider:

*   **Network Anonymity:** Use a trusted VPN or the Tor network to mask your real IP address.
*   **Dedicated Environment:** Conduct investigations from a dedicated virtual machine (VM) or a separate physical device to prevent cross-contamination with your personal data.
*   **Browser Fingerprinting:** Be aware that websites can identify you through your browser's unique configuration. Use browsers or browser extensions designed to minimise fingerprinting.
*   **Non-Attributable Accounts:** Always use dedicated, non-personal accounts for interacting with online services.

### What are the ethical guidelines for using these tools?

Ethical use is paramount. Always act within legal and jurisdictional boundaries. The purpose of these tools is for legitimate intelligence gathering on authorised targets. Never use them for harassment, illegal surveillance, or any activity that violates privacy laws or terms of service of the platforms being accessed. The responsibility for ethical conduct lies entirely with the analyst.

## Functionality & Customisation

### Do I need to install additional software to use the toolkit?

No, the toolkit consists of HTML, CSS, and JavaScript pages that run directly in a modern web browser. No specific client-side software installation is required, apart from the browser itself. Linked external tools may have their own requirements.

### Are my search activities tracked by the toolkit?

The Exploratores toolkit itself does not implement any tracking or logging of your specific queries. However, each external service or website you access through the toolkit operates under its own privacy policies and may log your interactions. Always use safe browsing practices.

### Do the external services I search know that I am using Exploratores?

No. Since version 3.4.2 every page carries a site-wide `no-referrer` policy and all search buttons open external sites with the `noopener,noreferrer` flags: the destination service receives no referrer (it cannot tell that the visit originates from Exploratores) and no `window.opener` handle on the toolkit tab (which also prevents tab-nabbing). Keep in mind that the destination still sees your IP address and browser fingerprint — this is why using a VPN and a dedicated investigative browser profile remains recommended.

### Is it necessary to create dedicated investigative accounts for using some of these tools?

Yes, for many OSINT activities, it is highly recommended to use dedicated, non-attributable "investigative" or "sock puppet" accounts. Using personal accounts can compromise your investigation, expose your identity, and may violate the terms of service of some platforms.

### Can the Exploratores OSINT Toolkit pages be customised?

Yes, the toolkit is designed to be customisable. You can add new tools, modify existing categories, or adapt functionalities. For a detailed guide on how to do this, please refer to the [How to Customise Pages](customise.md) page.

## Maintenance & Contribution

### How is the maintenance of tools within the toolkit handled?

The Exploratores OSINT Toolkit is maintained on a voluntary basis. Ongoing maintenance, including updating links, removing obsolete tools, and adding new resources, is performed as capacity allows.

### How can I suggest new tools or improvements?

To report errors or request new functionalities, submit an issue via the GitHub repository. This ensures requests are tracked and addressed.

### What is the recommended workflow for contributing a new page?

The standard workflow for contributing is:

1.  **Create the HTML file:** Build the new page in the `pages/` directory, following all project standards (no `onclick`, use `data-search-id`, etc.).
2.  **Update `validators.js`:** Add a new validation function if the existing ones are not suitable.
3.  **Update `search-library.js`:** Add the configuration objects for all the new buttons on your page.
4.  **Update `navigation.js`:** Add a link to your new page in the appropriate submenu.
5.  **Submit for Review:** Follow the established contribution process (e.g., submitting a pull request on GitHub).

## LLMs and Toolkit Development

### How can I create a new page or add features using a prompt for an LLM?

To interact effectively with a Large Language Model (LLM) for developing pages or features, provide a clear and detailed prompt. Key elements to include are:

*   **Clear Objective**: Precisely describe what the new page or feature should do.
*   **Adherence to Architecture**: Explicitly state that the new page must follow the established centralised architecture (main.js, validators.js, search-library.js).
*   **No Inline Logic**: Specify that buttons must use `data-search-id` and not `onclick`.
*   **Reference to Project Guidelines**: Remind the LLM to adhere to all established project standards, including file naming and CSS classes.

### Can you provide an example prompt for an LLM to create a basic Exploratores page template from scratch?

The following prompt reflects the current project architecture:

```html
"Please generate the complete HTML code for a new page named 'ExampleTool.html' for the Exploratores OSINT Toolkit. The page must strictly follow the new data-driven architecture.

1.  **HTML Structure**: Standard HTML5 boilerplate.
2.  **Head**: Include meta tags, title 'Example Tool • Exploratores', and link to `../assets/css/style.css`.
3.  **Body**:
    - Include the dynamic navigation placeholder: `<div id="navbar-placeholder"></div>`.
    - `<main>` section with a title `<h1 class="page-title">Example Tool</h1>`.
    - A `<section class="search-instructions">` with an input field (`id="exampleInput"`) and a feedback div (`id="page-feedback"`).
    - A `<div class="button-grid">` with one button: `<button id="btn-example-run" class="button" data-search-id="example-run">Run Example</button>`. Note the use of `data-search-id` and no `onclick`.
4.  **Scripts**:
    - At the end of `<body>`, include the script tags for the entire architecture: `main.js`, `validators.js`, `search-library.js`, and `navigation.js`.
    - Add the standard page-specific initialization script (`updatePageState`, `setInitialPageState`) that links to a new validator function (e.g., `getAndValidateExample`) and manages the button state."
```

### Were any Large Language Models (LLMs) unduly stressed during the creation of this toolkit?

We can confirm that, to the best of our knowledge, no LLMs reported permanent damage or suffered disproportionately during the development of the Exploratores OSINT Toolkit. All interactions were conducted with the aim of constructive collaboration and respect for computational capacities. Prompts were formulated with care, and we appreciate the patience and "artificial creativity" demonstrated. ;)

## Technical Details & Troubleshooting

### What is the logic behind the new centralised architecture?

The new architecture centralises the logic to avoid code duplication. It works like this:

*   **HTML Pages (e.g., Names.html):** Contain only the structure and UI elements. Buttons have a `data-search-id` attribute that acts as a unique identifier for a search, but they contain no JavaScript code.
*   **search-library.js:** Acts as a "catalogue." It contains an object that maps each `data-search-id` to a URL template and a validation function.
*   **main.js:** This is the "engine" of the toolkit. It contains a single event handler that, on a button click, uses the `data-search-id` to find the corresponding configuration in `search-library.js`, runs the validation, and opens the correct URL.

This approach makes the pages cleaner and maintenance easier, as all search logic is defined in one place.

### How does the page state management (`updatePageState`) work?

Each interactive page has a small, page-specific script with two key functions: `updatePageState()` and `setInitialPageState()`.

*   `setInitialPageState()` runs once when the page loads. Its job is to attach event listeners (e.g., for the `input` event) to the page's form fields.
*   `updatePageState()` is called every time a user types into a field. It calls the appropriate validation function from `validators.js`. Based on whether the input is valid, it then enables or disables all the search buttons on the page and adds/removes the `.text-active` class.

This ensures that search buttons are only clickable when the required input is valid.

### What are the steps to add a new search button?

To add a new button under the new architecture, follow these two steps:

1.  **Add the configuration to `search-library.js`:** Create a new entry in the `SearchLibrary` object. The key must be a unique identifier (e.g., `'names-new-service'`), and the value must be an object with the `urlTemplate` and the name of the `validator` function (e.g., `'getAndValidateNames'`).
2.  **Add the button to the HTML:** Insert the `<button>` tag on the desired page. Assign it a unique `id` (for customisation) and the `data-search-id` attribute corresponding to the key you created in the library.

The "engine" in `main.js` will automatically make the new button work without needing to write more JavaScript on the page.

### What should I check if a button click does nothing?

If a button is clickable but doesn't open a new tab, the problem is almost certainly a JavaScript error. The first thing to do is check the browser's **Developer Console** (F12 key, "Console" tab):

*   **Look for syntax errors:** The most common error is an `Uncaught SyntaxError`, often caused by a missing comma (`,`) between entries in the `search-library.js` file. This error prevents all configurations from loading.
*   **Look for "Validator not found" or "SearchLibrary not defined" errors:** These indicate that one of the core JavaScript files (`validators.js`, `search-library.js`) failed to load due to a syntax error or a broken path in the HTML `<script>` tag.

Fixing the error shown in the console is the quickest way to get the buttons working again.

### How do I update the IBAN bank databases?

The local bank name databases are stored as plain JavaScript files in `assets/js/bankDatabases/`. Each file exports a single object mapping a bank identifier (BLZ, BIC-4, entity code, etc.) to the bank name. To update or expand a database, simply edit the corresponding file and add or correct entries.

#### Procedure

1.  Download the official bank list for the country you want to update (see sources below).
2.  Open the matching file in `assets/js/bankDatabases/` (e.g., `de.js` for Germany).
3.  Add or update entries using the format `"BANKCODE": "Bank Name"`, ensuring each line ends with a comma except the last one before the closing brace.
4.  Save the file. No build step is required; the change takes effect immediately in the browser.

#### Official Sources by Country

| Country | File | Source | Format |
|---------|------|--------|--------|
| Germany (DE) | de.js | Deutsche Bundesbank: *Bankleitzahlendatei* | CSV/TXT, free download |
| Austria (AT) | at.js | Oesterreichische Nationalbank: BLZ register | CSV/XLS, free download |
| Switzerland (CH) | ch.js | SIX Group: IID/Clearing register | XLS/CSV, free download |
| United Kingdom (GB) | gb.js | Pay.UK / EISCD: Sort Code directory | CSV, free download |
| Netherlands (NL) | nl.js | BIC lookup via ECB/SWIFT IBAN registry | Manual / SWIFT API |
| Belgium (BE) | be.js | National Bank of Belgium: BIC/IBAN guide | PDF/Manual |
| France (FR) | fr.js | Banque de France: Code CIB / CFONB | PDF/Manual |
| Spain (ES) | es.js | Banco de España: Registro de entidades | PDF/Web |
| Portugal (PT) | pt.js | Banco de Portugal: Instituições de crédito | PDF/Web |
| Poland (PL) | pl.js | Narodowy Bank Polski: IBAN structure / NBP register | PDF/Web |
| Italy (IT) | (built-in) | Banca d'Italia: Albo delle banche (ABI codes) | XLS, free download |

*For countries where a single machine-readable file is not available (NL, BE, FR, ES, PT, PL), the ECB's [SEPA IBAN registry](https://www.ecb.europa.eu/paym/integration/retail/sepa/html/index.en.html) and the [SWIFT BIC directory](https://www.swift.com/standards/data-standards/bic-business-identifier-code) are useful cross-reference sources.*

### What is the "Light Version" for?

The "Light Version" is a customisable display mode for the toolkit. It allows each user to hide tools, sections, or columns they do not use, creating a leaner and more focused interface.

This customisation is managed by the `assets/js/config.js` file. By editing this file, you can:

*   **Enable or disable** the Light Version by setting `lightVersionEnabled` to `true` or `false`.
*   **Specify which elements to hide** by adding their CSS selectors (like `#column-searchengines-tor`) to the `selectorsToHide` array.

When the Light Version is active, a script automatically adds the `.hidden-in-light` class to all elements listed in the configuration file, making them disappear from the page.

### What is the Redactor tool and how does it work?

The Redactor (accessible under the **Tools** menu) is a browser-side PII removal tool designed for workflows that involve submitting case text to external AI models. It scans input text or CSV files and replaces sensitive values with numbered placeholders such as `[EMAIL_1]`, `[VAT_IT_1]`, or `[AMEX_1]`. The same value always receives the same placeholder within a session, so the mapping is consistent. A **Redaction Map** records every substitution and can be exported as JSON for later use.

All processing runs locally in your browser. No data is transmitted to any server.

Detected categories out of the box:

*   **EMAIL**: standard email addresses.
*   **CF**: Italian Codice Fiscale (16-character alphanumeric).
*   **National identity / social security numbers**: US SSN (`SSN_US`, dashed form), UK National Insurance number (`NINO_UK`, compact and spaced), Spain DNI/NIE (`DNI_ES`, validated against the real check-letter alphabet), France NIR (`NIR_FR`, compact and INSEE-spaced, Corsica 2A/2B included), Switzerland AVS (`AVS_CH`, 756 prefix), Romania CNP (`CNP_RO`), Finland HETU (`HETU_FI`), Nordic personal numbers (`ID_NORDIC`, SE/DK/NO separated form), Czech/Slovak rodné číslo (`RC_CZSK`, slash form), Belgium national number (`NN_BE`, dotted form). Digit-only IDs with no distinctive structure (NL BSN, DE Steuer-ID, PL PESEL, HR OIB, UK NHS) cannot be told apart from generic numbers: define a custom pattern if you need them.
*   **VAT_XX**: VAT / fiscal codes for 30 countries, each tagged with its ISO country code (e.g., `[VAT_DE_1]`, `[VAT_FR_1]`). Includes both the EU-prefix form (`IT04598600403`) and the plain 11-digit Italian P.IVA.
*   **Payment cards**: American Express (`AMEX`, CM15/CM13/CM11, 4-6-N grouping), Visa (`VISA`, 16 and legacy 13 digits), Mastercard (`MASTERCARD`, 51–55 and 2221–2720), Discover (`DISCOVER`, 6011/644–649/65xx), JCB (`JCB`, 3528–3589), Diners Club (`DINERS`, 300–305/36/38, 4-6-4 grouping), UnionPay (`UNIONPAY`, 62, 16–19 digits). All in compact form and grouped with spaces or hyphens.
*   **Cryptocurrency addresses**: Bitcoin (`CRYPTO_BTC`: legacy, P2SH, bech32/segwit-taproot), Ethereum and every EVM chain (`CRYPTO_ETH`: `0x…`, also BSC/Polygon/Arbitrum wallets), Monero (`CRYPTO_XMR`), Litecoin (`CRYPTO_LTC`), Tron (`CRYPTO_TRX`), Ripple (`CRYPTO_XRP`). Matching is structural; checksums are not verified.
*   **IBAN**: International Bank Account Numbers: 2-letter country code + 2 check digits + BBAN (11–30 chars) — compact, spaced or hyphen-separated, upper or lower case.
*   **PHONE_IT_MOBILE**: Italian mobile phone numbers (prefixes 32x–39x, 10 digits). Matches compact (`3351234567`), grouped (`335 123 4567`), and country-code formats (`+39 335 123 4567`, `0039335123456`, `(+39) 335 123 4567`).
*   **PHONE_DE_MOBILE**: German mobile numbers — prefixes 015x/016x/017x plus 7–8 digits (`0151 12345678`), with or without `+49`/`0049` country code.
*   **PHONE_FR_MOBILE**: French mobile numbers — 06/07 plus 8 digits in pairs, dots, hyphens or compact (`06 12 34 56 78`, `0612345678`), with or without `+33`/`0033` country code.
*   **PHONE_UK_MOBILE**: UK mobile numbers — `07xxx xxxxxx`, compact or spaced, with or without `+44`/`0044` country code.
*   **PHONE_INTL**: any other international number with an explicit country prefix — `+CC` followed by 6–12 digits, compact or separated (`+34 612 34 56 78`, `+31612345678`), or `00CC` followed by a separator (`0031 6 12345678`). The compact `00CC…` form without separators is deliberately not matched: it cannot be told apart from zero-padded numeric IDs common in CSV exports.
*   **PCN**: prescription control numbers and similar codes of 17 or more consecutive digits.
*   **SE10**: SE10 merchant codes (exactly 10 digits).

### What is the Redact → LLM → Restore workflow?

1.  Paste your text into the **Redactor** section (or upload a CSV) and click **Redact**.
2.  Copy the redacted output and submit it to your AI model.
3.  Once the AI returns its report (which will contain the placeholders), paste it into the **Restore** section and click **Restore**. All original values are reinserted automatically.
4.  If you need to continue a session later (e.g., the report arrives the next day), click **Copy Map (JSON)** to export the redaction map, save it externally, then re-import it via the **Import Map** panel before using Restore.

The session state is held only in memory. It is cleared when you close or refresh the tab, or when you click **Clear Redaction Map**.

### How do I add custom detection patterns to the Redactor?

Open the **Custom Patterns** section on the Redactor page. Fill in the form:

*   **Type name**: used in the placeholder, e.g. `CASE_ID` → `[CASE_ID_1]`. Spaces are converted to underscores, letters are uppercased, and any character outside `A–Z 0–9 _` is removed automatically.
*   **Regex**: the pattern without surrounding slashes, e.g. `\bCASE-\d{6}\b`.
*   **Colour**: badge colour in the Redaction Map table.
*   **Case-insensitive**: tick to apply the `i` flag.

Click **Add Pattern**. Patterns that could cause catastrophic backtracking (ReDoS) — for example nested quantifiers such as `(a+)+` — are rejected with an explanatory message. Custom patterns are saved in your browser's `localStorage` and persist between sessions. Remove any pattern via the **Remove** button in the active patterns table.
