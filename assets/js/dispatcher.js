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
        'URL': ['getAndValidateUrl', 'getAndValidateVimeoImageUrl', 'getAndValidateImageUrl', 'getAndValidateFaviconUrl'],
        'IPV4': ['getAndValidateIpAddress', 'getAndValidateNetworksDbRange'],
        'USERNAME': ['getAndValidateUsername', 'getAndValidateTumblrUsername', 'getAndValidateSmatVkUsername', 'getAndValidateVkUsername', 'getAndValidateYoutubeUsername', 'getAndValidateRedditUser', 'getAndValidateHnUser', 'getAndValidateTgUser', 'getAndValidateKeybaseQuery'],
        'PERSON_NAME': ['getAndValidateNames', 'getAndValidateOfficerName', 'getAndValidateXRealName'],
        'COMPANY_NAME': ['getAndValidateCompanyName'],
        'IBAN': ['getAndValidateIban'],
        'SSN': ['getAndValidateSsn'],
        'VEHICLE_VIN': ['getAndValidateVin'],
        'BTC_ADDRESS': ['getAndValidateBtcAddress'],
        'CRYPTO_ETH': ['getAndValidateOtherCryptoAddress'],
        'CRYPTO_XMR': ['getAndValidateOtherCryptoAddress'],
        'PHONE_E164': ['getAndValidateIntlPhone'],
        'PHONE_NATIONAL': ['getAndValidateIntlPhone', 'getAndValidateCompanyPhone'],
        'COORDINATES': ['getAndValidateCoordinates', 'getAndValidateZillowCoords'],
        'HASH_MD5': ['getAndValidateMd5Hash', 'getAndValidateAnalysisQuery'],
        'HASH_SHA1': ['getAndValidateAnalysisQuery'],
        'HASH_SHA256': ['getAndValidateAnalysisQuery'],
        'ADSENSE_ID': ['getAndValidateAdsenseId'],
        'ANALYTICS_ID': ['getAndValidateAnalyticsId'],
        'YOUTUBE_VIDEO_ID': ['getAndValidateYoutubeId'],
        'YOUTUBE_CHANNEL_ID': ['getAndValidateYoutubeChannelId'],
        'NUMERIC_ID': ['getAndValidateXListId', 'getAndValidateXMemoryId', 'getAndValidateFacebookUserId', 'getAndValidateInstagramUserId', 'getAndValidateVkUserId'],
        'GENERIC_TEXT': ['getAndValidateSearchTerm', 'getAndValidateDocSearchTerm', 'getAndValidateVideoTerm', 'getAndValidateImageTerm', 'getAndValidateRedditTerm', 'getAndValidateHnTerm', 'getAndValidate4chanTerm', 'getAndValidateDiscordTerm', 'getAndValidateTgKey'],
        
        // --- Nuovi sotto-tipi da URL ---
        'VK_USERNAME': ['getAndValidateVkUsername', 'getAndValidateUsername'],
        'X_USERNAME': ['getAndValidateXAccountUsername', 'getAndValidateUsername'],
        'INSTAGRAM_USERNAME': ['getAndValidateInstagramUsername', 'getAndValidateUsername'],
        'TELEGRAM_USERNAME': ['getAndValidateTgUser', 'getAndValidateUsername'],
        'FACEBOOK_USERNAME': ['getAndValidateFacebookUsername', 'getAndValidateUsername'],
        'LINKEDIN_PROFILE': ['getAndValidateLinkedinProfile', 'getAndValidateUsername']
    };

    const updateResults = () => {
        const query = input.value.trim();
        resultsContainer.innerHTML = '';

        if (query.length < 2) return;

        const classifiedResults = classifyIndicator(query);
        renderButtons(classifiedResults);
    };

    const findButtonsForType = (type) => {
        const validatorNames = typeToValidatorMap[type] || [];
        if (validatorNames.length === 0) return [];

        const buttons = [];
        const validatorSet = new Set(validatorNames);

        for (const searchId in SearchLibrary) {
            const config = SearchLibrary[searchId];
            if (validatorSet.has(config.validator)) {
                const mapInfo = JanuaSearchMap[searchId];
                if (mapInfo) {
                    buttons.push({
                        id: `btn-janua-${searchId}`,
                        searchId: searchId,
                        label: mapInfo.label,
                        page: mapInfo.page || 'General Tools'
                    });
                }
            }
        }
        return buttons;
    };

    const renderButtons = (classifiedResults) => {
        const relevantThreshold = 0.5;
        const finalGroupedButtons = {};

        // Aggiunge sempre i motori di ricerca generici
        const searchEngineButtons = findButtonsForType('GENERIC_TEXT')
            .filter(btn => JanuaSearchMap[btn.searchId]?.page === 'Search Engines');

        if (searchEngineButtons.length > 0) {
            finalGroupedButtons['Search Engines'] = searchEngineButtons;
        }

        classifiedResults.forEach(result => {
            if (result.score >= relevantThreshold) {
                const buttons = findButtonsForType(result.type);
                buttons.forEach(btn => {
                    if (!finalGroupedButtons[btn.page]) {
                        finalGroupedButtons[btn.page] = [];
                    }
                    // Aggiungi il valore estratto al pulsante per l'override
                    btn.queryValue = result.value || input.value.trim();
                    if (!finalGroupedButtons[btn.page].some(b => b.searchId === btn.searchId)) {
                        finalGroupedButtons[btn.page].push(btn);
                    }
                });
            }
        });

        // Rendering delle sezioni
        const pageTitles = Object.keys(finalGroupedButtons).sort();
        
        pageTitles.forEach(pageTitle => {
            const buttons = finalGroupedButtons[pageTitle];
            
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
                button.setAttribute('data-query-override', btnInfo.queryValue);
                buttonGrid.appendChild(button);
            });

            section.appendChild(buttonGrid);
            resultsContainer.appendChild(section);
        });
    };

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updateResults, 250);
    });
});