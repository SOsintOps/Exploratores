// --- Konami Code Easter Egg ---

document.addEventListener('DOMContentLoaded', () => {
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];
  let sequencePosition = 0;

  function activateEasterEgg() {
    // Cambia il titolo H1
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
      pageTitle.textContent = 'Nihil est quod non investigando possit inveniri';
    }

    // Applica la classe per la modalità Matrix
    document.body.classList.add('matrix-mode');
  }

  document.addEventListener('keydown', (e) => {
    const requiredKey = konamiSequence[sequencePosition];

    if (e.key.toLowerCase() === requiredKey.toLowerCase()) {
      sequencePosition++;

      if (sequencePosition === konamiSequence.length) {
        activateEasterEgg();
        sequencePosition = 0; // Resetta per future attivazioni
      }
    } else {
      sequencePosition = 0;
    }
  });
});