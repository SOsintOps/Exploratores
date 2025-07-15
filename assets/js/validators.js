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
    }
};