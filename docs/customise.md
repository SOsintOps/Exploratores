# Customising Exploratores Pages

This page serves as the technical documentation for understanding, modifying, and extending the Exploratores toolkit.

## Project Architecture

The toolkit is built on three fundamental principles: a centralised design, centralised logic, and a clear separation of concerns.

### Directory and File Structure

The file organization is designed to separate content (HTML pages) from shared resources (assets), ensuring order and ease of maintenance.

### Technical & Contribution Guidelines

This section outlines the technical standards for maintaining and extending the Exploratores toolkit.

-   **Separation of Concerns:** The project strictly separates structure (HTML), presentation (CSS), and logic (JavaScript). No inline styles or scripts are permitted in HTML files.
-   **JavaScript Architecture:** All pages must adhere to the centralised architecture powered by `main.js`, `validators.js`, and `search-library.js`.
-   **File Naming:** All HTML files must use lowercase names (e.g., `new_page.html`).
-   **ID & Data Attribute Conventions:**
    -   Element `id` attributes must follow the `[type]-[page]-[name]` format (e.g., `btn-names-us-fastpeople`).
    -   `data-search-id` attributes must follow the `[page]-[name]` format and match a key in `search-library.js`.

## The Role of the Main JavaScript Files

The JavaScript architecture is the core of the project. Here is the role of each file located in `assets/js/`.

### 1. `navigation.js` (in `assets/menu/`) - The Navigation Menu

**Role:** This script generates the navigation bar on every page. It detects its location and adjusts all link paths accordingly, allowing for a single, centralised menu definition.

### 2. `search-library.js` - The Catalog

**Role:** Acts as a database for all search functions. It contains a single large object, `SearchLibrary`, that maps a button's `data-search-id` to a URL template and a validator function.

### 3. `validators.js` - The Rulebook

**Role:** Contains the `ExploratoresValidators` object, a library of reusable functions that check if user input is valid before launching a search.

### 4. `main.js` - The Engine

**Role:** Contains the `Exploratores` object, which holds the core logic. `initSearchHandler` listens for clicks and orchestrates the search process, while `clearAllInputs` resets form fields on page load for a clean state.

### 5. `config.js` - The Settings

**Role:** This file holds global configuration data and flags, such as enabling the "Light Version" of the toolkit and specifying which UI elements to hide.

## Practical Guides

The following guides demonstrate, with practical examples, how to modify and extend the toolkit.

### Guide A: Page State Management

**Concept:** To prevent searches with invalid data, buttons on a page are disabled until the user provides valid input. This is handled by a page-specific script.

**Standard Implementation:** For pages with multiple, independent input groups (like `PublicCompanyRecords.html`), the standard method is to use an `inputGroups` array. Each object in the array defines a set of inputs, the buttons they control, and the validator to use.

```javascript
// In a page-specific script, e.g., at the bottom of PublicCompanyRecords.html
function setInitialPageState() {
    const inputGroups = [
        {
            inputIds: ['officerNameInput'],
            buttonSelector: '#grid-pcr-officers-intl .button, ...',
            validator: ExploratoresValidators.getAndValidateOfficerName
        },
        {
            inputIds: ['officerSearchFirstName', 'officerSearchLastName'],
            buttonSelector: '#grid-pcr-usofficers .button',
            validator: ExploratoresValidators.getAndValidateUsOfficerName
        }
        // ... more groups
    ];

    const updateButtons = (group) => {
        const validationResult = group.validator();
        document.querySelectorAll(group.buttonSelector).forEach(button => {
            button.disabled = !validationResult.isValid;
            button.classList.toggle('text-active', validationResult.isValid);
        });
    };

    inputGroups.forEach(group => {
        group.inputIds.forEach(inputId => {
            document.getElementById(inputId)?.addEventListener('input', () => updateButtons(group));
        });
        updateButtons(group); // Set initial state
    });
}
document.addEventListener('DOMContentLoaded', setInitialPageState);
```

### Guide B: Adding a New Search Function

**Scenario:** Add a button to `names.html` to search "PersonaDB".

1.  **Step 1: Add to `search-library.js`**
    Add a new entry with a unique key.
    ```javascript
    // Inside SearchLibrary object
    "names-personadb": {
        "urlTemplate": "https://personadb.com/search?name={fullname}",
        "validator": "getAndValidateNames"
    },
    ```
2.  **Step 2: Add Button to `names.html`**
    Add the HTML button, matching the `data-search-id` to the new key.
    ```html
    <!-- In pages/names.html -->
    <div class="button-grid">
        ...
        <button id="btn-names-personadb" type="button" class="button" data-search-id="names-personadb">PersonaDB</button> <!-- NEW BUTTON -->
    </div>
    ```

### Guide C: Creating a New Validator

**Scenario:** Create a page `ip.html` that requires a valid IPv4 address.

1.  **Step 1: Create a New Function in `validators.js`**
    Add a function to the `ExploratoresValidators` object that gets the input and validates it.
    ```javascript
    // In assets/js/validators.js
    getAndValidateIpAddress: function(config) {
        const ip = document.getElementById('ipAddressInput')?.value.trim();
        if (!ip) return { isValid: false, message: "Please enter an IP address." };
        const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if (!ipv4Regex.test(ip)) return { isValid: false, message: "Invalid IPv4 address." };
        return { isValid: true, data: { ip: ip }, message: "Valid IP address." };
    },
    ```
2.  **Step 2: Use the Validator in `search-library.js`**
    Reference your new function in a search configuration.
    ```javascript
    // In assets/js/search-library.js
    "ip-shodan-search": {
        "urlTemplate": "https://www.shodan.io/host/{ip}",
        "validator": "getAndValidateIpAddress" // Use the new validator
    },
    ```

---

## Redactor: Custom Detection Patterns

The Redactor page lets each user define additional PII patterns beyond the built-in set. Custom patterns are stored in the browser's `localStorage` under the key `redactor_custom_patterns` and are loaded automatically on every visit. They are browser-specific and do not affect other users of the same installation.

### Guide D: Adding a Custom Pattern

**Scenario:** Detect internal case references in the format `CASE-123456`. (US Social Security Numbers, formerly this example, are now detected out of the box.)

1.  Open **Tools → Redactor**.
2.  Scroll to the **Custom Patterns** section.
3.  Fill in the form:
    *   **Type name:** `CASE_ID`
    *   **Regex:** `\bCASE-\d{6}\b`
    *   **Colour:** choose any colour.
    *   **Case-insensitive:** tick it if references may also appear as `case-123456`.
4.  Click **Add Pattern**. The pattern appears immediately in the active patterns table.
5.  Values matching the pattern will be replaced with `[CASE_ID_1]`, `[CASE_ID_2]`, etc. on the next Redact operation.

To remove a custom pattern, click **Remove** in the active patterns table. The pattern is deleted from `localStorage` immediately.

### Technical Notes

*   Custom patterns are appended after all built-in patterns. Standard left-to-right overlap resolution applies.
*   Use `\b` word boundaries in your regex to avoid partial matches inside longer tokens.
*   The `g` (global) flag is always added automatically; do not include it in the regex field.
*   Type names are converted to uppercase and spaces replaced with underscores. Duplicate type names are rejected.
