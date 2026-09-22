// assets/js/main.js

const Exploratores = {
    init: function() {
        this.clearAllInputs();
        this.markDisabledTools();
        this.initSearchHandler();
    },

    // Entries flagged "disabled" in the catalogue (set by the weekly link
    // checker once a host is confirmed dead/unreliable) are greyed out and
    // never opened. Page scripts may toggle the disabled attribute as the
    // user types, so the class and the guard in the click handler are what
    // actually keep a dead tool shut.
    markDisabledTools: function() {
        document.querySelectorAll('[data-search-id]').forEach(button => {
            const config = SearchLibrary[button.getAttribute('data-search-id')];
            if (!config || !config.disabled) return;
            button.disabled = true;
            button.classList.add('button-dead');
            button.title = `Host confirmed unreachable on ${config.disabled} by the weekly link check`;
        });
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

            if (config.disabled) return;   // confirmed-dead host, see markDisabledTools

            if (config.no_input) {
                window.open(config.urlTemplate, '_blank', 'noopener,noreferrer');
                return;
            }

            const validator = ExploratoresValidators[config.validator];
            if (typeof validator !== 'function') {
                console.error(`Validator function "${config.validator}" not found.`);
                return;
            }
            
            const queryOverride = button.hasAttribute('data-query-override') ? button.getAttribute('data-query-override') : undefined;
            const validationResult = validator.call(ExploratoresValidators, config, queryOverride);

            if (!validationResult.isValid) return;

            const params = validationResult.data;
            let url = config.urlTemplate;
            
            for (const key in params) {
                const placeholder = `{${key}}`;
                const value = encodeURIComponent(params[key]);
                url = url.replace(new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), value);
            }
            
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Exploratores.init();
});