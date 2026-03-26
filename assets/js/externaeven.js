// --- Konami Code Easter Egg ---

(function () {
  const mottoes = {
    'launchme.html':              'In principio erat verbum',
    'searchengines.html':         'Qui quaerit, invenit',
    'dorks.html':                 'Tenebrae cedunt lumini',
    'names.html':                 'Verbum adhuc quaeritur',
    'phoneus.html':               'Qui multa audit, pauca loquitur',
    'phoneint.html':              'Una voce, unum cor',
    'vehicles.html':              'Signum ubique relictum est',
    'usernames.html':             'Persona non est homo',
    'email.html':                 'Quod scripsi, scripsi',
    'communities.html':           'Fratres in unum',
    'x.html':                     'Verba nusquam pereunt',
    'facebook.html':              'Mundus vult decipi',
    'instagram.html':             'Nil sub sole novum',
    'linkedin.html':              'Inter pares maximus',
    'vk.html':                    'Ab oriente illuminatio',
    'keybase.html':               'Non omnis aperit qui clavem habet',
    'domains.html':               'Fundamentum ante omnia ponendum',
    'ip.html':                    'Signum dat, qui nescit',
    'maps.html':                  'Orbis pictus, veritas scripta',
    'address.html':               'Lapis qui factus est in caput anguli',
    'images.html':                'Oculus nunquam dormit',
    'videos.html':                'Omnia patent vigilanti',
    'docs.html':                  'Littera gesta docet',
    'publiccompanyrecords.html':  'Omnia tempus revelat',
    'currencies.html':            'Aurum probatur igni, homo adversis',
    'iban.html':                  'Pecunia nervus rerum',
    'cyberchef.html':             'Numero, pondere et mensura',
    'guidelines.html':            'Per angusta ad augusta',
    'faq.html':                   'Discendo discimus',
    'customise.html':             'Homo faber suae quisque fortunae',
    'versionhistory.html':        'Tempora mutantur, nos et mutamur in illis',
    'license.html':               'Legibus antiquis stat',
    'janua.html':                 'Intrantibus pax, exeuntibus lux'
  };

  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let sequencePosition = 0;

  function getCurrentMotto() {
    const page = window.location.pathname.split('/').pop() || 'launchme.html';
    return mottoes[page] || 'Nihil est quod non investigando possit inveniri';
  }

  function activateEasterEgg() {
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
      pageTitle.textContent = getCurrentMotto();
    }
    document.body.classList.add('matrix-mode');
  }

  document.addEventListener('keydown', (e) => {
    const requiredKey = konamiSequence[sequencePosition];
    if (e.key.toLowerCase() === requiredKey.toLowerCase()) {
      sequencePosition++;
      if (sequencePosition === konamiSequence.length) {
        activateEasterEgg();
        sequencePosition = 0;
      }
    } else {
      sequencePosition = 0;
    }
  });
}());
