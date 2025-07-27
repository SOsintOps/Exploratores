// assets/js/main.js

const Exploratores = {
    init: function() {
        this.clearAllInputs();
        this.initSearchHandler();
    },

    clearAllInputs: function() {
        const inputs = document.querySelectorAll('input.input-field[type="text"]');
        inputs.forEach(input => {
            input.value = '';
        });
    },

    initSearchHandler: function() {
        document.body.addEventListener('click', (event) => {
            const button = event.target.closest('[data-search-id]');
            if (!button || button.disabled) return;
            
            event.preventDefault();
            const searchId = button.getAttribute('data-search-id');
            const config = SearchLibrary[searchId];

            if (!config) {
                console.error(`Search configuration for "${searchId}" not found.`);
                return;
            }

            if (config.no_input) {
                window.open(config.urlTemplate, '_blank');
                return;
            }

            const validator = ExploratoresValidators[config.validator];
            if (typeof validator !== 'function') {
                console.error(`Validator function "${config.validator}" not found.`);
                return;
            }
            
            const queryOverride = button.getAttribute('data-query-override');
            
            // --- CORREZIONE ---
            // Usiamo .call() per impostare esplicitamente il contesto 'this' a ExploratoresValidators
            const validationResult = validator.call(ExploratoresValidators, config, queryOverride);

            if (!validationResult.isValid) return;

            const params = validationResult.data;
            let url = config.urlTemplate;
            
            for (const key in params) {
                const placeholder = `{${key}}`;
                const value = encodeURIComponent(params[key]);
                url = url.replace(new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), value);
            }
            
            window.open(url, '_blank');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Exploratores.init();
});