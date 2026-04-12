(function () {
  var KEY = 'exploratores-settings';

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveSettings(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('toggle-typewriter');
    var settings = getSettings();
    toggle.checked = settings.typewriterEffect !== false;

    toggle.addEventListener('change', function () {
      var s = getSettings();
      s.typewriterEffect = toggle.checked;
      saveSettings(s);
    });
  });
})();
