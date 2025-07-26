/**
 * @file Manages the logic for the Janua.html dispatcher page.
 * It listens for user input, classifies the indicator using `indicator-classifier.js`,
 * finds relevant tools from `search-library.js`, and dynamically displays them.
 */

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('indicator-input');
    const resultsContainer = document.getElementById('results-container');

    if (!input || !resultsContainer) {
        console.error("Dispatcher script cannot find required elements (input or results container).");
        return;
    }

    // This map links the type returned by classifyIndicator to the validator function names in SearchLibrary.
    const typeToValidatorMap = {
        'EMAIL': 'getAndValidateEmail',
        'DOMAIN': 'getAndValidateDomain',
        'IPV4': 'getAndValidateIp',
        'USERNAME': 'getAndValidateUsername',
        'IBAN': 'getAndValidateIban',
        // Add other mappings here as needed for different indicator types.
        'GENERIC_TEXT': 'getAndValidateGeneric' 
    };

    /**
     * Updates the results view based on the current input value.
     */
    const updateResults = () => {
        const query = input.value.trim();
        
        // Clear previous results
        resultsContainer.innerHTML = '';

        if (!query) {
            return; // Do nothing if input is empty
        }

        const indicatorType = classifyIndicator(query);
        const validatorName = typeToValidatorMap[indicatorType];
        
        if (!validatorName) {
            return; // No tools defined for this indicator type
        }
        
        const relevantButtons = findRelevantButtons(validatorName);
        renderButtons(relevantButtons);
    };

    /**
     * Finds all buttons from the SearchLibrary that match a given validator name.
     * @param {string} validatorName - The name of the validator function (e.g., 'getAndValidateEmail').
     * @returns {Object} An object with buttons grouped by their original page title.
     */
    const findRelevantButtons = (validatorName) => {
        const groupedButtons = {};

        for (const searchId in SearchLibrary) {
            const config = SearchLibrary[searchId];
            if (config.validator === validatorName) {
                const pageTitle = config.page || 'General Tools'; // Group by page name

                if (!groupedButtons[pageTitle]) {
                    groupedButtons[pageTitle] = [];
                }
                
                groupedButtons[pageTitle].push({
                    id: `btn-janua-${searchId}`,
                    searchId: searchId,
                    label: config.label
                });
            }
        }
        return groupedButtons;
    };

    /**
     * Renders the groups of buttons into the results container.
     * @param {Object} groupedButtons - Buttons grouped by page title.
     */
    const renderButtons = (groupedButtons) => {
        for (const pageTitle in groupedButtons) {
            const buttons = groupedButtons[pageTitle];

            // Create a section for each group of tools
            const section = document.createElement('section');
            section.className = 'card card-body mt-4';

            const title = document.createElement('h2');
            title.className = 'card-title';
            title.textContent = pageTitle;
            section.appendChild(title);
            
            const buttonGrid = document.createElement('div');
            buttonGrid.className = 'button-grid';

            buttons.forEach(btnInfo => {
                const button = document.createElement('button');
                button.id = btnInfo.id;
                button.className = 'button text-active'; // Start as active
                button.textContent = btnInfo.label;
                button.setAttribute('data-search-id', btnInfo.searchId);
                button.setAttribute('data-query-override', input.value.trim()); // Pass the query to main.js
                buttonGrid.appendChild(button);
            });

            section.appendChild(buttonGrid);
            resultsContainer.appendChild(section);
        }
    };

    // Listen for typing in the input field
    input.addEventListener('keyup', updateResults);
});