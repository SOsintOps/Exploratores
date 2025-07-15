#!/bin/bash

# 1. Crea il file main.js
gemini files create --path "assets/js/main.js" --content-from-stdin <<'EOF'
const Exploratores = {
    init: function() {
        this.initSearchHandler();
    },

    initSearchHandler: function() {
        document.body.addEventListener('click', (event) => {
            const button = event.target.closest('[data-search-id]');
            if (!button) return;
            
            event.preventDefault();
            const searchId = button.getAttribute('data-search-id');
            const config = SearchLibrary[searchId];

            if (!config) {
                console.error(`Search configuration for "${searchId}" not found in SearchLibrary.`);
                return;
            }

            const validator = ExploratoresValidators[config.validator];
            if (typeof validator !== 'function') {
                console.error(`Validator function "${config.validator}" not found.`);
                return;
            }

            const params = validator(config.inputId);
            if (!params) return;

            let url = config.urlTemplate;
            for (const key in params) {
                const placeholder = key.toUpperCase();
                url = url.replace(new RegExp(placeholder, 'g'), encodeURIComponent(params[key]));
            }
            
            window.open(url, '_blank');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Exploratores.init();
});
EOF

# 2. Crea il file validators.js
gemini files create --path "assets/js/validators.js" --content-from-stdin <<'EOF'
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
EOF

# 3. Crea il file search-library.js
gemini files create --path "assets/js/search-library.js" --content-from-stdin <<'EOF'
const SearchLibrary = {
    "searchengines-google": { urlTemplate: "https://google.com/search?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-googledate": { urlTemplate: "https://google.com/search?q=TERM&tbs=cdr:1,cd_min:1/1/0,sbd:1", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-googlenews": { urlTemplate: "https://www.google.com/search?tbm=nws&q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-googleftp": { urlTemplate: "https://www.google.com/search?q=inurl%3Aftp%20-inurl%3A(http|https)%20TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-googleindex": { urlTemplate: "https://www.google.com/search?q=intitle%3Aindex.of+TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-googlescholar": { urlTemplate: "https://scholar.google.com/scholar?&q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-googlepatents": { urlTemplate: "https://patents.google.com/?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-bing": { urlTemplate: 'https://bing.com/search?q="TERM"', validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-bingnews": { urlTemplate: 'https://bing.com/news/search?q="TERM"', validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-yahoo": { urlTemplate: "https://search.yahoo.com/search?p=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-yandex": { urlTemplate: "https://www.yandex.com/yandsearch?text=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-baidu": { urlTemplate: "https://baidu.com/s?wd=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-searx": { urlTemplate: "https://baresearch.org/?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-duckduckgo": { urlTemplate: "https://duckduckgo.com/?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-startpage": { urlTemplate: "https://startpage.com/do/search?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-qwant": { urlTemplate: "https://www.qwant.com/?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-brave": { urlTemplate: "https://search.brave.com/search?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-wayback": { urlTemplate: "https://web.archive.org/web/*/TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-ahmia": { urlTemplate: "https://ahmia.fi/search/?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-tor66": { urlTemplate: "http://www.tor66sewebgixwhcqfnp5inzp5x5uohhdy3kvtnyfxc2e5mxiuh34iid.onion/search?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-ahmiaonion": { urlTemplate: "http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion/search/?q=TERM&action=search", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-gdark": { urlTemplate: "http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion/gdark/search.php?query=TERM&search=1", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-hiddenreviews": { urlTemplate: "http://u5lyidiw4lpkonoctpqzxgyk6xop7w7w3oho4dzzsi272rwnjhyx7ayd.onion/?s=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-onionland": { urlTemplate: "http://3bbad7fauom4d6sgppalyqddsqbf5u5p56b5k5uk2zxsy3d6ey2jobad.onion/search?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-submarine": { urlTemplate: "http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion/search.php?term=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-deepsearch": { urlTemplate: "http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion/search?q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-onioncenter": { urlTemplate: "http://5qqrlc7hw3tsgokkqifb33p3mrlpnleka2bjg7n46vih2synghb6ycid.onion/index.php?a=search&q=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" },
    "searchengines-freshonion": { urlTemplate: "http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion/?query=TERM", validator: "getAndValidateSearchTerm", inputId: "searchInput" }
};
EOF

# 4. Sovrascrivi searchengines.html con la versione refattorizzata
gemini files create --path "pages/searchengines.html" --overwrite --content-from-stdin <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Search Engines • Exploratores</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="icon" type="image/x-icon" href="../assets/images/roman-helmet.ico">
</head>
<body>

<div id="navbar-placeholder"></div>

<main>
  <h1 class="page-title">SEARCH ENGINES</h1>

  <section class="search-instructions">
    <label for="searchInput">Insert search terms here:</label>
    <div class="input-container">
      <input type="text" id="searchInput" class="input-field" placeholder="Keyword(s)" autocomplete="off">
    </div>
    <div id="page-feedback" class="feedback-message"></div>
    <div class="note"> <strong>NOTE:</strong> Please enter the search terms in the box above and then press the buttons corresponding to the type of search (Clear Web / Tor Network) you wish to perform. </div>
  </section>

  <div class="columns">
    <div class="column" id="section-searchengines-clearweb">
      <h2>Clear Web</h2>
      <section id="subsection-searchengines-google">
        <h3>Google</h3>
        <div class="button-grid">
          <button id="btn-searchengines-google" class="button" data-search-id="searchengines-google">Google</button>
          <button id="btn-searchengines-googledate" class="button" data-search-id="searchengines-googledate">Google Date</button>
          <button id="btn-searchengines-googlenews" class="button" data-search-id="searchengines-googlenews">Google News</button>
          <button id="btn-searchengines-googleftp" class="button" data-search-id="searchengines-googleftp">Google FTP</button>
          <button id="btn-searchengines-googleindex" class="button" data-search-id="searchengines-googleindex">Google Index</button>
          <button id="btn-searchengines-googlescholar" class="button" data-search-id="searchengines-googlescholar">Google Scholar</button>
          <button id="btn-searchengines-googlepatents" class="button" data-search-id="searchengines-googlepatents">Google Patents</button>
        </div>
      </section>
      <section id="subsection-searchengines-bing" style="margin-top: 1rem;">
        <h3>Bing</h3>
        <div class="button-grid">
          <button id="btn-searchengines-bing" class="button" data-search-id="searchengines-bing">Bing</button>
          <button id="btn-searchengines-bingnews" class="button" data-search-id="searchengines-bingnews">Bing News</button>
        </div>
      </section>
      <section id="subsection-searchengines-otherengines" style="margin-top: 1rem;">
        <h3>Altri Motori</h3>
        <div class="button-grid">
          <button id="btn-searchengines-yahoo" class="button" data-search-id="searchengines-yahoo">Yahoo</button>
          <button id="btn-searchengines-yandex" class="button" data-search-id="searchengines-yandex">Yandex</button>
          <button id="btn-searchengines-baidu" class="button" data-search-id="searchengines-baidu">Baidu</button>
          <button id="btn-searchengines-searx" class="button" data-search-id="searchengines-searx">Searx</button>
          <button id="btn-searchengines-duckduckgo" class="button" data-search-id="searchengines-duckduckgo">DuckDuckGo</button>
          <button id="btn-searchengines-startpage" class="button" data-search-id="searchengines-startpage">StartPage</button>
          <button id="btn-searchengines-qwant" class="button" data-search-id="searchengines-qwant">Qwant</button>
          <button id="btn-searchengines-brave" class="button" data-search-id="searchengines-brave">Brave</button>
        </div>
      </section>
      <section id="subsection-searchengines-archives" style="margin-top: 1rem;">
        <h3>Archivi e Cache</h3>
        <div class="button-grid">
          <button id="btn-searchengines-wayback" class="button" data-search-id="searchengines-wayback">Wayback</button>
          <button id="btn-searchengines-ahmia" class="button" data-search-id="searchengines-ahmia">Ahmia (Clear)</button>
        </div>
      </section>
    </div>
    <div class="column">
      <section class="section-tor-network" id="section-searchengines-tor">
        <h2>Tor Network</h2>
        <div class="button-grid">
          <button id="btn-searchengines-tor66" class="button" data-search-id="searchengines-tor66">Tor66</button>
          <button id="btn-searchengines-ahmiaonion" class="button" data-search-id="searchengines-ahmiaonion">Ahmia (Onion)</button>
          <button id="btn-searchengines-gdark" class="button" data-search-id="searchengines-gdark">GDark</button>
          <button id="btn-searchengines-hiddenreviews" class="button" data-search-id="searchengines-hiddenreviews">Hidden Reviews</button>
          <button id="btn-searchengines-onionland" class="button" data-search-id="searchengines-onionland">OnionLand</button>
          <button id="btn-searchengines-submarine" class="button" data-search-id="searchengines-submarine">Submarine</button>
          <button id="btn-searchengines-deepsearch" class="button" data-search-id="searchengines-deepsearch">DeepSearch</button>
          <button id="btn-searchengines-onioncenter" class="button" data-search-id="searchengines-onioncenter">OnionCenter</button>
          <button id="btn-searchengines-freshonion" class="button" data-search-id="searchengines-freshonion">FreshOnion</button>
        </div>
        <div class="note">
          <strong>NOTE:</strong> You must use the Tor browser to access these functionalities. The availability of .onion sites is not guaranteed.
        </div>
      </section>
    </div>
  </div>
</main>

<footer>
  <p>Exploratores 2.5 prototype <a href="license.html">License</a></p>
</footer>

<script src="../assets/js/main.js"></script>
<script src="../assets/js/validators.js"></script>
<script src="../assets/js/search-library.js"></script>
<script src="../assets/menu/navigation.js"></script>

<script>
  function updatePageState() {
    const inputs = ExploratoresValidators.getAndValidateSearchTerm('searchInput');
    const allButtons = document.querySelectorAll('.button-grid .button');
    
    allButtons.forEach(button => {
      button.disabled = !inputs;
      if (inputs) {
        button.classList.add('text-active');
      } else {
        button.classList.remove('text-active');
      }
    });
  }

  function setInitialPageState() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', updatePageState);
    }
    updatePageState();
  }

  document.addEventListener('DOMContentLoaded', setInitialPageState);
</script>

<script src="../assets/js/config.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof exploratoresConfig !== 'undefined' && exploratoresConfig.lightVersionEnabled) {
      exploratoresConfig.selectorsToHide.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => el.classList.add('hidden-in-light'));
        } catch (e) {
          console.error("Invalid selector in config.js:", selector);
        }
      });
    }
  });
</script>

</body>
</html>
EOF

echo "Processo di refactoring completato."