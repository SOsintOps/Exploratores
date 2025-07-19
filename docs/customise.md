# Customising Exploratores Pages

This page serves as the technical documentation for understanding, modifying, and extending the Exploratores toolkit.

<section id="section-architecture">
    <h2>Project Architecture</h2>
    <p>The toolkit is built on three fundamental principles: a Data-Driven Design, Centralized Logic, and a clear Separation of Concerns.</p>
    
    <h3>Directory and File Structure</h3>
    <p>The file organization is designed to separate content (HTML pages) from shared resources (assets), ensuring order and ease of maintenance. The definitive structure is documented in the `gemini.md` file.</p>
    
    <h3>Technical & Contribution Guidelines</h3>
    <p>This section outlines the technical standards for maintaining and extending the Exploratores toolkit.</p>
    <ul>
        <li><strong>Separation of Concerns:</strong> The project strictly separates structure (HTML), presentation (CSS), and logic (JavaScript). No inline styles or scripts are permitted in HTML files.</li>
        <li><strong>JavaScript Architecture:</strong> All pages must adhere to the central, data-driven architecture powered by `main.js`, `validators.js`, and `search-library.js`.</li>
        <li><strong>File Naming:</strong> All HTML files must use lowercase names (e.g., `new_page.html`).</li>
        <li><strong>ID & Data Attribute Conventions:</strong>
            <ul>
                <li>Element `id` attributes must follow the `[type]-[page]-[name]` format (e.g., `btn-names-us-fastpeople`).</li>
                <li>`data-search-id` attributes must follow the `[page]-[name]` format and match a key in `search-library.js`.</li>
            </ul>
        </li>
    </ul>
</section>

## The Role of the Main JavaScript Files

The JavaScript architecture is the heart of the project. Here is the role of each file located in `assets/js/`.

### 1. `navigation.js` (in `assets/menu/`) - The Dynamic Menu

**Role:** This script dynamically generates the navigation bar on every page. It detects whether it's being loaded from the root (`launchme.html`) or a sub-page (in `pages/`) and adjusts all link paths accordingly. This allows for a single, centralized menu definition.

### 2. `search-library.js` - The Catalog

**Role:** Acts as a database for all search functions. It contains a single large object, `SearchLibrary`, which defines the "what," not the "how." Each entry in this file is a complete "recipe" for a search, associated with a unique `data-search-id` found on an HTML button.

### 3. `validators.js` - The Rulebook

**Role:** Contains the `ExploratoresValidators` object, a library of reusable functions for input validation. These functions are called by the main engine to check that the user has entered valid data before launching a search.

### 4. `main.js` - The Engine

**Role:** Contains the executive logic (`Exploratores.initSearchHandler`). This script is the "engine" that makes everything work. It listens for clicks on any search button, consults the "catalog" (`search-library.js`), applies the "rules" (`validators.js`), and, if everything is valid, executes the search.

### 5. `config.js` - The Settings

**Role:** This file holds global configuration data and flags, such as enabling the "Light Version" of the toolkit and specifying which UI elements to hide.

## Practical Guides

The following guides show with practical examples how to modify and extend the toolkit.

### Example A: Adding a New Search Function

**Scenario:** We want to add a button to the `names.html` page to search for a person on a new service called "PersonaDB".

1.  **Step 1: Analyze the Validator (in `validators.js`)**
    The search requires a first and last name. We can reuse the existing `getAndValidateNames` validator. No new validation code is needed.
2.  **Step 2: Add the Configuration to `search-library.js`**
    Open `assets/js/search-library.js` and add a new entry for our search. The key must be unique.
    ```
    // Inside the SearchLibrary object, after the other 'names-*' entries:
    "names-personadb": {
        "urlTemplate": "https://personadb.com/search?name={fullname}",
        "validator": "getAndValidateNames"
    },
    ```
3.  **Step 3: Add the Button to `names.html`**
    Open `pages/names.html` and add the new button inside a relevant `.button-grid`. The `data-search-id` must match the key added in the previous step.
    ```html
    <!-- In pages/names.html -->
    <div class="button-grid">
        ...
        <button id="btn-names-personadb" type="button" class="button" data-search-id="names-personadb">PersonaDB</button> <!-- NEW BUTTON -->
    </div>
    ```

### Example B: Modifying an Existing Page's Inputs

**Scenario:** We want to add an optional "State" field to the "US Phone Search" on `phoneus.html` to refine searches.

1.  **Step 1: Modify the HTML in `phoneus.html`**
    Add a new input field for the state.
    ```html
    <!-- In pages/phoneus.html, inside the #section-phoneus-main-input .input-container -->
    <div class="input-container">
        <input type="text" id="areaCode" ... >
        <input type="text" id="prefixCode" ... >
        <input type="text" id="lineNumber" ... >
        <input type="text" id="stateCode" class="input-field" placeholder="State (e.g., NV)" autocomplete="off"> <!-- NEW INPUT -->
    </div>

    ```
2.  **Step 2: Modify the Validator in `validators.js`**
    Update the `getAndValidateUsPhone` function to read the new field and include it in the returned data object.
    ```javascript
    // In assets/js/validators.js, inside getAndValidateUsPhone
    getAndValidateUsPhone: function(config) {
        // ... get area, prefix, line
        const state = document.getElementById('stateCode')?.value.trim(); // NEW LINE

        if (!area || !prefix || !line || ...) { return null; }
        
        return {
            area: area, prefix: prefix, line: line, state: state, // NEW PROPERTY
            // ... other properties
        };
    },
    ```
3.  **Step 3: Modify the Configuration in `search-library.js`**
    Update the `urlTemplate` of a relevant service to use the new `{state}` placeholder.
    ```javascript
    // In assets/js/search-library.js, for the whitepages button
    "phoneus-whitepages": { 
        "urlTemplate": "https://www.whitepages.com/phone/1-{full_dash}?state={state}", // UPDATED URL
        "validator": "getAndValidateUsPhone" 
    },
    ```

### Example C: Creating a New Validator Function

**Scenario:** We are creating a new page, `ip.html`, that requires a valid IPv4 address as input.

1.  **Step 1: Create the HTML in `ip.html`**
    The page will have an input field with `id="ipAddressInput"`.
2.  **Step 2: Create a New Validator in `validators.js`**
    Add a new function to the `ExploratoresValidators` object. This function will use a regular expression to check if the input is a valid IPv4 address.
    ```javascript
    // In assets/js/validators.js
    getAndValidateIpAddress: function(config) {
        const ip = document.getElementById('ipAddressInput')?.value.trim();
        // Simple regex for IPv4 validation
        const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        
        if (ip && ipv4Regex.test(ip)) {
            return { ip: ip };
        }
        return null; // Return null if input is empty or invalid
    },
    ```
3.  **Step 3: Use the New Validator in `search-library.js`**
    Now you can create search configurations that rely on your new validator.
    ```javascript
    // In assets/js/search-library.js
    "ip-shodan-search": {
        "urlTemplate": "https://www.shodan.io/host/{ip}",
        "validator": "getAndValidateIpAddress"
    },
    ```

### Example D: Customizing the UI with `config.js`

**Scenario:** A user wants to hide the "Bing News" button on the `searchengines.html` page because they never use it.

1.  **Step 1: Find the Element's Unique ID**
    Inspect `searchengines.html` and find the button's ID: `btn-searchengines-bingnews`.
2.  **Step 2: Edit `assets/js/config.js`**
    Open the configuration file. To hide the button, add its ID (prefixed with `#`) to the `selectorsToHide` array and ensure `lightVersionEnabled` is set to `true`.
    ```javascript
    // In assets/js/config.js
    const exploratoresConfig = {
        lightVersionEnabled: true, // Must be true to activate hiding
        
        selectorsToHide: [
            // Add the button's selector to this list
            '#btn-searchengines-bingnews',
            // ... other selectors to hide ...
        ]
    };
    ```
    The next time any page is loaded, the scripts will automatically find this element and apply the `.hidden-in-light` class, making it disappear.

### Example E: Adding a Link to the Navigation Menu

**Scenario:** We have created a new page, `ip.html`, and want to add it to the "Websites" submenu.

1.  **Step 1: Open the Menu Definition File**
    Open `assets/menu/navigation.js`.
2.  **Step 2: Locate the Target Submenu**
    Find the `<li>` element containing `<span>Websites</span>` and its nested `<ul>` submenu.
3.  **Step 3: Add the New Link**
    Add a new `<li>` element with the link to your page inside the `<ul>`. The `${pagesPath}` variable ensures the link works correctly from any page.
    ```html
    // In assets/menu/navigation.js, inside the navHTML template string

    // ...
    <li><span>Websites</span>
      <ul class="submenu">
        <li><a href="${pagesPath}domains.html">Domains</a></li>
        <li><a href="${pagesPath}ip.html">IP Addresses</a></li> <!-- NEW LINK -->
      </ul>
    </li>
    // ...
    ```
    After saving the file, the new "IP Addresses" link will appear in the menu on all pages of the toolkit.