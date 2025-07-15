const ExploratoresValidators = {
    getAndValidateSearchTerm: function(inputId) {
        const inputElement = document.getElementById(inputId);
        const feedbackElement = document.getElementById('page-feedback');
        const value = inputElement ? inputElement.value.trim() : "";

        if (!value) {
            if (feedbackElement) feedbackElement.textContent = "Please enter a search term.";
            return null;
        }

        if (feedbackElement) feedbackElement.textContent = "";
        return { term: value };
    }
};
