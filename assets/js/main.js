const Exploratores = {
    init: function() {
        this.initSearchHandler();
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

            // Non fare nulla se il bottone non richiede input validato
            if (config.no_input) {
                window.open(config.urlTemplate, '_blank');
                return;
            }

            const validator = ExploratoresValidators[config.validator];
            if (typeof validator !== 'function') {
                console.error(`Validator function "${config.validator}" not found.`);
                return;
            }

            // La chiamata al validatore ora è generica
            const params = validator();
            if (!params) return;

            let url = config.urlTemplate;
            for (const key in params) {
                // Sostituisce i placeholder come {key}
                const placeholder = `{${key}}`;
                url = url.replace(new RegExp(placeholder, 'g'), encodeURIComponent(params[key]));
            }
            
            window.open(url, '_blank');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Exploratores.init();
});