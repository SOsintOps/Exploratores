// Dependency-free test suite for assets/js/validators.js.
// Run with: node tests/validators.test.js   (Node >= 18, no npm install needed)
// The browser environment is stubbed: document.getElementById reads from the
// `dom` map (set per test with setDom), and ibankit.js is loaded in the same
// sandbox so the IBAN checksum path is exercised for real.
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const source = ['assets/js/ibankit.js', 'assets/js/validators.js']
  .map(f => fs.readFileSync(path.join(root, f), 'utf8'))
  .join('\n;\n');

let dom = {};
const sandbox = {
  document: { getElementById: id => (id in dom ? { value: dom[id] } : null) },
  URL,
  console
};
vm.createContext(sandbox);
const V = vm.runInContext(source + '\n;ExploratoresValidators', sandbox);

function setDom(values) { dom = values; }

let passed = 0;
const failures = [];
function test(name, fn) {
  try {
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
function valid(r) { eq(r.isValid, true, 'isValid'); return r.data; }
function invalid(r) { eq(r.isValid, false, 'isValid'); }

// --- simple single-input validators (queryOverride path) ---

test('searchTerm: empty is rejected', () => invalid(V.getAndValidateSearchTerm({}, '')));
test('searchTerm: value is returned as term', () => eq(valid(V.getAndValidateSearchTerm({}, 'foo bar')).term, 'foo bar'));

test('officerName: valid', () => eq(valid(V.getAndValidateOfficerName({}, 'Jane Roe')).officername, 'Jane Roe'));
test('officerName: empty rejected', () => invalid(V.getAndValidateOfficerName({}, '')));

test('companyName: valid', () => eq(valid(V.getAndValidateCompanyName({}, 'ACME Srl')).companyname, 'ACME Srl'));
test('companyEmail: valid', () => eq(valid(V.getAndValidateCompanyEmail({}, 'a@b.co')).email, 'a@b.co'));
test('companyEmail: missing @ rejected', () => invalid(V.getAndValidateCompanyEmail({}, 'not-an-email')));
test('companyPhone: digits/symbols accepted', () => eq(valid(V.getAndValidateCompanyPhone({}, '+39 06-555 (01)')).phone, '+39 06-555 (01)'));
test('companyPhone: letters rejected', () => invalid(V.getAndValidateCompanyPhone({}, '06 CALL ME')));

test('ssn: dashed accepted', () => eq(valid(V.getAndValidateSsn({}, '123-45-6789')).ssn, '123-45-6789'));
test('ssn: compact accepted', () => valid(V.getAndValidateSsn({}, '123456789')));
test('ssn: wrong length rejected', () => invalid(V.getAndValidateSsn({}, '123-45-678')));

test('email: valid', () => eq(valid(V.getAndValidateEmail({}, 'x@y.zz')).email, 'x@y.zz'));
test('email: space rejected', () => invalid(V.getAndValidateEmail({}, 'x @y.zz')));
test('email: missing TLD rejected', () => invalid(V.getAndValidateEmail({}, 'x@y')));

test('gmail: localpart extracted', () => eq(valid(V.getAndValidateGmail({}, 'john.doe@gmail.com')).localpart, 'john.doe'));
test('gmail: domain is case-insensitive', () => valid(V.getAndValidateGmail({}, 'a@GMAIL.COM')));
test('gmail: non-gmail rejected', () => invalid(V.getAndValidateGmail({}, 'a@outlook.com')));

test('username: valid', () => eq(valid(V.getAndValidateUsername({}, 'neo_01')).username, 'neo_01'));
test('tumblr: illegal chars stripped', () => eq(valid(V.getAndValidateTumblrUsername({}, 'neo.01!')).username, 'neo01'));
test('tumblr: nothing left after cleaning rejected', () => invalid(V.getAndValidateTumblrUsername({}, '@@..!!')));
test('smatVk: enddate is ISO date', () => {
  const d = valid(V.getAndValidateSmatVkUsername({}, 'target'));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.enddate)) throw new Error(`bad enddate ${d.enddate}`);
});

test('vin: 17 chars accepted', () => valid(V.getAndValidateVin({}, '1HGCM82633A004352')));
test('vin: 16 chars rejected', () => invalid(V.getAndValidateVin({}, '1HGCM82633A00435')));

test('ip: valid address', () => eq(valid(V.getAndValidateIpAddress({}, '192.168.1.254')).ip, '192.168.1.254'));
test('ip: octet 256 rejected', () => invalid(V.getAndValidateIpAddress({}, '10.0.0.256')));
test('ip: three octets rejected', () => invalid(V.getAndValidateIpAddress({}, '10.0.0')));
test('networksDbRange: /24 bounds derived', () => {
  const d = valid(V.getAndValidateNetworksDbRange({}, '10.20.30.40'));
  eq(d.start_ip, '10.20.30.0', 'start_ip');
  eq(d.end_ip, '10.20.30.255', 'end_ip');
});

test('btc: legacy 1-address accepted', () => valid(V.getAndValidateBtcAddress({}, '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2')));
test('btc: P2SH 3-address accepted', () => valid(V.getAndValidateBtcAddress({}, '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy')));
test('btc: bech32 accepted', () => valid(V.getAndValidateBtcAddress({}, 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')));
test('btc: random string rejected', () => invalid(V.getAndValidateBtcAddress({}, 'hello-world')));

test('cryptoAmount: numeric accepted', () => eq(valid(V.getAndValidateCryptoAmount({}, '12.5')).amount, '12.5'));
test('cryptoAmount: non-numeric rejected', () => invalid(V.getAndValidateCryptoAmount({}, 'abc')));
test('fiatAmount: numeric accepted', () => valid(V.getAndValidateFiatAmount({}, '100')));

test('imageUrl: https accepted', () => valid(V.getAndValidateImageUrl({}, 'https://x.y/img.png')));
test('imageUrl: bare host rejected', () => invalid(V.getAndValidateImageUrl({}, 'x.y/img.png')));
test('vimeoImageUrl: must start with http', () => invalid(V.getAndValidateVimeoImageUrl({}, 'ftp://x.y/i.png')));

test('domain: dots variant derived', () => {
  const d = valid(V.getAndValidateDomain({}, 'example.co.uk'));
  eq(d.domain_nodots, 'examplecouk', 'domain_nodots');
});
test('url: parseable URL accepted', () => valid(V.getAndValidateUrl({}, 'https://example.com/a?b=1')));
test('url: schemeless rejected', () => invalid(V.getAndValidateUrl({}, 'example.com')));

test('adsense: pub- plus 16 digits', () => valid(V.getAndValidateAdsenseId({}, 'pub-1234567890123456')));
test('adsense: 15 digits rejected', () => invalid(V.getAndValidateAdsenseId({}, 'pub-123456789012345')));
test('analytics: UA format accepted', () => valid(V.getAndValidateAnalyticsId({}, 'UA-12345-1')));
test('analytics: G format accepted', () => valid(V.getAndValidateAnalyticsId({}, 'G-ABC123DEF4')));
test('analytics: garbage rejected', () => invalid(V.getAndValidateAnalyticsId({}, 'GTM-XXXX')));

test('shodanHash: negative number accepted', () => valid(V.getAndValidateShodanFaviconHash({}, '-1234567890')));
test('shodanHash: non-numeric rejected', () => invalid(V.getAndValidateShodanFaviconHash({}, '0x1234')));
test('md5: 32 lowercase hex accepted', () => valid(V.getAndValidateMd5Hash({}, 'd41d8cd98f00b204e9800998ecf8427e')));
test('md5: 31 chars rejected', () => invalid(V.getAndValidateMd5Hash({}, 'd41d8cd98f00b204e9800998ecf8427')));

test('xListId: numeric accepted', () => valid(V.getAndValidateXListId({}, '123456')));
test('xListId: alphanumeric rejected', () => invalid(V.getAndValidateXListId({}, '123abc')));
test('xMemoryId: numeric accepted', () => valid(V.getAndValidateXMemoryId({}, '99')));
test('facebookUserId: numeric only', () => invalid(V.getAndValidateFacebookUserId({}, '12a34')));
test('instagramUserId: numeric only', () => invalid(V.getAndValidateInstagramUserId({}, 'abc')));

test('vkTag: # is prepended', () => eq(valid(V.getAndValidateVkTag({}, 'osint')).tag, '#osint'));
test('vkTag: existing # not duplicated', () => eq(valid(V.getAndValidateVkTag({}, '#osint')).tag, '#osint'));
test('vkUserId: numeric accepted', () => valid(V.getAndValidateVkUserId({}, '1234')));
test('vkUserId: non-numeric rejected', () => invalid(V.getAndValidateVkUserId({}, 'durov')));

test('iban: spaces and case normalised', () => eq(valid(V.getAndValidateIban({}, 'it60 x054 2811 1010 0000 0123 456')).iban, 'IT60X0542811101000000123456'));
test('iban: bad checksum rejected (ibankit)', () => invalid(V.getAndValidateIban({}, 'IT99X0542811101000000123456')));
test('iban: bad structure rejected', () => invalid(V.getAndValidateIban({}, '1234IT')));

// --- multi-input validators (DOM stub path) ---

test('names: first+last combined', () => {
  setDom({ firstName: 'Ada', lastName: 'Lovelace' });
  const d = valid(V.getAndValidateNames({}));
  eq(d.fullname, 'Ada Lovelace', 'fullname');
  eq(d.fullnamedash, 'Ada-Lovelace', 'fullnamedash');
  eq(d.fullnamedashlower, 'ada-lovelace', 'fullnamedashlower');
});
test('names: last name only is enough', () => {
  setDom({ firstName: '', lastName: 'Lovelace' });
  eq(valid(V.getAndValidateNames({})).fullnamedash, 'Lovelace', 'fullnamedash');
});
test('names: both empty rejected', () => {
  setDom({ firstName: '', lastName: '' });
  invalid(V.getAndValidateNames({}));
});

test('usPhone: parts assembled', () => {
  setDom({ areaCode: '202', prefixCode: '555', lineNumber: '0173' });
  const d = valid(V.getAndValidateUsPhone({}));
  eq(d.full, '2025550173', 'full');
  eq(d.e164, '12025550173', 'e164');
});
test('usPhone: short area code rejected', () => {
  setDom({ areaCode: '20', prefixCode: '555', lineNumber: '0173' });
  invalid(V.getAndValidateUsPhone({}));
});

test('intlPhone: +39 and trunk zero normalised', () => {
  setDom({ countryCodeInput: '+39', nationalNumberInput: '0347 1234567', countryLettersInput: 'it' });
  const d = valid(V.getAndValidateIntlPhone({ }));
  eq(d.e164, '393471234567', 'e164');
  eq(d.countrycode, '39', 'countrycode');
  eq(d.country_iso, 'IT', 'country_iso');
});
test('intlPhone: 0039 prefix normalised', () => {
  setDom({ countryCodeInput: '0039', nationalNumberInput: '3471234567', countryLettersInput: '' });
  eq(valid(V.getAndValidateIntlPhone({})).countrycode, '39', 'countrycode');
});
test('intlPhone: requireCountryCode enforced', () => {
  setDom({ countryCodeInput: '', nationalNumberInput: '3471234567', countryLettersInput: '' });
  invalid(V.getAndValidateIntlPhone({ validation_rules: { requireCountryCode: true } }));
});
test('intlPhone: bare + rejected after normalisation', () => {
  setDom({ countryCodeInput: '+', nationalNumberInput: '3471234567', countryLettersInput: '' });
  invalid(V.getAndValidateIntlPhone({}));
});

test('usOfficer: both names required', () => {
  setDom({ officerSearchFirstName: 'John', officerSearchLastName: '' });
  invalid(V.getAndValidateUsOfficerName({}));
});

test('usAddress: fields joined with spaces', () => {
  setDom({ 'input-address-usNum': '1600', 'input-address-usStreet': 'Pennsylvania Ave', 'input-address-usCity': 'Washington', 'input-address-usState': 'DC', 'input-address-usZip': '20500' });
  eq(valid(V.getAndValidateUsAddress({})).full_address, '1600 Pennsylvania Ave Washington DC 20500', 'full_address');
});
test('intlAddress: street/city/region all missing rejected', () => {
  setDom({ 'input-address-intlStreet': '', 'input-address-intlNum': '7', 'input-address-intlCity': '', 'input-address-intlZip': '', 'input-address-intlRegion': '' });
  invalid(V.getAndValidateIntlAddress({}));
});
test('itPeople: city is mandatory', () => {
  setDom({ 'input-address-itFirst': 'Mario', 'input-address-itLast': 'Rossi', 'input-address-itCityP': '' });
  invalid(V.getAndValidateItPeople({}));
});
test('itYellow: activity and location required', () => {
  setDom({ 'input-address-itAct': 'idraulico', 'input-address-itLoc': 'Roma' });
  valid(V.getAndValidateItYellow({}));
});

test('plate: state uppercased, 2 letters enforced', () => {
  setDom({ lpNumber: 'AB123CD', lpState: 'ny' });
  eq(valid(V.getAndValidatePlate({})).state, 'NY', 'state');
  setDom({ lpNumber: 'AB123CD', lpState: 'NYC' });
  invalid(V.getAndValidatePlate({}));
});

test('coordinates: numeric strings accepted', () => {
  setDom({ latitudeInput: '41.9', longitudeInput: '12.5' });
  valid(V.getAndValidateCoordinates({}));
});
test('coordinates: non-numeric rejected', () => {
  setDom({ latitudeInput: 'north', longitudeInput: '12.5' });
  invalid(V.getAndValidateCoordinates({}));
});
test('zillow: map bounds built around the point', () => {
  setDom({ latitudeInput: '41.9', longitudeInput: '12.5' });
  const d = valid(V.getAndValidateZillowCoords({}));
  if (!d.searchQueryState.includes('"west":12.49') || !d.searchQueryState.includes('"north":41.91')) {
    throw new Error(`unexpected bounds: ${d.searchQueryState}`);
  }
});

test('usaAddress: fields joined with plus', () => {
  setDom({ usa_number: '1600', usa_street: 'Penn Ave', usa_city: '', usa_state: '', usa_zip: '' });
  eq(valid(V.getAndValidateUsaAddress({})).usa_address_query, '1600+Penn Ave', 'usa_address_query');
});
test('italyAddress: street and number merged', () => {
  setDom({ italy_number: '10', italy_street: 'Via Roma', italy_city: 'Milano', italy_nation: 'Italia', italy_zip: '20100' });
  const d = valid(V.getAndValidateItalyAddress({}));
  eq(d.street, 'Via Roma 10', 'street');
  eq(d.city, 'Milano', 'city');
});

test('youtubeComments: both fields required', () => {
  setDom({ ytVideoIdForComments: 'dQw4w9WgXcQ', ytCommentSearchTerm: '' });
  invalid(V.getAndValidateYoutubeComments({}));
});
test('xYearSearch: since/until derived from year', () => {
  setDom({ 'input-x-yearTerm': 'target', 'input-x-yearNum': '2021' });
  const d = valid(V.getAndValidateXYearSearch({}));
  eq(d.since, '2021-01-01', 'since');
  eq(d.until, '2021-12-31', 'until');
});
test('xYearSearch: 2-digit year rejected', () => {
  setDom({ 'input-x-yearTerm': 'target', 'input-x-yearNum': '21' });
  invalid(V.getAndValidateXYearSearch({}));
});
test('instagramCombined: both users required', () => {
  setDom({ 'input-instagram-combo-usera': 'a', 'input-instagram-combo-userb': '' });
  invalid(V.getAndValidateInstagramCombinedSearch({}));
});
test('linkedinExternal: terms joined', () => {
  setDom({ 'input-linkedin-ext-keyword': '', 'input-linkedin-ext-fname': 'Ada', 'input-linkedin-ext-lname': 'Lovelace', 'input-linkedin-ext-title': '', 'input-linkedin-ext-company': 'Babbage & Co', 'input-linkedin-ext-school': '' });
  eq(valid(V.getAndValidateLinkedinExternal({})).query, 'Ada Lovelace Babbage & Co', 'query');
});

test('janua: generic data fans out the indicator', () => {
  setDom({ 'indicator-input': 'John Smith' });
  const d = valid(V.getAndValidateJanuaInput({}));
  eq(d.term, 'John Smith', 'term');
  eq(d.fullnamedash, 'John-Smith', 'fullnamedash');
  eq(d.fullnamedashlower, 'john-smith', 'fullnamedashlower');
});

// --- Telegram validators ---

test('tgUser: value is returned as username', () => {
  setDom({ 'input-telegram-user': 'durov' });
  eq(valid(V.getAndValidateTgUser({})).username, 'durov', 'username');
});
test('tgUser: a leading @ is stripped', () => {
  setDom({ 'input-telegram-user': '@durov' });
  eq(valid(V.getAndValidateTgUser({})).username, 'durov', 'username');
});
test('tgUser: empty rejected', () => {
  setDom({ 'input-telegram-user': '' });
  invalid(V.getAndValidateTgUser({}));
});
test('tgUser: a bare @ is rejected', () => {
  setDom({ 'input-telegram-user': '@' });
  invalid(V.getAndValidateTgUser({}));
});

test('tgKey: value is returned as keyword', () => {
  setDom({ 'input-telegram-key': 'data leak' });
  eq(valid(V.getAndValidateTgKey({})).keyword, 'data leak', 'keyword');
});
test('tgKey: empty rejected', () => {
  setDom({ 'input-telegram-key': '' });
  invalid(V.getAndValidateTgKey({}));
});

test('tgChannelQuery: channel and term are both returned', () => {
  setDom({ 'input-telegram-channel': '@durov', 'input-telegram-query': 'invoice.pdf' });
  const d = valid(V.getAndValidateTgChannelQuery({}));
  eq(d.username, 'durov', 'username');
  eq(d.keyword, 'invoice.pdf', 'keyword');
});
test('tgChannelQuery: missing channel rejected', () => {
  setDom({ 'input-telegram-channel': '', 'input-telegram-query': 'invoice.pdf' });
  invalid(V.getAndValidateTgChannelQuery({}));
});
test('tgChannelQuery: missing term rejected', () => {
  setDom({ 'input-telegram-channel': 'durov', 'input-telegram-query': '' });
  invalid(V.getAndValidateTgChannelQuery({}));
});

test('tgChannelHistory: channel and message id are both returned', () => {
  setDom({ 'input-telegram-channel': 'durov', 'input-telegram-msgid': '50' });
  const d = valid(V.getAndValidateTgChannelHistory({}));
  eq(d.username, 'durov', 'username');
  eq(d.msgid, '50', 'msgid');
});
test('tgChannelHistory: non-numeric message id rejected', () => {
  setDom({ 'input-telegram-channel': 'durov', 'input-telegram-msgid': 'first' });
  invalid(V.getAndValidateTgChannelHistory({}));
});
test('tgChannelHistory: zero rejected', () => {
  setDom({ 'input-telegram-channel': 'durov', 'input-telegram-msgid': '0' });
  invalid(V.getAndValidateTgChannelHistory({}));
});
test('tgChannelHistory: missing channel rejected', () => {
  setDom({ 'input-telegram-channel': '', 'input-telegram-msgid': '50' });
  invalid(V.getAndValidateTgChannelHistory({}));
});

// --- results ---
const total = passed + failures.length;
if (failures.length) {
  console.error(`FAIL — ${failures.length}/${total} test(s) failed:`);
  for (const f of failures) console.error('  ✗ ' + f);
  process.exit(1);
}
console.log(`OK — ${total} tests passed.`);
