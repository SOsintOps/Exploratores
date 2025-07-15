// =================================================================
// EXPLORATORES TOOLKIT - MAIN CONFIGURATION FILE
// =================================================================

// Global data constants for use across the application
const italianProvinces = new Set([
    'AG', 'AL', 'AN', 'AO', 'AR', 'AP', 'AT', 'AV', 'BA', 'BT', 'BL', 'BN',
    'BG', 'BI', 'BO', 'BZ', 'BS', 'BR', 'CA', 'CL', 'CB', 'CE', 'CT', 'CZ',
    'CH', 'CO', 'CS', 'CR', 'KR', 'CN', 'EN', 'FM', 'FE', 'FI', 'FG', 'FC',
    'FR', 'GE', 'GO', 'GR', 'IM', 'IS', 'SP', 'AQ', 'LT', 'LE', 'LC', 'LI',
    'LO', 'LU', 'MC', 'MN', 'MS', 'MT', 'ME', 'MI', 'MO', 'MB', 'NA', 'NO',
    'NU', 'OR', 'PD', 'PA', 'PR', 'PV', 'PG', 'PU', 'PE', 'PC', 'PI', 'PT',
    'PN', 'PZ', 'PO', 'RG', 'RA', 'RC', 'RE', 'RI', 'RN', 'RM', 'RO', 'SA',
    'SS', 'SV', 'SI', 'SR', 'SO', 'TA', 'TE', 'TR', 'TO', 'TP', 'TN', 'TV',
    'TS', 'UD', 'VA', 'VE', 'VB', 'VC', 'VR', 'VV', 'VI', 'VT'
]);


// Main configuration object for the toolkit
const exploratoresConfig = {
    // Set to 'true' to enable the "light" version and hide the elements listed below.
    lightVersionEnabled: true,

    // This is the list of elements to hide.
    // Use valid CSS selectors to identify them.
    selectorsToHide: [
        // Example for Searchengines.html: Hide the entire Tor Network section
        '#column-searchengines-tor',

        // You can add other selectors here, for example:
        // '#section-address-it-group',
    ]
};