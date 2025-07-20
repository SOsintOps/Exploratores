const ExploratoresValidators = {
    getAndValidateSearchTerm: function(config) {
        const inputElement = document.getElementById('searchInput');
        const value = inputElement ? inputElement.value.trim() : "";
        if (!value) {
            return { isValid: false, message: "Please enter a search term." };
        }
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateNames: function(config) {
        const firstName = document.getElementById('firstName')?.value.trim();
        const lastName = document.getElementById('lastName')?.value.trim();
        if (!firstName && !lastName) {
            return { isValid: false, message: "Please enter at least a first or last name." };
        }
        const fullName = `${firstName} ${lastName}`.trim();
        const fullNameDash = [firstName, lastName].filter(Boolean).join('-');
        return {
            isValid: true,
            data: {
                firstname: firstName,
                lastname: lastName,
                fullname: fullName,
                fullnamedash: fullNameDash,
                fullnamedashlower: fullNameDash.toLowerCase()
            },
            message: "Ready for search."
        };
    },
    
    getAndValidateUsPhone: function(config) {
        const area = document.getElementById('areaCode')?.value.trim();
        const prefix = document.getElementById('prefixCode')?.value.trim();
        const line = document.getElementById('lineNumber')?.value.trim();
        if (!area || !prefix || !line || area.length !== 3 || prefix.length !== 3 || line.length !== 4) {
            return { isValid: false, message: "Please enter a complete 10-digit phone number." };
        }
        const queryVariations = [`"${area}${prefix}${line}"`, `"${area}-${prefix}-${line}"`, `"(${area}) ${prefix}-${line}"`, `"${area}.${prefix}.${line}"`, `"${area} ${prefix} ${line}"`];
        return {
            isValid: true,
            data: {
                area: area, prefix: prefix, line: line,
                full: `${area}${prefix}${line}`,
                full_dash: `${area}-${prefix}-${line}`,
                e164: `1${area}${prefix}${line}`,
                google_query: queryVariations.join(" OR ")
            },
            message: "Ready for search."
        };
    },

    getAndValidateIntlPhone: function(config) {
        const countryCode = document.getElementById('countryCodeInput')?.value.trim();
        const nationalNum = document.getElementById('nationalNumberInput')?.value.trim();
        const countryIso = document.getElementById('countryLettersInput')?.value.trim().toUpperCase();
        
        const rules = config.validation_rules || {};
        if (rules.requireCountryCode && !countryCode) return { isValid: false, message: "Country code is required." };
        if (rules.requireNatNum && !nationalNum) return { isValid: false, message: "National number is required." };
        if (rules.requireCountryLetters && !countryIso) return { isValid: false, message: "Country ISO is required." };
        if (!countryCode && !nationalNum) return { isValid: false, message: "Enter a phone number." };

        const e164 = countryCode.replace('+', '') + nationalNum;
        const queryVariations = [`"${countryCode}${nationalNum}"`, `"${countryCode} ${nationalNum}"`];
        return {
            isValid: true,
            data: {
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
            },
            message: "Ready for search."
        };
    },

    getAndValidateOfficerName: function(config) {
        const officerName = document.getElementById('officerNameInput')?.value.trim();
        if (!officerName) {
            return { isValid: false, message: "Please enter an officer name." };
        }
        return { isValid: true, data: { officername: officerName }, message: "Ready for search." };
    },

    getAndValidateUsOfficerName: function(config) {
        const firstName = document.getElementById('officerSearchFirstName')?.value.trim();
        const lastName = document.getElementById('officerSearchLastName')?.value.trim();
        if (!firstName || !lastName) {
            return { isValid: false, message: "Please enter both first and last name." };
        }
        return { isValid: true, data: { firstname: firstName, lastname: lastName }, message: "Ready for search." };
    },

    getAndValidateCompanyName: function(config) {
        const companyName = document.getElementById('companyNameInput')?.value.trim();
        if (!companyName) {
            return { isValid: false, message: "Please enter a company name." };
        }
        return { isValid: true, data: { companyname: companyName }, message: "Ready for search." };
    },

    getAndValidateCompanyEmail: function(config) {
        const email = document.getElementById('companyEmailInput')?.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return { isValid: false, message: "Please enter an email address." };
        }
        if (!emailRegex.test(email)) {
            return { isValid: false, message: "Invalid email format." };
        }
        return { isValid: true, data: { email: email }, message: "Ready for search." };
    },

    getAndValidateCompanyPhone: function(config) {
        const phone = document.getElementById('companyPhoneInput')?.value.trim();
        const phoneRegex = /^[0-9\s-()+]+$/;
        if (!phone) {
            return { isValid: false, message: "Please enter a phone number." };
        }
        if (!phoneRegex.test(phone)) {
            return { isValid: false, message: "Invalid phone number format." };
        }
        return { isValid: true, data: { phone: phone }, message: "Ready for search." };
    },

    getAndValidateSsn: function(config) {
        const ssn = document.getElementById('ssnInput')?.value.trim();
        const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
        if (!ssn) {
            return { isValid: false, message: "Please enter an SSN." };
        }
        if (!ssnRegex.test(ssn)) {
            return { isValid: false, message: "Invalid SSN format (XXX-XX-XXXX)." };
        }
        return { isValid: true, data: { ssn: ssn }, message: "Ready for search." };
    },

    getAndValidateEmail: function(config) {
        const email = document.getElementById('emailInput')?.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return { isValid: false, message: "Please enter an email address." };
        }
        if (!emailRegex.test(email)) {
            return { isValid: false, message: "Invalid email format." };
        }
        return { isValid: true, data: { email: email }, message: "Valid email format." };
    },

    getAndValidateGmail: function(config) {
        // CORREZIONE: Usa il riferimento diretto all'oggetto invece di 'this'
        const emailValidation = ExploratoresValidators.getAndValidateEmail(config);
        
        if (!emailValidation.isValid) {
            return emailValidation;
        }
        const emailParts = emailValidation.data.email.split('@');
        if (emailParts.length !== 2 || emailParts[1].toLowerCase() !== 'gmail.com') {
            return { isValid: false, message: "This function requires a @gmail.com address." };
        }
        return { isValid: true, data: { localpart: emailParts[0] }, message: "Valid Gmail address." };
    },
	// AGGIUNGI QUESTE FUNZIONI A validators.js

    getAndValidateUsername: function(config) {
        const username = document.getElementById('usernameInput')?.value.trim();
        if (!username) {
            return { isValid: false, message: "Please enter a username." };
        }
        return { isValid: true, data: { username: username }, message: "Ready for search." };
    },

    getAndValidateTumblrUsername: function(config) {
        const validation = ExploratoresValidators.getAndValidateUsername(config);
        if (!validation.isValid) {
            return validation;
        }
        // Tumblr URLs non ammettono caratteri speciali tranne il trattino
        const cleanUsername = validation.data.username.replace(/[^a-zA-Z0-9-]/g, '');
        if (!cleanUsername) {
            return { isValid: false, message: "Invalid username format for Tumblr." };
        }
        validation.data.username = cleanUsername;
        return validation;
    },

    getAndValidateSmatVkUsername: function(config) {
        const validation = ExploratoresValidators.getAndValidateUsername(config);
        if (!validation.isValid) {
            return validation;
        }
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        validation.data.enddate = `${year}-${month}-${day}`;
        return validation;
    }
};