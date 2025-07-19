# Frequently Asked Questions (FAQ)

## Table of Contents

*   [Why is the toolkit named "Exploratores"?](#q-why-name)
*   [Who were the "Exploratores" historically?](#q-who-exploratores)
*   [What is the main purpose of the Exploratores OSINT Toolkit?](#q-main-purpose)
*   [Can I use the Exploratores OSINT Toolkit outside of my team?](#q-usage-outside-gs)
*   [Is the Exploratores OSINT Toolkit covered by any warranty?](#q-warranty)
*   [Are there any guarantees regarding the accuracy or reliability of the tools and results?](#q-accuracy-guarantee)
*   [Am I responsible for validating information found using the toolkit?](#q-user-validation)
*   [Where can I find resources to learn more about OSINT?](#q-osint-resources)
*   [What are some basic OPSEC best practices when using this toolkit?](#q-opsec-basics)
*   [What are the ethical guidelines for using these tools?](#q-ethical-guidelines)
*   [Do I need to install additional software to use the toolkit?](#q-software-installation)
*   [Are my search activities tracked by the toolkit?](#q-tracking)
*   [Is it necessary to create dedicated investigative accounts for using some of these tools?](#q-investigative-accounts)
*   [Can the Exploratores OSINT Toolkit pages be customized?](#q-customization)
*   [How is the maintenance of tools within the toolkit handled?](#q-maintenance)
*   [How can I suggest new tools or improvements?](#q-suggest-improvements)
*   [What is the recommended workflow for contributing a new page?](#q-contribution-workflow)
*   [How can I create a new page or add features using a prompt for an LLM?](#q-llm-prompt-features)
*   [Can you provide an example prompt for an LLM to create a basic Exploratores page template from scratch?](#q-llm-prompt-newpage)
*   [Were any Large Language Models (LLMs) unduly stressed during the creation of this toolkit?](#q-llm-stress)
*   [What is the logic behind the new "Data-Driven" system?](#q-new-architecture)
*   [How does the page state management (`updatePageState`) work?](#q-page-state)
*   [What are the steps to add a new search button?](#q-add-new-button)
*   [What should I check if a button click does nothing?](#q-button-not-working)
*   [What is the "Light Version" for?](#q-light-version)

## About the Toolkit & Its Name

### Why is the toolkit named "Exploratores"?

"Exploratores" were the scouts or reconnaissance units in the Roman army, tasked with gathering intelligence about the terrain, enemy movements, and local resources ahead of the main legionary force. This toolkit is named in their spirit, aiming to provide modern digital "scouts" (OSINT practitioners) with the tools to explore the digital landscape and gather information effectively.

### Who were the "Exploratores" historically?

In ancient Rome, "Exploratores" were soldiers specifically chosen for their skills in reconnaissance, observation, and survival. They often operated in small groups, deep in potentially hostile territory, to provide crucial intelligence for military commanders, enabling informed strategic decisions. Their role was vital for the safety and success of military campaigns.

### What is the main purpose of the Exploratores OSINT Toolkit?

The Exploratores OSINT Toolkit aims to consolidate and organize a wide range of OSINT (Open Source Intelligence) tools and resources to facilitate investigation and information gathering activities. It provides a centralized access point and a consistent structure for these tools.

## Usage & Authorization

### Can I use the Exploratores OSINT Toolkit outside of my team?

Yes. You can distribute, share, and customize explorers as needed. However, You will be responsible for any unapproved purposes or inappropriate use of this tool.

### Is the Exploratores OSINT Toolkit covered by any warranty?

No, the Exploratores OSINT Toolkit is provided "as is," without any warranty of any kind, either expressed or implied. This includes, but is not limited to, warranties of merchantability or fitness for a particular purpose.

### Are there any guarantees regarding the accuracy or reliability of the tools and results?

No guarantees are provided regarding the accuracy, completeness, reliability, or timeliness of the information obtained through the tools accessible via the toolkit. Each external tool has its own terms of service and limitations. The analyst is fully responsible for independently verifying and validating all collected information before using it for any purpose.

### Am I responsible for validating information found using the toolkit?

Yes, absolutely. The Exploratores OSINT Toolkit provides access to various tools and external resources. However, any information, data, or "news" obtained through these tools must be critically evaluated and independently validated by you, the analyst, before being considered reliable or actionable. The toolkit itself does not verify the accuracy or truthfulness of the data retrieved from external sources.

## Learning & Best Practices

### Where can I find resources to learn more about OSINT?

For a structured approach, Michael Bazzell's books (like "Open Source Intelligence Techniques") are industry-standard references. Additionally, following specialized blogs, participating in webinars, and joining professional OSINT communities are crucial for staying updated on the latest techniques and tools.

### What are some basic OPSEC best practices when using this toolkit?

Operational Security (OPSEC) is critical. While using this toolkit, always consider:

*   **Network Anonymity:** Use a trusted VPN or the Tor network to mask your real IP address.
*   **Dedicated Environment:** Conduct investigations from a dedicated virtual machine (VM) or a separate physical device to prevent cross-contamination with your personal data.
*   **Browser Fingerprinting:** Be aware that websites can identify you through your browser's unique configuration. Use browsers or browser extensions designed to minimize fingerprinting.
*   **Non-Attributable Accounts:** As mentioned below, always use dedicated, non-personal accounts for interacting with online services.

### What are the ethical guidelines for using these tools?

Ethical use is paramount. Always act within legal and jurisdictional boundaries. The purpose of these tools is for legitimate intelligence gathering on authorized targets. Never use them for harassment, illegal surveillance, or any activity that violates privacy laws or terms of service of the platforms being accessed. The responsibility for ethical conduct lies entirely with the analyst.

## Functionality & Customization

### Do I need to install additional software to use the toolkit?

No, the toolkit consists of HTML, CSS, and JavaScript pages that run directly in a modern web browser. No specific client-side software installation is required, apart from the browser itself. Linked external tools may have their own requirements.

### Are my search activities tracked by the toolkit?

The Exploratores toolkit itself does not implement any tracking or logging of your specific queries. However, each external service or website you access through the toolkit operates under its own privacy policies and may log your interactions. Always use safe Browse practices.

### Is it necessary to create dedicated investigative accounts for using some of these tools?

Yes, for many OSINT activities, it is highly recommended to use dedicated, non-attributable "investigative" or "sock puppet" accounts. Using personal accounts can compromise your investigation, expose your identity, and may violate the terms of service of some platforms.

### Can the Exploratores OSINT Toolkit pages be customized?

Yes, the toolkit is designed to be customizable. You can add new tools, modify existing categories, or adapt functionalities. For a detailed guide on how to do this, please refer to the [How to Customize Pages](customise.md) page.

## Maintenance & Contribution

### How is the maintenance of tools within the toolkit handled?

The Exploratores OSINT Toolkit was created and is carried forward as a side project. Ongoing maintenance, updating links, removing obsolete tools, and adding new ones is managed in free time and may take time.

### How can I suggest new tools or improvements?

To report errors or request new functionalities, use the GitHub reporting procedures and communication channels. This will ensure direct feedback.

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
*   **Adherence to Architecture**: Explicitly state that the new page must follow the established data-driven architecture (main.js, validators.js, search-library.js).
*   **No Inline Logic**: Specify that buttons must use `data-search-id` and not `onclick`.
*   **Reference to Project Guidelines**: Remind the LLM to adhere to all established project standards, including file naming and CSS classes.

### Can you provide an example prompt for an LLM to create a basic Exploratores page template from scratch?

Certainly. Here is an updated prompt that reflects the current project architecture:

```
"Please generate the complete HTML code for a new page named 'ExampleTool.html' for the Exploratores OSINT Toolkit. The page must strictly follow the new data-driven architecture.

1.  **HTML Structure**: Standard HTML5 boilerplate.
2.  **Head**: Include meta tags, title 'Example Tool • Exploratores', and link to `../assets/css/style.css`.
3.  **Body**:
    - Include the dynamic navigation placeholder: `<div id=\"navbar-placeholder\"></div>`.
    - `<main>` section with a title `<h1 class=\"page-title\">Example Tool</h1>`.
    - A `<section class=\"search-instructions\">` with an input field (`id=\"exampleInput"`) and a feedback div (`id=\"page-feedback\"`).
    - A `<div class=\"button-grid\">` with one button: `<button id=\"btn-example-run\" class=\"button\" data-search-id=\"example-run\">Run Example</button>`.
    - Note the use of `data-search-id` and no `onclick`.
4.  **Scripts**:
    - At the end of `<body>`, include the script tags for the entire architecture: `main.js`, `validators.js`, `search-library.js`, and `navigation.js`.
    - Add the standard page-specific initialization script (`updatePageState`, `setInitialPageState`) that links to a new validator function (e.g., `getAndValidateExample`) and manages the button state."
```

### Were any Large Language Models (LLMs) unduly stressed during the creation of this toolkit?

We can confirm that, to the best of our knowledge, no LLMs reported permanent damage or suffered disproportionately during the development of the Exploratores OSINT Toolkit. All interactions were conducted with the aim of constructive collaboration and respect for computational capacities. Prompts were formulated with care, and we appreciate the patience and "artificial creativity" demonstrated. ;)

## Technical Details & Troubleshooting

### What is the logic behind the new "Data-Driven" system?

The new architecture centralizes the logic to avoid code duplication. It works like this:

*   **HTML Pages (e.g., Names.html):** Contain only the structure and UI elements. Buttons have a `data-search-id` attribute that acts as a unique identifier for a search, but they contain no JavaScript code.
*   **search-library.js:** Acts as a "catalog." It contains an object that maps each `data-search-id` to a URL template and a validation function.
*   **main.js:** This is the "engine" of the toolkit. It contains a single event handler that, on a button click, uses the `data-search-id` to find the corresponding configuration in `search-library.js`, runs the validation, and opens the correct URL.

This approach makes the pages cleaner and maintenance easier, as all search logics are defined in one place.

### How does the page state management (`updatePageState`) work?

Each interactive page has a small, page-specific script with two key functions: `updatePageState()` and `setInitialPageState()`.

*   `setInitialPageState()` runs once when the page loads. Its job is to attach event listeners (e.g., for the `input` event) to the page's form fields.
*   `updatePageState()` is called every time a user types into a field. It calls the appropriate validation function from `validators.js`. Based on whether the input is valid, it then enables or disables all the search buttons on the page and adds/removes the `.text-active` class.

This ensures that search buttons are only clickable when the required input is valid.

### What are the steps to add a new search button?

To add a new button under the new architecture, follow these two steps:

1.  **Add the configuration to `search-library.js`:** Create a new entry in the `SearchLibrary` object. The key must be a unique identifier (e.g., `'names-new-service'`), and the value must be an object with the `urlTemplate` and the name of the `validator` function (e.g., `'getAndValidateNames'`).
2.  **Add the button to the HTML:** Insert the `<button>` tag on the desired page. Assign it a unique `id` (for customization) and the `data-search-id` attribute corresponding to the key you created in the library.

The "engine" in `main.js` will automatically make the new button work without needing to write more JavaScript on the page.

### What should I check if a button click does nothing?

If a button is clickable but doesn't open a new tab, the problem is almost certainly a JavaScript error. The first thing to do is check the browser's **Developer Console** (F12 key, "Console" tab):

*   **Look for syntax errors:** The most common error is an `Uncaught SyntaxError`, often caused by a missing comma (`,`) between entries in the `search-library.js` file. This error prevents all configurations from loading.
*   **Look for "Validator not found" or "SearchLibrary not defined" errors:** These indicate that one of the core JavaScript files (`validators.js`, `search-library.js`) failed to load due to a syntax error or a broken path in the HTML `<script>` tag.

Fixing the error shown in the console is the quickest way to get the buttons working again.

### What is the "Light Version" for?

The "Light Version" is a customizable display mode for the toolkit. It allows each user to hide tools, sections, or columns they do not use, creating a leaner and more focused interface.

This customization is managed by the `assets/js/config.js` file. By editing this file, you can:

*   **Enable or disable** the Light Version by setting `lightVersionEnabled` to `true` or `false`.
*   **Specify which elements to hide** by adding their CSS selectors (like `#btn-names-us-advbackground` or `#column-names-usa`) to the `selectorsToHide` array.

When the Light Version is active, a script automatically adds the `.hidden-in-light` class to all elements listed in the configuration file, making them disappear from the page.