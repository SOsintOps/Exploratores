// assets/js/main.js

const Exploratores = {
  // Inizializza le funzionalità comuni a tutte le pagine
  init: function() {
    this.initNavbar();
    this.initSearchHandler();
    this.initLightMode();
    // La logica di feedback e validazione live viene chiamata dalla pagina specifica
  },

  // Gestisce i sottomenu della navbar
  initNavbar: function() {
    document.querySelectorAll('.menu > li').forEach(item => {
      const submenu = item.querySelector('.submenu');
      if (submenu) {
        item.addEventListener('mouseenter', () => { submenu.style.display = 'block'; });
        item.addEventListener('mouseleave', () => { submenu.style.display = 'none'; });
      }
    });
  },

  // Applica la configurazione "light version"
  initLightMode: function() {
    if (typeof exploratoresConfig !== 'undefined' && exploratoresConfig.lightVersionEnabled) {
      exploratoresConfig.selectorsToHide.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.classList.add('hidden-in-light'));
      });
    }
  },

  // Gestore generico per tutti i pulsanti di ricerca data-driven
  initSearchHandler: function() {
    document.body.addEventListener('click', function(event) {
      const searchButton = event.target.closest('button[data-search-id]');
      if (!searchButton) return;

      const searchId = searchButton.dataset.searchId;
      const config = SearchLibrary[searchId];
      if (!config) {
        console.error(`Configurazione non trovata per: ${searchId}`);
        return;
      }
      
      // Se il pulsante non richiede input, apre subito l'URL
      if (config.no_input) {
        window.open(config.urlTemplate, '_blank');
        return;
      }

      // Altrimenti, esegue la validazione
      // Cerca la funzione di validazione nello scope globale (definita nella pagina)
      const validatorFunction = window[config.validator];
      if (typeof validatorFunction !== 'function') {
        console.error(`Funzione validatore non trovata: ${config.validator}`);
        return;
      }
      
      const parts = validatorFunction();
      if (parts) {
        let url = config.urlTemplate;
        for (const key in parts) {
          url = url.replace(`{${key}}`, encodeURIComponent(parts[key]));
        }
        window.open(url, '_blank');
      }
    });
  }
};

// Avvia il motore al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
  Exploratores.init();
});