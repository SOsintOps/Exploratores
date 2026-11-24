// Dependency-free test suite for assets/js/redactor.js.
// Run with: node tests/redactor.test.js   (Node >= 18, no npm install needed)
// redactor.js registers its button handlers on load, so the browser is stubbed:
// every getElementById returns an inert element, localStorage is an in-memory map.
// The page functions (censorText, restoreText, …) are top-level declarations and
// are reached through the same vm context.
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/redactor.js'), 'utf8');

function fakeElement() {
  return {
    value: '', textContent: '', innerHTML: '', className: '', style: {}, dataset: {},
    files: [], checked: false,
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, appendChild() {}
  };
}
const elements = {};
const store = {};
const sandbox = {
  document: {
    addEventListener() {},
    getElementById: id => (elements[id] || (elements[id] = fakeElement())),
    createElement: () => fakeElement(),
    body: fakeElement()
  },
  localStorage: {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); }
  },
  performance,
  console
};
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const run = code => vm.runInContext(code, sandbox);

function reset() { run('clearRedactionMap()'); }
function censor(text) { return run('censorText(' + JSON.stringify(text) + ')'); }
function restore(text) { return run('restoreText(' + JSON.stringify(text) + ')'); }
function setMap(obj) { reset(); run('importSessionMap(' + JSON.stringify(JSON.stringify(obj)) + ')'); }
// The text left in clear: placeholders removed.
function clear(text) { return text.replace(/\[[A-Z0-9_]+_\d+\]/g, ''); }
function mapped(placeholder) { return run('session.reverse.get(' + JSON.stringify(placeholder) + ')'); }

let passed = 0;
const failures = [];
function test(name, fn) {
  try {
    reset();
    fn();
    passed++;
  } catch (e) {
    failures.push(`${name}: ${e.message}`);
  }
}
function eq(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label || 'value'} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// --- checksum validators ---

test('cfOk: valid canonical code', () => eq(run('cfOk("RSSMRA85M01H501Q")'), true));
test('cfOk: wrong check letter', () => eq(run('cfOk("RSSMRA85M01H501Z")'), false));
test('cfOk: valid omocodic code', () => eq(run('cfOk("RSSMRA85M01H50MI")'), true));
test('cfOk: lowercase accepted', () => eq(run('cfOk("rssmra85m01h501q")'), true));
test('pivaOk: valid', () => eq(run('pivaOk("12345678903")'), true));
test('pivaOk: valid with IT prefix', () => eq(run('pivaOk("IT12345678903")'), true));
test('pivaOk: wrong check digit', () => eq(run('pivaOk("12345678901")'), false));
test('ibanOk: valid compact', () => eq(run('ibanOk("IT60X0542811101000000123456")'), true));
test('ibanOk: valid spaced', () => eq(run('ibanOk("IT60 X054 2811 1010 0000 0123 456")'), true));
test('ibanOk: wrong check digits', () => eq(run('ibanOk("IT61X0542811101000000123456")'), false));
test('luhnOk: valid Visa', () => eq(run('luhnOk("4111 1111 1111 1111")'), true));
test('luhnOk: invalid', () => eq(run('luhnOk("4111111111111112")'), false));

// --- Codice Fiscale ---

test('CF: canonical code redacted', () => eq(censor('CF: RSSMRA85M01H501Q'), 'CF: [CF_1]'));
test('CF: canonical code with a wrong check letter still redacted', () => eq(censor('CF: RSSMRA85M01H501Z'), 'CF: [CF_1]'));
test('CF: omocodic code redacted', () => {
  eq(censor('CF: RSSMRA85M01H50MI'), 'CF: [CF_1]');
  eq(mapped('[CF_1]'), 'RSSMRA85M01H50MI', 'mapped value');
});
test('CF: omocodic shape with a wrong check letter is left alone', () => eq(censor('code RSSMRA85M01H50MA'), 'code RSSMRA85M01H50MA'));

// --- IBAN ---

test('IBAN: compact', () => eq(censor('IBAN IT60X0542811101000000123456'), 'IBAN [IBAN_1]'));
test('IBAN: spaced (TC-TXT-003)', () => eq(censor('IBAN: IT60 X054 2811 1010 0000 0123 456'), 'IBAN: [IBAN_1]'));
test('IBAN: printed with dots', () => eq(censor('IBAN IT60.X054.2811.1010.0000.0123.456 ok'), 'IBAN [IBAN_1] ok'));
test('IBAN: valid IBAN does not swallow the next word', () => eq(censor('BE68 5390 0754 7034 Gent'), '[IBAN_1] Gent'));
test('IBAN: wraps once on a line break', () => eq(censor('IBAN IT60 X054 2811 1010\n0000 0123 456 end'), 'IBAN [IBAN_1] end'));
test('IBAN: mistyped IBAN is still redacted', () => eq(censor('IBAN IT61X0542811101000000123456'), 'IBAN [IBAN_1]'));

// --- payment cards and checksum ranking ---

test('Visa compact (TC-TXT-007)', () => eq(censor('Card: 4111111111111111'), 'Card: [VISA_1]'));
test('Visa spaced (TC-TXT-008)', () => eq(censor('Card: 4111 1111 1111 1111'), 'Card: [VISA_1]'));
test('Visa failing Luhn is still redacted', () => eq(censor('Card: 4111 1111 1111 1112'), 'Card: [VISA_1]'));
test('13 digits: Visa when Luhn passes', () => eq(censor('n 4222222222222'), 'n [VISA_1]'));
test('13 digits: CNP_RO when Luhn fails on the same span', () => eq(censor('n 4111111111111'), 'n [CNP_RO_1]'));
test('P.IVA plain 11 digits (TC-TXT-005)', () => eq(censor('P.IVA: 04598600403'), 'P.IVA: [VAT_IT_1]'));
test('11 digits from 07: UK mobile when the P.IVA check fails', () => eq(censor('tel 07123450123'), 'tel [PHONE_UK_MOBILE_1]'));
test('11 digits from 07: VAT_IT when the P.IVA check passes', () => eq(censor('tel 07123450129'), 'tel [VAT_IT_1]'));

// --- phones ---

test('IT mobile compact (TC-TXT-011)', () => eq(censor('Tel: 3351234567'), 'Tel: [PHONE_IT_MOBILE_1]'));
test('IT mobile +39 spaced (TC-TXT-012)', () => eq(censor('Tel: +39 335 123 4567'), 'Tel: [PHONE_IT_MOBILE_1]'));
test('IT mobile with dots', () => eq(censor('Tel 333.123.4567.'), 'Tel [PHONE_IT_MOBILE_1].'));
test('IT mobile with hyphens', () => eq(censor('Tel 333-123-4567'), 'Tel [PHONE_IT_MOBILE_1]'));
test('IT landline with hyphen', () => eq(censor('Tel 010-2471234'), 'Tel [PHONE_IT_LANDLINE_1]'));
test('IT landline with slash', () => eq(censor('Tel 02/12345678'), 'Tel [PHONE_IT_LANDLINE_1]'));
test('IT landline 06 + space keeps the existing FR type', () => eq(censor('Tel 06 12345678'), 'Tel [PHONE_FR_MOBILE_1]'));
test('compact 10 digits from 0 stay SE10', () => eq(censor('code 0212345678'), 'code [SE10_1]'));
test('zero-padded ID is not a landline', () => eq(censor('id 00012345'), 'id 00012345'));

// --- new types ---

test('URL with scheme, closing punctuation left out', () => eq(censor('see https://example.com/page.'), 'see [URL_1].'));
test('URL www', () => eq(censor('vai su www.studio-rossi.it oggi'), 'vai su [URL_1] oggi'));
test('URL bare domain with a listed TLD', () => eq(censor('sito rossi.it'), 'sito [URL_1]'));
test('URL: legal abbreviations are not domains', () => eq(censor('p.iva n.ro S.r.l.'), 'p.iva n.ro S.r.l.'));
test('URL: an email stays EMAIL', () => eq(censor('m.rossi@studio.it'), '[EMAIL_1]'));
test('IPADDR', () => eq(censor('host 192.168.1.10 up'), 'host [IPADDR_1] up'));
test('IPADDR with CIDR', () => eq(censor('net 10.0.0.0/8'), 'net [IPADDR_1]'));
test('IPADDR: version with an out-of-range part', () => eq(censor('v 2.3.55.987'), 'v 2.3.55.987'));
test('AMOUNT Italian format', () => eq(censor('totale € 12.500,00.'), 'totale [AMOUNT_1].'));
test('AMOUNT English format', () => eq(censor('total EUR 1,000.00'), 'total [AMOUNT_1]'));
test('AMOUNT suffix', () => eq(censor('pagati 1.234 euro'), 'pagati [AMOUNT_1]'));
test('AMOUNT: "euro" inside a word is ignored', () => eq(censor('neuro 12'), 'neuro 12'));
test('DOCID R.G.', () => eq(censor('causa R.G. 1234/2024 del'), 'causa [DOCID_1] del'));
test('DOCID Prot. n.', () => eq(censor('Prot. n. 456/2024'), '[DOCID_1]'));
test('DOCID: a bare fraction is not an act reference', () => eq(censor('art. 1234/2024'), 'art. 1234/2024'));
test('TARGA', () => eq(censor('auto AB 123 CD e EF-456-GH'), 'auto [TARGA_1] e [TARGA_2]'));
test('TARGA: lowercase English text is ignored', () => eq(censor('go to 100 km'), 'go to 100 km'));

// --- overlaps between new and earlier types: nothing redacted before is left in clear ---

test('overlap: amount before a mobile', () => eq(censor('Rossi Mario € 1.200 333 123 4567'), 'Rossi Mario [AMOUNT_1] [PHONE_IT_MOBILE_1]'));
test('overlap: amount followed by a mobile', () => eq(censor('Bonifico € 50 335 123 4567'), 'Bonifico [AMOUNT_1] [PHONE_IT_MOBILE_1]'));
test('overlap: EUR before an international number', () => eq(clear(censor('EUR 0044 20 7946 0958')), ''));
test('overlap: lowercase "rep" is a word, not an act reference', () => eq(censor('chiamare il rep 335 1234567'), 'chiamare il rep [PHONE_IT_MOBILE_1]'));
test('overlap: act reference does not cross a line break', () => eq(censor('RG\n4111 1111 1111 1111'), 'RG\n[VISA_1]'));
test('overlap: union keeps the tail of the later match', () => {
  const out = censor('Prot. 06 12345678');
  eq(/\d/.test(clear(out)), false, 'no digit left in clear in ' + out);
});
test('dates are not redacted', () => eq(censor('nato il 12/06/1985, il 01.02.2024 15:30'), 'nato il 12/06/1985, il 01.02.2024 15:30'));
test('overlap: www URL glued to an IBAN', () => {
  const out = censor('www.rossi.it.IT60X0542811101000000123456');
  eq(/\d/.test(clear(out)), false, 'no digit left in clear in ' + out);
});
test('landline needs a separator', () => eq(censor('id 0123456789012'), 'id 0123456789012'));
test('landline is not taken inside a dotted number', () => eq(censor('v 1.06 123456'), 'v 1.06 123456'));

// --- running time ---

test('amount: long run of grouped numbers stays fast', () => {
  const t0 = Date.now();
  censor('123 '.repeat(80000));
  const ms = Date.now() - t0;
  if (ms > 3000) throw new Error('took ' + ms + ' ms');
});
test('restore: 10,000-entry map stays fast', () => {
  const map = {};
  for (let i = 1; i <= 10000; i++) map['[EMAIL_' + i + ']'] = 'u' + i + '@x.it';
  setMap(map);
  const t0 = Date.now();
  const out = restore('lorem ipsum dolor sit amet '.repeat(2500) + '[EMAIL_9999] EMAIL_42');
  const ms = Date.now() - t0;
  eq(out.endsWith('u9999@x.it u42@x.it'), true, 'restored tail');
  if (ms > 2000) throw new Error('took ' + ms + ' ms');
});

// --- earlier behaviour kept ---

test('same value same placeholder (TC-TXT-013)', () => eq(censor('a@test.com and a@test.com'), '[EMAIL_1] and [EMAIL_1]'));
test('mixed types (TC-TXT-015)', () => eq(
  censor('RSSMRA85M01H501Z mario@rossi.it IT60X0542811101000000123456 04598600403 4111111111111111'),
  '[CF_1] [EMAIL_1] [IBAN_1] [VAT_IT_1] [VISA_1]'));
test('custom pattern that can match empty does not hang', () => {
  run('addCustomPattern("EMPTYTEST", "x*", "", "#555555", false)');
  eq(censor('ab xx cd'), 'ab [EMPTYTEST_1] cd');
  run('removeCustomPattern("EMPTYTEST")');
});

// --- tolerant restore ---

test('restore: exact placeholder', () => {
  setMap({ '[EMAIL_1]': 'support@example.com' });
  eq(restore('Thanks [EMAIL_1].'), 'Thanks support@example.com.');
});
test('restore: brackets dropped, spaces kept', () => {
  setMap({ '[FULLNAME_1]': 'Mario Rossi' });
  eq(restore('Il FULLNAME_1 ha firmato.'), 'Il Mario Rossi ha firmato.');
});
test('restore: tab column kept', () => {
  setMap({ '[FULLNAME_1]': 'Mario Rossi' });
  eq(restore('c1\tFULLNAME_1\tc3'), 'c1\tMario Rossi\tc3');
});
test('restore: line break kept', () => {
  setMap({ '[FULLNAME_1]': 'Mario Rossi' });
  eq(restore('r\nFULLNAME_1\nr'), 'r\nMario Rossi\nr');
});
test('restore: spaces inside the brackets', () => {
  setMap({ '[CF_1]': 'RSSMRA85M01H501Q' });
  eq(restore('cf [ CF_1 ] ok'), 'cf RSSMRA85M01H501Q ok');
});
test('restore: markdown bold kept', () => {
  setMap({ '[CF_1]': 'RSSMRA85M01H501Q' });
  eq(restore('**[CF_1]** e **CF_1**'), '**RSSMRA85M01H501Q** e **RSSMRA85M01H501Q**');
});
test('restore: invented index stays unresolved', () => {
  setMap({ '[CF_1]': 'RSSMRA85M01H501Q' });
  eq(restore('vedi [CF_12] e CF_12'), 'vedi [CF_12] e CF_12');
});
test('restore: glued to an ASCII letter stays', () => {
  setMap({ '[CF_1]': 'X' });
  eq(restore('ilCF_1 resta'), 'ilCF_1 resta');
});
test('restore: glued to an accented letter stays', () => {
  setMap({ '[CF_1]': 'X' });
  eq(restore('il codice CF_1è già'), 'il codice CF_1è già');
});
test('restore: CF_1 inside CF_10 untouched', () => {
  setMap({ '[CF_1]': 'A', '[CF_10]': 'B' });
  eq(restore('[CF_1] [CF_10] CF_10 CF_1'), 'A B B A');
});
test('restore: a value containing another placeholder name is not replaced again', () => {
  setMap({ '[ORG_1]': 'Studio CF_2 & Partners', '[CF_2]': 'RSSMRA85M01H501Q' });
  eq(restore('Rivolgersi a ORG_1.'), 'Rivolgersi a Studio CF_2 & Partners.');
});
test('restore: placeholder type with a hyphen (imported map)', () => {
  setMap({ '[MY-TYPE_1]': 'secret' });
  eq(restore('x [MY-TYPE_1] MY-TYPE_1'), 'x secret secret');
});
test('restore: imported name with a space inside the brackets', () => {
  setMap({ '[ CF_1]': 'A', '[CF_1]': 'B' });
  eq(restore('see [ CF_1] and [CF_1]'), 'see A and B');
});
test('restore: unrelated bracketed text and words untouched', () => {
  setMap({ '[CF_1]': 'A' });
  eq(restore('[link](url) and [note] CF'), '[link](url) and [note] CF');
});
test('restore: empty map returns the text (TC-RST-004)', () => eq(restore('Hello [EMAIL_1].'), 'Hello [EMAIL_1].'));
test('restore: round trip', () => {
  const text = 'Mario 3351234567, IBAN IT60 X054 2811 1010 0000 0123 456, mail m@x.it';
  const censored = censor(text);
  eq(restore(censored), text);
});

if (failures.length) {
  console.error(failures.join('\n'));
  console.error(`\n${passed} passed, ${failures.length} failed`);
  process.exit(1);
}
console.log(`${passed} passed`);
