// assets/js/validators.js

const ExploratoresValidators = {
    /**
     * Validates a single input to ensure it is not empty.
     * @param {string} elementId - The ID of the input element to validate.
     * @returns {object|null} An object with a 'term' key if valid, otherwise null.
     */
    getAndValidateSingleInput: function(elementId) {
        const inputElement = document.getElementById(elementId);
        if (!inputElement) return null;
        
        const value = inputElement.value.trim();
        return value ? { term: value } : null;
    },

    /**
     * Validates a username (alias for getAndValidateSingleInput for clarity).
     */
    getAndValidateUsername: function(elementId) {
        return this.getAndValidateSingleInput(elementId);
    },
    
    /**
     * Validates a URL (alias for getAndValidateSingleInput for clarity).
     */
    getAndValidateUrl: function(elementId) {
        return this.getAndValidateSingleInput(elementId);
    },

    /**
     * Validates an input to ensure it is a numeric value.
     */
    getAndValidateNumeric: function(elementId) {
        const input = document.getElementById(elementId);
        const value = input ? input.value.trim() : '';
        // Allows for negative numbers (e.g., favicon hash)
        return /^-?\d+$/.test(value) ? { term: value } : null;
    },

    /**
     * Gets and cleans a domain name, removing http/https/www prefixes and trailing slashes.
     */
    getAndValidateDomain: function(elementId) {
        const input = document.getElementById(elementId);
        if (!input) return null;
        
        let value = input.value.trim();
        if (!value) return null;

        value = value.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').replace(/\/$/, '');
        
        return value ? { term: value } : null;
    },
    
    /**
     * Validates fields for the X/Twitter search by year.
     */
    getAndValidateYearSearch: function() {
        const term = document.getElementById('input-x-yearTerm').value.trim();
        const year = document.getElementById('input-x-yearNum').value.trim();
        if (term && /^\d{4}$/.test(year)) {
            return { term: term, year: year };
        }
        return null;
    },

    /**
     * Validates fields for a US address.
     */
    getAndValidateUsAddress: function() {
        const values = {
            usNum: document.getElementById('input-address-usNum').value.trim(),
            usStreet: document.getElementById('input-address-usStreet').value.trim(),
            usCity: document.getElementById('input-address-usCity').value.trim(),
            usState: document.getElementById('input-address-usState').value.trim(),
            usZip: document.getElementById('input-address-usZip').value.trim()
        };
        if (values.usStreet && (values.usCity || values.usZip)) {
            return values;
        }
        return null;
    },

    /**
     * Validates fields for an international address.
     */
    getAndValidateIntlAddress: function() {
        const values = {
            intlNum: document.getElementById('input-address-intlNum').value.trim(),
            intlStreet: document.getElementById('input-address-intlStreet').value.trim(),
            intlCity: document.getElementById('input-address-intlCity').value.trim(),
            intlZip: document.getElementById('input-address-intlZip').value.trim(),
            intlRegion: document.getElementById('input-address-intlRegion').value.trim()
        };
        if (values.intlStreet && values.intlCity && values.intlZip) {
            return values;
        }
        return null;
    },

    /**
     * Validates fields for an Italian company search, including province.
     */
    getAndValidateItCompanies: function() {
        const values = {
            itCompany: document.getElementById('input-address-itCompany').value.trim(),
            itCity: document.getElementById('input-address-itCity').value.trim(),
            itProv: document.getElementById('input-address-itProv').value.trim()
        };
        const provinceIsValid = typeof italianProvinces !== 'undefined' && italianProvinces.has(values.itProv.toUpperCase());
        if (values.itCompany && values.itCity && provinceIsValid) {
            return values;
        }
        return null;
    },
    
    /**
     * Validates fields for an Italian people search.
     */
    getAndValidateItPeople: function() {
        const values = {
            itFirst: document.getElementById('input-address-itFirst').value.trim(),
            itLast: document.getElementById('input-address-itLast').value.trim(),
            itCityP: document.getElementById('input-address-itCityP').value.trim(),
            itProvP: document.getElementById('input-address-itProvP').value.trim()
        };
        const provinceIsValid = typeof italianProvinces !== 'undefined' && italianProvinces.has(values.itProvP.toUpperCase());
        if ((values.itFirst || values.itLast) && values.itCityP && provinceIsValid) {
            return values;
        }
        return null;
    },

    /**
     * Validates fields for the Pagine Gialle (Italian Yellow Pages) search.
     */
    getAndValidateItYellow: function() {
        const values = {
            itAct: document.getElementById('input-address-itAct').value.trim(),
            itLoc: document.getElementById('input-address-itLoc').value.trim()
        };
        if (values.itAct && values.itLoc) {
            return values;
        }
        return null;
    },
	/**
     * Validates the main search term input on the Search Engines page.
     */
    getAndValidateSearchTerm: function() {
        const inputElement = document.getElementById('input-searchengines-term');
        if (!inputElement) return null;
        
        const value = inputElement.value.trim();
        return value ? { term: value } : null;
    }
};