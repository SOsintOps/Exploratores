// assets/js/toolkit-search.js

const ToolkitSearch = {
    searchIndex: [],

    init: function() {
        if (typeof SearchLibrary === 'undefined') {
            console.error("SearchLibrary not found. Make sure search-library.js is loaded.");
            return;
        }
        this.buildIndex();
        this.attachEventListeners();
    },

    buildIndex: function() {
        this.searchIndex = Object.keys(SearchLibrary).map(key => {
            const page = key.split('-')[0] + '.html';
            // Crea una descrizione leggibile dalla chiave
            const description = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            return {
                id: key,
                page: page,
                description: description,
                keywords: key.toLowerCase().replace(/-/g, ' ')
            };
        });
    },

    attachEventListeners: function() {
        const searchInput = document.getElementById('toolkit-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.performSearch(e.target.value));
        }
    },

    performSearch: function(query) {
        const resultsContainer = document.getElementById('toolkit-search-results');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = '';
        const searchTerm = query.toLowerCase().trim();

        if (searchTerm.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        const results = this.searchIndex.filter(item => item.keywords.includes(searchTerm));

        if (results.length > 0) {
            const list = document.createElement('ul');
            results.slice(0, 10).forEach(item => { // Mostra solo i primi 10 risultati
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `pages/${item.page}`;
                link.textContent = item.description;
                link.title = `Go to ${item.page}`;
                listItem.appendChild(link);
                list.appendChild(listItem);
            });
            resultsContainer.appendChild(list);
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof SearchLibrary !== 'undefined') {
        ToolkitSearch.init();
    }
});