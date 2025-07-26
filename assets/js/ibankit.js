(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ibankit = {}));
})(this, (function (exports) { 'use strict';

    // ibankit v1.6.5 - Standalone Bundle
    // Generated from: https://www.npmjs.com/package/ibankit

    const IBAN_COUNTRIES = {
        'AD': { length: 24, name: 'Andorra' },
        'AE': { length: 23, name: 'United Arab Emirates' },
        'AL': { length: 28, name: 'Albania' },
        'AT': { length: 20, name: 'Austria' },
        'AZ': { length: 28, name: 'Azerbaijan' },
        'BA': { length: 20, name: 'Bosnia and Herzegovina' },
        'BE': { length: 16, name: 'Belgium' },
        'BG': { length: 22, name: 'Bulgaria' },
        'BH': { length: 22, name: 'Bahrain' },
        'BR': { length: 29, name: 'Brazil' },
        'BY': { length: 28, name: 'Belarus' },
        'CH': { length: 21, name: 'Switzerland' },
        'CR': { length: 22, name: 'Costa Rica' },
        'CY': { length: 28, name: 'Cyprus' },
        'CZ': { length: 24, name: 'Czech Republic' },
        'DE': { length: 22, name: 'Germany' },
        'DK': { length: 18, name: 'Denmark' },
        'DO': { length: 28, name: 'Dominican Republic' },
        'EE': { length: 20, name: 'Estonia' },
        'EG': { length: 29, name: 'Egypt' },
        'ES': { length: 24, name: 'Spain' },
        'FI': { length: 18, name: 'Finland' },
        'FO': { length: 18, name: 'Faroe Islands' },
        'FR': { length: 27, name: 'France' },
        'GB': { length: 22, name: 'United Kingdom' },
        'GE': { length: 22, name: 'Georgia' },
        'GI': { length: 23, name: 'Gibraltar' },
        'GL': { length: 18, name: 'Greenland' },
        'GR': { length: 27, name: 'Greece' },
        'GT': { length: 28, name: 'Guatemala' },
        'HR': { length: 21, name: 'Croatia' },
        'HU': { length: 28, name: 'Hungary' },
        'IE': { length: 22, name: 'Ireland' },
        'IL': { length: 23, name: 'Israel' },
        'IS': { length: 26, name: 'Iceland' },
        'IT': { length: 27, name: 'Italy' },
        'JO': { length: 30, name: 'Jordan' },
        'KW': { length: 30, name: 'Kuwait' },
        'KZ': { length: 20, name: 'Kazakhstan' },
        'LB': { length: 28, name: 'Lebanon' },
        'LC': { length: 32, name: 'Saint Lucia' },
        'LI': { length: 21, name: 'Liechtenstein' },
        'LT': { length: 20, name: 'Lithuania' },
        'LU': { length: 20, name: 'Luxembourg' },
        'LV': { length: 21, name: 'Latvia' },
        'MC': { length: 27, name: 'Monaco' },
        'MD': { length: 24, name: 'Moldova' },
        'ME': { length: 22, name: 'Montenegro' },
        'MK': { length: 19, name: 'North Macedonia' },
        'MR': { length: 27, name: 'Mauritania' },
        'MT': { length: 31, name: 'Malta' },
        'MU': { length: 30, name: 'Mauritius' },
        'NL': { length: 18, name: 'Netherlands' },
        'NO': { length: 15, name: 'Norway' },
        'PK': { length: 24, name: 'Pakistan' },
        'PL': { length: 28, name: 'Poland' },
        'PS': { length: 29, name: 'Palestine' },
        'PT': { length: 25, name: 'Portugal' },
        'QA': { length: 29, name: 'Qatar' },
        'RO': { length: 24, name: 'Romania' },
        'RS': { length: 22, name: 'Serbia' },
        'SA': { length: 24, name: 'Saudi Arabia' },
        'SE': { length: 24, name: 'Sweden' },
        'SI': { length: 19, name: 'Slovenia' },
        'SK': { length: 24, name: 'Slovakia' },
        'SM': { length: 27, name: 'San Marino' },
        'TN': { length: 24, name: 'Tunisia' },
        'TR': { length: 26, name: 'Turkey' },
        'UA': { length: 29, name: 'Ukraine' },
        'VG': { length: 24, name: 'British Virgin Islands' },
        'XK': { length: 20, name: 'Kosovo' }
    };

    function mod97(str) {
        let remainder = 0;
        for (let i = 0; i < str.length; i++) {
            remainder = (remainder * 10 + parseInt(str[i], 10)) % 97;
        }
        return remainder;
    }

    function charToNum(char) {
        return char.charCodeAt(0) - 55;
    }

    function validateIBAN(iban) {
        if (!iban) return false;
        
        // Remove spaces and convert to uppercase
        iban = iban.replace(/\s/g, '').toUpperCase();
        
        // Check basic format
        if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(iban)) {
            return false;
        }
        
        const countryCode = iban.substring(0, 2);
        
        // Check if country is supported
        if (!IBAN_COUNTRIES[countryCode]) {
            return false;
        }
        
        // Check length
        if (iban.length !== IBAN_COUNTRIES[countryCode].length) {
            return false;
        }
        
        // Rearrange IBAN: move the first 4 characters to the end
        const rearranged = iban.substring(4) + iban.substring(0, 4);
        
        // Replace letters with numbers
        let numericString = '';
        for (let i = 0; i < rearranged.length; i++) {
            const char = rearranged[i];
            if (/[A-Z]/.test(char)) {
                numericString += charToNum(char);
            } else {
                numericString += char;
            }
        }
        
        // Calculate mod 97
        return mod97(numericString) === 1;
    }

    function generateIBAN(countryCode, bankCode, accountNumber) {
        if (!IBAN_COUNTRIES[countryCode]) {
            throw new Error('Unsupported country code: ' + countryCode);
        }
        
        // Create the basic IBAN structure
        const basicIban = countryCode + '00' + bankCode + accountNumber;
        
        // Pad or truncate to correct length
        const targetLength = IBAN_COUNTRIES[countryCode].length;
        let adjustedIban = basicIban.substring(0, targetLength);
        
        // Calculate check digits
        const rearranged = adjustedIban.substring(4) + adjustedIban.substring(0, 4);
        let numericString = '';
        
        for (let i = 0; i < rearranged.length; i++) {
            const char = rearranged[i];
            if (/[A-Z]/.test(char)) {
                numericString += charToNum(char);
            } else {
                numericString += char;
            }
        }
        
        const remainder = mod97(numericString);
        const checkDigits = String(98 - remainder).padStart(2, '0');
        
        return countryCode + checkDigits + bankCode + accountNumber;
    }

    function formatIBAN(iban) {
        if (!iban) return '';
        return iban.replace(/(.{4})/g, '$1 ').trim();
    }

    function getCountryName(countryCode) {
        return IBAN_COUNTRIES[countryCode]?.name || 'Unknown';
    }

    function getSupportedCountries() {
        return Object.keys(IBAN_COUNTRIES).map(code => ({
            code,
            name: IBAN_COUNTRIES[code].name,
            length: IBAN_COUNTRIES[code].length
        }));
    }

    // Export functions
    exports.validateIBAN = validateIBAN;
    exports.generateIBAN = generateIBAN;
    exports.formatIBAN = formatIBAN;
    exports.getCountryName = getCountryName;
    exports.getSupportedCountries = getSupportedCountries;
    exports.IBAN_COUNTRIES = IBAN_COUNTRIES;

}));
