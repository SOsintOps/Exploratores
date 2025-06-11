// assets/js/search-library.js

const SearchLibrary = {
    //
    // --- SEARCH ENGINES ---
    //
    'google-standard': { urlTemplate: 'https://google.com/search?q={term}', validator: 'getAndValidateSearchTerm' },
    'google-date': { urlTemplate: 'https://google.com/search?q={term}&tbs=cdr:1,cd_min:1/1/0,sbd:1', validator: 'getAndValidateSearchTerm' },
    'google-news': { urlTemplate: 'https://www.google.com/search?tbm=nws&q={term}', validator: 'getAndValidateSearchTerm' },
    'google-ftp': { urlTemplate: 'https://www.google.com/search?q=inurl%3Aftp%20-inurl%3A(http|https)%20{term}', validator: 'getAndValidateSearchTerm' },
    'google-index': { urlTemplate: 'https://www.google.com/search?q=intitle%3Aindex.of%20{term}', validator: 'getAndValidateSearchTerm' },
    'google-scholar': { urlTemplate: 'https://scholar.google.com/scholar?&q={term}', validator: 'getAndValidateSearchTerm' },
    'google-patents': { urlTemplate: 'https://patents.google.com/?q={term}', validator: 'getAndValidateSearchTerm' },
    'bing-standard': { urlTemplate: 'https://bing.com/search?q="{term}"', validator: 'getAndValidateSearchTerm' },
    'bing-news': { urlTemplate: 'https://bing.com/news/search?q="{term}"', validator: 'getAndValidateSearchTerm' },
    'yahoo': { urlTemplate: 'https://search.yahoo.com/search?p={term}', validator: 'getAndValidateSearchTerm' },
    'yandex': { urlTemplate: 'https://www.yandex.com/yandsearch?text={term}', validator: 'getAndValidateSearchTerm' },
    'baidu': { urlTemplate: 'https://baidu.com/s?wd={term}', validator: 'getAndValidateSearchTerm' },
    'searx': { urlTemplate: 'https://baresearch.org/?q={term}', validator: 'getAndValidateSearchTerm' },
    'duckduckgo': { urlTemplate: 'https://duckduckgo.com/?q={term}', validator: 'getAndValidateSearchTerm' },
    'startpage': { urlTemplate: 'https://startpage.com/do/search?q={term}', validator: 'getAndValidateSearchTerm' },
    'qwant': { urlTemplate: 'https://www.qwant.com/?q={term}', validator: 'getAndValidateSearchTerm' },
    'brave': { urlTemplate: 'https://search.brave.com/search?q={term}', validator: 'getAndValidateSearchTerm' },
    'wayback': { urlTemplate: 'https://web.archive.org/web/*/{term}', validator: 'getAndValidateSearchTerm' },
    'ahmia-clear': { urlTemplate: 'https://ahmia.fi/search/?q={term}', validator: 'getAndValidateSearchTerm' },
    'tor-tor66': { urlTemplate: 'http://www.tor66sewebgixwhcqfnp5inzp5x5uohhdy3kvtnyfxc2e5mxiuh34iid.onion/search?q={term}', validator: 'getAndValidateSearchTerm' },
    'tor-ahmia': { urlTemplate: 'http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion/search/?q={term}&action=search', validator: 'getAndValidateSearchTerm' },
    'tor-gdark': { urlTemplate: 'http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion/gdark/search.php?query={term}&search=1', validator: 'getAndValidateSearchTerm' },
    'tor-hiddenreviews': { urlTemplate: 'http://u5lyidiw4lpkonoctpqzxgyk6xop7w7w3oho4dzzsi272rwnjhyx7ayd.onion/?s={term}', validator: 'getAndValidateSearchTerm' },
    'tor-onionland': { urlTemplate: 'http://3bbad7fauom4d6sgppalyqddsqbf5u5p56b5k5uk2zxsy3d6ey2jobad.onion/search?q={term}', validator: 'getAndValidateSearchTerm' },
    'tor-submarine': { urlTemplate: 'http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion/search.php?term={term}', validator: 'getAndValidateSearchTerm' },
    'tor-deepsearch': { urlTemplate: 'http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion/search?q={term}', validator: 'getAndValidateSearchTerm' },
    'tor-onioncenter': { urlTemplate: 'http://5qqrlc7hw3tsgokkqifb33p3mrlpnleka2bjg7n46vih2synghb6ycid.onion/index.php?a=search&q={term}', validator: 'getAndValidateSearchTerm' },
    'tor-freshonion': { urlTemplate: 'http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion/?query={term}', validator: 'getAndValidateSearchTerm' },

    //
    // --- US ADDRESSES ---
    //
    'us-addr-addresses': { urlTemplate: 'https://www.addresses.com/addr/{num-plus-street}/{city-plus-state}/', validator: 'getAndValidateUS' },
    'us-addr-advbackground': { urlTemplate: 'https://www.advancedbackgroundchecks.com/address/{num-dash-street}_{city-dash-state-zip}', validator: 'getAndValidateUS' },
    'us-addr-cyberbackground': { urlTemplate: 'https://www.cyberbackgroundchecks.com/address/{num-dash-street}/{city}/{state}', validator: 'getAndValidateUS' },
    'us-addr-fastpeople': { urlTemplate: 'https://www.fastpeoplesearch.com/address/{num-dash-street}_{city-dash-state-zip}', validator: 'getAndValidateUS' },
    'us-addr-gisgraphy': { urlTemplate: 'https://services.gisgraphy.com/geocoding/geocode?address={full-plus-address}&format=json', validator: 'getAndValidateUS' },
    'us-addr-google': { urlTemplate: 'https://www.google.com/search?q={full-plus-address}', validator: 'getAndValidateUS' },
    'us-addr-whitepages': { urlTemplate: 'https://www.whitepages.com/address/{num-dash-street}/{city-dash-state}', validator: 'getAndValidateUS' },
    // ... Aggiungi le altre 9 ricerche US qui con lo stesso pattern ...

    //
    // --- INTERNATIONAL ADDRESSES ---
    //
    'intl-addr-fastpeople': { urlTemplate: 'https://www.fastpeoplesearch.com/address/-_{city-dash-country}', validator: 'getAndValidateIntl' },
    'intl-addr-gisgraphy': { urlTemplate: 'https://services.gisgraphy.com/geocoding/geocode?address={full-plus-address}&format=json', validator: 'getAndValidateIntl' },
    'intl-addr-google': { urlTemplate: 'https://www.google.com/search?q={full-plus-address}', validator: 'getAndValidateIntl' },
    
    //
    // --- ITALY ADDRESSES ---
    //
    'it-addr-companies': { urlTemplate: 'https://www.paginebianche.it/aziende?qs={name}&dv={city}', validator: 'getAndValidateItCompanies' },
    'it-addr-people': { urlTemplate: 'https://www.paginebianche.it/persone?qs={name}&dv={city}', validator: 'getAndValidateItPeople' },
    'it-addr-yellow': { urlTemplate: 'https://www.paginegialle.it/ricerca/{activity}/{location}', validator: 'getAndValidateItYellow' },

    //
    // --- GENERIC INTERNATIONAL TOOLS ---
    //
    'intl-tool-googlesearch': { urlTemplate: 'https://www.google.com/search?q="{term}"', validator: 'getAndValidateIntlTools' },
    'intl-tool-occrp': { urlTemplate: 'https://aleph.occrp.org/search?limit=30&q={term}', validator: 'getAndValidateIntlTools' },
    'intl-tool-riskiq': { urlTemplate: 'https://community.riskiq.com/search/whois/address?query={term}', validator: 'getAndValidateIntlTools' },
    'intl-tool-192': { urlTemplate: 'https://www.192.com/places/search/', no_input: true },
    'intl-tool-canada411': { urlTemplate: 'https://www.canada411.ca/search/address.html', no_input: true }
    // ... Aggiungi gli altri tool qui ...
};