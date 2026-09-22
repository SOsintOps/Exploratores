// assets/js/settings-page.js — page logic of pages/settings.html.
// Preferences live in localStorage under one key; catalogue-updater.js reads
// the same object to decide whether it may contact GitHub.
(function () {
  'use strict';

  var KEY = 'exploratores-settings';

  function getSettings() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function saveSettings(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); }
    catch (e) { console.error('Could not save settings:', e); }
  }

  var MESSAGES = {
    'skipped-disabled': 'Catalogue updates are switched off.',
    'skipped-recent': 'Checked less than 24 hours ago — nothing to do.',
    'unreachable': 'GitHub could not be reached; the local catalogue stays in use.',
    'invalid-meta': 'The metadata file is not in the expected format; nothing was downloaded.',
    'up-to-date': 'The cached catalogue is already the latest one.',
    'rejected-checksum': 'Download rejected: the SHA-256 checksum did not match the metadata.',
    'rejected-data': 'Download rejected: the catalogue file is not valid.',
    'storage-full': 'The browser refused to store the catalogue (storage full or blocked).',
    'updated': 'Catalogue updated — it will be used from the next page you open.'
  };

  function describe(status) {
    var parts = [];
    if (status.cached) {
      parts.push('Cached catalogue: version ' + status.cached.version + ' of ' + status.cached.updated_at.slice(0, 10)
        + ' (' + status.cached.entries + ' entries, ' + (status.cached.disabled || 0) + ' disabled), downloaded '
        + String(status.cached.downloadedAt || '').slice(0, 10) + '.');
    } else {
      parts.push('No cached catalogue — the copy bundled with this toolkit is in use.');
    }
    if (status.lastCheckAt) parts.push('Last check: ' + status.lastCheckAt.replace('T', ' ').slice(0, 16) + ' UTC' + (status.lastResult ? ' (' + status.lastResult + ')' : '') + '.');
    return parts.join(' ');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('toggle-catalogue-update');
    var statusEl = document.getElementById('catalogue-status');
    var feedback = document.getElementById('catalogue-feedback');
    var checkBtn = document.getElementById('btn-catalogue-check');
    var discardBtn = document.getElementById('btn-catalogue-discard');
    if (!toggle || typeof CatalogueUpdater === 'undefined') return;

    var render = function () { statusEl.textContent = describe(CatalogueUpdater.status()); };
    var say = function (text, isError) {
      feedback.textContent = text;
      feedback.className = 'feedback-message ' + (isError ? 'feedback-error' : 'feedback-info');
    };

    toggle.checked = getSettings().catalogueAutoUpdate === true;
    toggle.addEventListener('change', function () {
      var s = getSettings();
      s.catalogueAutoUpdate = toggle.checked;
      saveSettings(s);
      say(toggle.checked ? 'Catalogue updates enabled: the next check runs on the next page load, or press "Check now".' : 'Catalogue updates disabled. The cached catalogue, if any, stays in use until you discard it.');
      render();
    });

    checkBtn.addEventListener('click', function () {
      checkBtn.disabled = true;
      say('Checking…');
      CatalogueUpdater.check({ force: true }).then(function (result) {
        var bad = ['unreachable', 'invalid-meta', 'rejected-checksum', 'rejected-data', 'storage-full'].indexOf(result.status) !== -1;
        say(MESSAGES[result.status] || result.status, bad);
      }).catch(function () {
        say('The check failed unexpectedly.', true);
      }).then(function () {
        checkBtn.disabled = false;
        render();
      });
    });

    discardBtn.addEventListener('click', function () {
      CatalogueUpdater.discard();
      say('Cached catalogue discarded — the copy bundled with this toolkit is in use again.');
      render();
    });

    render();
  });
})();
