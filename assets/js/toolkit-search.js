// assets/js/toolkit-search.js

const ToolkitSearch = {
    searchIndex: [],
    maxResults: (typeof TOOLKIT_SEARCH_LIMIT !== 'undefined') ? TOOLKIT_SEARCH_LIMIT : 30,

    init: function() {
        if (typeof SearchLibrary === 'undefined') {
            console.error("SearchLibrary not found. Make sure search-library.js is loaded.");
            return;
        }
        if (typeof JanuaSearchMap === 'undefined') {
            console.warn("JanuaSearchMap not found. Search labels will be auto-generated.");
        }
        this.buildIndex();
        this.attachEventListeners();
    },

    buildIndex: function() {
        this.searchIndex = Object.keys(SearchLibrary).map(key => {
            const mapEntry = (typeof JanuaSearchMap !== 'undefined') ? (JanuaSearchMap[key] || {}) : {};
            const label = mapEntry.label || key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const category = mapEntry.page || null;
            const page = key.split('-')[0] + '.html';

            return {
                id: key,
                page: page,
                label: label,
                category: category,
                keywords: key.toLowerCase().replace(/-/g, ' '),
                searchKey: label.toLowerCase()
            };
        });
    },

    attachEventListeners: function() {
        const searchInput = document.getElementById('toolkit-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.performSearch(e.target.value));
        }
    },

    updateCounter: function(count) {
        const el = document.getElementById('toolkit-search-count');
        if (el) el.textContent = count;
    },

    performSearch: function(query) {
        const resultsContainer = document.getElementById('toolkit-search-results');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = '';
        const searchTerm = query.toLowerCase().trim();

        if (searchTerm.length < 2) {
            resultsContainer.style.display = 'none';
            this.updateCounter(0);
            return;
        }

        const results = this.searchIndex.filter(item =>
            item.keywords.includes(searchTerm) || item.searchKey.includes(searchTerm)
        );

        this.updateCounter(results.length);

        if (results.length > 0) {
            const list = document.createElement('ul');
            results.slice(0, this.maxResults).forEach(item => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `pages/${item.page}`;
                link.title = item.category ? `${item.category} → ${item.page}` : `Go to ${item.page}`;

                const labelSpan = document.createElement('span');
                labelSpan.className = 'toolkit-search-label';
                labelSpan.textContent = item.label;
                link.appendChild(labelSpan);

                if (item.category) {
                    const categorySpan = document.createElement('span');
                    categorySpan.className = 'toolkit-search-category';
                    categorySpan.textContent = item.category;
                    link.appendChild(categorySpan);
                }

                listItem.appendChild(link);
                list.appendChild(listItem);
            });

            if (results.length > this.maxResults) {
                const more = document.createElement('li');
                more.className = 'toolkit-search-more';
                more.textContent = `+${results.length - this.maxResults} more results — refine your search`;
                list.appendChild(more);
            }

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
