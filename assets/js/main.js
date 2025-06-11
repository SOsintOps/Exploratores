// assets/js/main.js

const Exploratores = {
  // Inizializza le funzionalità comuni a tutte le pagine
  init: function() {
    this.initNavbar();
    this.initSearchHandler();
    this.initLightMode();
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

  // Applica la configurazione "light version" dal file config.js
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
      // Cerca la funzione di validazione nello scope globale (definita nella pagina HTML)
      const validatorFunction = window[config.validator];
      if (typeof validatorFunction !== 'function') {
        console.error(`Funzione validatore non trovata: ${config.validator}`);
        return;
      }
      
      const parts = validatorFunction();
      if (parts) {
        let url = config.urlTemplate;
        
        // Logica migliorata per la sostituzione dei placeholder
        for (const key in parts) {
          // Cerca sia {key} che {key_RAW}
          const regex = new RegExp(`{${key}(_RAW)?}`, 'g');
          url = url.replace(regex, (match, isRaw) => {
            // Se trova _RAW, non codifica il valore. Altrimenti, lo codifica.
            return isRaw ? parts[key] : encodeURIComponent(parts[key]);
          });
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