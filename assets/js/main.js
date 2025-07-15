const Exploratores = {
    init: function() {
        this.initSearchHandler();
    },

    initSearchHandler: function() {
        document.body.addEventListener('click', (event) => {
            const button = event.target.closest('[data-search-id]');
            if (!button) return;
            
            event.preventDefault();
            const searchId = button.getAttribute('data-search-id');
            const config = SearchLibrary[searchId];

            if (!config) {
                console.error(`Search configuration for "${searchId}" not found in SearchLibrary.`);
                return;
            }

            const validator = ExploratoresValidators[config.validator];
            if (typeof validator !== 'function') {
                console.error(`Validator function "${config.validator}" not found.`);
                return;
            }

            const params = validator(config.inputId);
            if (!params) return;

            let url = config.urlTemplate;
            for (const key in params) {
                const placeholder = key.toUpperCase();
                url = url.replace(new RegExp(placeholder, 'g'), encodeURIComponent(params[key]));
            }
            
            window.open(url, '_blank');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Exploratores.init();
});
