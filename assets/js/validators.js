const ExploratoresValidators = {
    getAndValidateSearchTerm: function(config) {
        const inputElement = document.getElementById('searchInput');
        const feedbackElement = document.getElementById('page-feedback');
        const value = inputElement ? inputElement.value.trim() : "";

        if (!value) {
            if (feedbackElement) feedbackElement.textContent = "Please enter a search term.";
            return null;
        }

        if (feedbackElement) feedbackElement.textContent = "";
        return { term: value };
    },

    getAndValidateNames: function(config) {
        const firstName = document.getElementById('firstName')?.value.trim();
        const lastName = document.getElementById('lastName')?.value.trim();
        const feedbackEl = document.getElementById('name-feedback');

        if (!firstName && !lastName) {
            if (feedbackEl) {
                feedbackEl.textContent = "Please enter at least a first or last name.";
                feedbackEl.className = 'feedback-message';
            }
            return null;
        }
        
        if (feedbackEl) {
            feedbackEl.textContent = "Ready for search.";
            feedbackEl.className = 'feedback-message feedback-info';
        }

        const fullName = `${firstName} ${lastName}`.trim();
        const fullNameDash = [firstName, lastName].filter(Boolean).join('-');

        return {
            firstname: firstName,
            lastname: lastName,
            fullname: fullName,
            fullnamedash: fullNameDash,
            fullnamedashlower: fullNameDash.toLowerCase()
        };
    },
    
    getAndValidateUsPhone: function(config) {
        const area = document.getElementById('areaCode')?.value.trim();
        const prefix = document.getElementById('prefixCode')?.value.trim();
        const line = document.getElementById('lineNumber')?.value.trim();
        
        if (!area || !prefix || !line || area.length !== 3 || prefix.length !== 3 || line.length !== 4) {
            return null;
        }

        const queryVariations = [`"${area}${prefix}${line}"`, `"${area}-${prefix}-${line}"`, `"(${area}) ${prefix}-${line}"`, `"${area}.${prefix}.${line}"`, `"${area} ${prefix} ${line}"`];
        
        return {
            area: area, prefix: prefix, line: line,
            full: `${area}${prefix}${line}`,
            full_dash: `${area}-${prefix}-${line}`,
            e164: `1${area}${prefix}${line}`,
            google_query: queryVariations.join(" OR ")
        };
    },

    getAndValidateIntlPhone: function(config) {
        const countryCode = document.getElementById('countryCodeInput')?.value.trim();
        const nationalNum = document.getElementById('nationalNumberInput')?.value.trim();
        const countryIso = document.getElementById('countryLettersInput')?.value.trim().toUpperCase();
        
        const rules = config.validation_rules || {};
        if (rules.requireCountryCode && !countryCode) return null;
        if (rules.requireNatNum && !nationalNum) return null;
        if (rules.requireCountryLetters && !countryIso) return null;
        if (!countryCode && !nationalNum) return null;

        const e164 = countryCode.replace('+', '') + nationalNum;
        const queryVariations = [`"${countryCode}${nationalNum}"`, `"${countryCode} ${nationalNum}"`];

        return {
            e164: e164,
            countrycode: countryCode.replace('+', ''),
            nat_num: nationalNum,
            country_iso: countryIso,
            google_query: queryVariations.join(" OR "),
            dt_plus_cc_num: `${countryCode}.${nationalNum}`,
            dt_plus_cc_0num: `${countryCode}.0${nationalNum}`,
            dt_num_only: nationalNum,
            dt_0num_only: `0${nationalNum}`,
            dt_enum_generic: `e${nationalNum}`,
            dt_num_generic: nationalNum
        };
    }
};