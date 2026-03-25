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
        resultsContainer.classList.remove('active');
        const searchTerm = query.toLowerCase().trim();

        if (searchTerm.length < 2) {
            this.updateCounter(0);
            return;
        }

        const results = this.searchIndex.filter(item =>
            item.keywords.includes(searchTerm) || item.searchKey.includes(searchTerm)
        );

        this.updateCounter(results.length);

        if (results.length === 0) return;

        // --- Sticky header row ---
        const headerRow = document.createElement('div');
        headerRow.className = 'toolkit-search-header';

        const funcHead = document.createElement('span');
        funcHead.textContent = 'Function';
        const pageHead = document.createElement('span');
        pageHead.textContent = 'Page';
        headerRow.appendChild(funcHead);
        headerRow.appendChild(pageHead);

        // --- Scrollable body ---
        const body = document.createElement('div');
        body.className = 'toolkit-search-body';

        results.slice(0, this.maxResults).forEach(item => {
            const row = document.createElement('div');
            row.className = 'toolkit-search-row';

            const funcCell = document.createElement('a');
            funcCell.href = `pages/${item.page}`;
            funcCell.title = item.label;
            funcCell.textContent = item.label;

            const pageCell = document.createElement('a');
            const displayName = item.category || item.page.replace('.html', '').replace(/-/g, ' ');
            pageCell.href = `pages/${item.page}`;
            pageCell.title = displayName;
            pageCell.textContent = displayName;

            row.appendChild(funcCell);
            row.appendChild(pageCell);
            body.appendChild(row);
        });

        if (results.length > this.maxResults) {
            const more = document.createElement('div');
            more.className = 'toolkit-search-more';
            more.textContent = `+${results.length - this.maxResults} more`;
            body.appendChild(more);
        }

        resultsContainer.appendChild(headerRow);
        resultsContainer.appendChild(body);
        resultsContainer.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof SearchLibrary !== 'undefined') {
        ToolkitSearch.init();
    }
});
