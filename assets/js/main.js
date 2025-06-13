// assets/js/main.js

const Exploratores = {
    /**
     * Initializes the core functionalities for all pages.
     */
    init: function() {
        this.initSearchHandler();
    },

    /**
     * Initializes the global, data-driven search handler for the entire application.
     * It uses a single event listener on the body to handle clicks on all search buttons.
     */
    initSearchHandler: function() {
        document.body.addEventListener('click', function(event) {
            // Find the closest button with a data-search-id that was clicked
            const button = event.target.closest('button[data-search-id]');
            if (!button) {
                return; // Exit if the click was not on a search button
            }

            const searchId = button.dataset.searchId;
            const config = SearchLibrary[searchId];

            if (!config) {
                console.error(`Search configuration not found for id: ${searchId}`);
                return;
            }

            // Handle searches that don't require any input
            if (config.no_input) {
                window.open(config.urlTemplate, '_blank');
                return;
            }

            // Get the name of the validator function from the config
            const validatorName = config.validator;
            const validatorFn = window[validatorName];

            if (typeof validatorFn !== 'function') {
                console.error(`Validator function "${validatorName}" not found on the page.`);
                return;
            }

            // Get the ID of the target input field from the config
            const targetInputId = config.targetInput;
            
            // Call the validator function, passing the target input ID if it exists.
            const data = validatorFn(targetInputId);

            if (data) {
                let finalUrl = config.urlTemplate;
                // Replace all placeholders in the URL template with data from the validator
                for (const key in data) {
                    const encodedValue = encodeURIComponent(data[key]);
                    const rawValue = data[key]; // For placeholders that shouldn't be encoded
                    
                    finalUrl = finalUrl.replace(new RegExp(`{${key}}`, 'g'), encodedValue);
                    finalUrl = finalUrl.replace(new RegExp(`{${key}_RAW}`, 'g'), rawValue);
                }
                window.open(finalUrl, '_blank');
            }
        });
    }
};

// Initialize the engine when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    Exploratores.init();
});