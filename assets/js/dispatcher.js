// assets/js/dispatcher.js

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('indicator-input');
    const resultsContainer = document.getElementById('results-container');
    let debounceTimer;

    if (!input || !resultsContainer) {
        console.error("Dispatcher script: Manca l'input o il container dei risultati.");
        return;
    }

    const typeToValidatorMap = {
        'EMAIL': ['getAndValidateEmail', 'getAndValidateGmail', 'getAndValidateCompanyEmail'],
        'DOMAIN': ['getAndValidateDomain'],
        'IPV4': ['getAndValidateIpAddress', 'getAndValidateNetworksDbRange'],
        'USERNAME': ['getAndValidateUsername', 'getAndValidateTumblrUsername', 'getAndValidateSmatVkUsername', 'getAndValidateVkUsername', 'getAndValidateYoutubeUsername'],
        'IBAN': ['getAndValidateIban'],
        'VEHICLE_VIN': ['getAndValidateVin'],
        'BTC_ADDRESS': ['getAndValidateBtcAddress'],
        'PHONE_E164': ['getAndValidateIntlPhone'],
        'COORDINATES': ['getAndValidateCoordinates', 'getAndValidateZillowCoords'],
        'GENERIC_TEXT': ['getAndValidateSearchTerm', 'getAndValidateNames', 'getAndValidateOfficerName', 'getAndValidateCompanyName', 'getAndValidateDocSearchTerm', 'getAndValidateKeybaseQuery']
    };

    const updateResults = () => {
        const query = input.value.trim();
        resultsContainer.innerHTML = '';

        if (query.length < 2) return;

        const indicatorType = classifyIndicator(query);
        const validatorNames = typeToValidatorMap[indicatorType] || [];
        
        const relevantButtons = findRelevantButtons(validatorNames);
        renderButtons(relevantButtons, query);
    };

    const findRelevantButtons = (validatorNames) => {
        const groupedButtons = {};
        const validatorSet = new Set(validatorNames);

        for (const searchId in SearchLibrary) {
            const config = SearchLibrary[searchId];
            const mapInfo = JanuaSearchMap[searchId];

            if (mapInfo) {
                const isValidatorMatch = validatorSet.has(config.validator);
                const isSearchEngine = mapInfo.page === 'Search Engines';

                // Aggiungi il pulsante se il suo validatore corrisponde O se appartiene alla pagina "Search Engines"
                if (isValidatorMatch || isSearchEngine) {
                    const pageTitle = mapInfo.page || 'General Tools';
                    if (!groupedButtons[pageTitle]) {
                        groupedButtons[pageTitle] = [];
                    }
                    // Evita di aggiungere duplicati
                    if (!groupedButtons[pageTitle].some(btn => btn.searchId === searchId)) {
                        groupedButtons[pageTitle].push({
                            id: `btn-janua-${searchId}`,
                            searchId: searchId,
                            label: mapInfo.label
                        });
                    }
                }
            }
        }
        return groupedButtons;
    };

    const renderButtons = (groupedButtons, query) => {
        const pageTitles = Object.keys(groupedButtons);
        
        // Assicura che "Search Engines" sia sempre l'ultima sezione
        const sortedPageTitles = pageTitles
            .filter(title => title !== 'Search Engines')
            .sort();
        if (groupedButtons['Search Engines']) {
            sortedPageTitles.push('Search Engines');
        }

        for (const pageTitle of sortedPageTitles) {
            const buttons = groupedButtons[pageTitle];
            
            const section = document.createElement('section');
            section.className = 'search-instructions';
            
            const title = document.createElement('h2');
            title.textContent = pageTitle;
            section.appendChild(title);
            
            const buttonGrid = document.createElement('div');
            buttonGrid.className = 'button-grid';

            buttons.forEach(btnInfo => {
                const button = document.createElement('button');
                button.id = btnInfo.id;
                button.className = 'button text-active';
                button.textContent = btnInfo.label;
                button.setAttribute('data-search-id', btnInfo.searchId);
                button.setAttribute('data-query-override', query);
                buttonGrid.appendChild(button);
            });

            section.appendChild(buttonGrid);
            resultsContainer.appendChild(section);
        }
    };

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updateResults, 250);
    });
});