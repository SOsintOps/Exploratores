const ExploratoresValidators = {
    getAndValidateSearchTerm: function() {
        // La funzione ora sa quale input cercare, non ha bisogno di argomenti
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

    getAndValidateNames: function() {
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

    getAndValidateUsPhone: function() {
        const area = document.getElementById('areaCode')?.value.trim();
        const prefix = document.getElementById('prefixCode')?.value.trim();
        const line = document.getElementById('lineNumber')?.value.trim();
        const feedbackEl = document.getElementById('phoneIntelDisplay');

        if (!area || !prefix || !line || area.length !== 3 || prefix.length !== 3 || line.length !== 4) {
            if (feedbackEl) feedbackEl.textContent = "";
            return null;
        }

        const queryVariations = [
            `"${area}${prefix}${line}"`,
            `"${area}-${prefix}-${line}"`,
            `"(${area}) ${prefix}-${line}"`,
            `"${area}.${prefix}.${line}"`,
            `"${area} ${prefix} ${line}"`
        ];
        
        return {
            area: area,
            prefix: prefix,
            line: line,
            full: `${area}${prefix}${line}`,
            full_dash: `${area}-${prefix}-${line}`,
            e164: `1${area}${prefix}${line}`,
            google_query: queryVariations.join(" OR ")
        };
    }
};