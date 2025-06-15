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
     */
    initSearchHandler: function() {
        document.body.addEventListener('click', function(event) {
            const button = event.target.closest('button[data-search-id]');
            if (!button) return;

            const searchId = button.dataset.searchId;
            const config = SearchLibrary[searchId];
            if (!config) {
                console.error(`Search configuration not found for id: ${searchId}`);
                return;
            }

            if (config.no_input) {
                window.open(config.urlTemplate, '_blank');
                return;
            }

            const validatorName = config.validator;
            // KEY CHANGE: Look for the function in the global ExploratoresValidators object
            const validatorFn = ExploratoresValidators[validatorName];

            if (typeof validatorFn !== 'function') {
                console.error(`Validator function "${validatorName}" not found in ExploratoresValidators.`);
                return;
            }

            const targetInputId = config.targetInput;
            const data = validatorFn(targetInputId);

            if (data) {
                let finalUrl = config.urlTemplate;
                for (const key in data) {
                    const encodedValue = encodeURIComponent(data[key]);
                    const rawValue = data[key];
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