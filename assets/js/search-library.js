const SearchLibrary = {
    //
    // --- SEARCH ENGINES ---
    //
    'google-standard': {
        name: 'Google: Standard Search',
        description: 'Performs a standard web search on Google.',
        urlTemplate: 'https://google.com/search?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'google-date': {
        name: 'Google: Search by Date',
        description: 'Performs a Google search for the term, sorted by date.',
        urlTemplate: 'https://google.com/search?q={term}&tbs=cdr:1,cd_min:1/1/0,sbd:1',
        validator: 'getAndValidateSearchTerm'
    },
    'google-news': {
        name: 'Google: News Search',
        description: 'Searches for the term specifically within Google News.',
        urlTemplate: 'https://www.google.com/search?tbm=nws&q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'google-ftp': {
        name: 'Google: FTP Search',
        description: 'Searches for open FTP servers related to the term.',
        urlTemplate: 'https://www.google.com/search?q=inurl%3Aftp%20-inurl%3A(http|https)%20{term}',
        validator: 'getAndValidateSearchTerm'
    },
    'google-index': {
        name: 'Google: Index Of Search',
        description: 'Searches for open directories related to the term.',
        urlTemplate: 'https://www.google.com/search?q=intitle%3Aindex.of%20{term}',
        validator: 'getAndValidateSearchTerm'
    },
    'google-scholar': {
        name: 'Google: Scholar',
        description: 'Searches for academic papers and articles on Google Scholar.',
        urlTemplate: 'https://scholar.google.com/scholar?&q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'google-patents': {
        name: 'Google: Patents',
        description: 'Searches for patents related to the term.',
        urlTemplate: 'https://patents.google.com/?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'bing-standard': {
        name: 'Bing: Standard Search',
        description: 'Performs a standard web search on Bing.',
        urlTemplate: 'https://bing.com/search?q="{term}"',
        validator: 'getAndValidateSearchTerm'
    },
    'bing-news': {
        name: 'Bing: News Search',
        description: 'Searches for the term specifically within Bing News.',
        urlTemplate: 'https://bing.com/news/search?q="{term}"',
        validator: 'getAndValidateSearchTerm'
    },
    'yahoo': {
        name: 'Yahoo: Standard Search',
        description: 'Performs a standard web search on Yahoo.',
        urlTemplate: 'https://search.yahoo.com/search?p={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'yandex': {
        name: 'Yandex: Standard Search',
        description: 'Performs a standard web search on Yandex.',
        urlTemplate: 'https://www.yandex.com/yandsearch?text={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'baidu': {
        name: 'Baidu: Standard Search',
        description: 'Performs a standard web search on Baidu.',
        urlTemplate: 'https://baidu.com/s?wd={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'searx': {
        name: 'SearX: Metasearch',
        description: 'Performs a private metasearch using SearX.',
        urlTemplate: 'https://baresearch.org/?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'duckduckgo': {
        name: 'DuckDuckGo: Standard Search',
        description: 'Performs a privacy-focused search on DuckDuckGo.',
        urlTemplate: 'https://duckduckgo.com/?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'startpage': {
        name: 'Startpage: Private Search',
        description: 'Performs a private search via Startpage.',
        urlTemplate: 'https://startpage.com/do/search?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'qwant': {
        name: 'Qwant: Standard Search',
        description: 'Performs a standard web search on Qwant.',
        urlTemplate: 'https://www.qwant.com/?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'brave': {
        name: 'Brave: Private Search',
        description: 'Performs a private search using the Brave search engine.',
        urlTemplate: 'https://search.brave.com/search?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'wayback': {
        name: 'Wayback Machine',
        description: 'Searches the Internet Archive\'s Wayback Machine for snapshots of a URL.',
        urlTemplate: 'https://web.archive.org/web/*/{term}',
        validator: 'getAndValidateSearchTerm'
    },
    'ahmia-clear': {
        name: 'Ahmia: Clearnet .onion Search',
        description: 'Searches for .onion sites using Ahmia\'s clearnet portal.',
        urlTemplate: 'https://ahmia.fi/search/?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'tor-tor66': {
        name: 'Tor: Tor66 Search',
        description: 'Performs a search on the Tor66 search engine.',
        urlTemplate: 'http://www.tor66sewebgixwhcqfnp5inzp5x5uohhdy3kvtnyfxc2e5mxiuh34iid.onion/search?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'tor-ahmia': {
        name: 'Tor: Ahmia Search',
        description: 'Performs a search on the Ahmia.fi search engine within Tor.',
        urlTemplate: 'http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion/search/?q={term}&action=search',
        validator: 'getAndValidateSearchTerm'
    },
    'tor-gdark': {
        name: 'Tor: gDark Search',
        description: 'Performs a search on the gDark search engine.',
        urlTemplate: 'http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion/gdark/search.php?query={term}&search=1',
        validator: 'getAndValidateSearchTerm'
    },
    'tor-hiddenreviews': {
        name: 'Tor: HiddenReviews Search',
        description: 'Performs a search on the HiddenReviews search engine.',
        urlTemplate: 'http://u5lyidiw4lpkonoctpqzxgyk6xop7w7w3oho4dzzsi272rwnjhyx7ayd.onion/?s={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'tor-onionland': {
        name: 'Tor: Onionland Search',
        description: 'Performs a search on the Onionland search engine.',
        urlTemplate: 'http://3bbad7fauom4d6sgppalyqddsqbf5u5p56b5k5uk2zxsy3d6ey2jobad.onion/search?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'tor-submarine': {
        name: 'Tor: Submarine Search',
        description: 'Performs a search on the Submarine search engine.',
        urlTemplate: 'http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion/search.php?term={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'tor-deepsearch': {
        name: 'Tor: DeepSearch',
        description: 'Performs a search on the DeepSearch search engine.',
        urlTemplate: 'http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion/search?q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'tor-onioncenter': {
        name: 'Tor: OnionCenter Search',
        description: 'Performs a search on the OnionCenter search engine.',
        urlTemplate: 'http://5qqrlc7hw3tsgokkqifb33p3mrlpnleka2bjg7n46vih2synghb6ycid.onion/index.php?a=search&q={term}',
        validator: 'getAndValidateSearchTerm'
    },
    'tor-freshonion': {
        name: 'Tor: FreshOnion Search',
        description: 'Searches for .onion sites using FreshOnion.',
        urlTemplate: 'http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion/?query={term}',
        validator: 'getAndValidateSearchTerm'
    },

    //
    // --- NAMES ---
    //
    'names-9jabook': {
        name: '9jaBook: Name Search',
        description: 'Searches for a name on 9jaBook.',
        urlTemplate: 'https://9jabook.com/main/search/search?q={fullName}',
        validator: 'getAndValidateName'
    },
    'names-facebook-direct': {
        name: 'Facebook: Name Search',
        description: 'Searches directly on Facebook for people matching the name.',
        urlTemplate: 'https://www.facebook.com/search/top?q={fullName}',
        validator: 'getAndValidateName'
    },
    'names-facebook-google': {
        name: 'Google dork: Facebook',
        description: 'Uses a Google dork to search for a name on Facebook.',
        urlTemplate: 'https://www.google.com/search?q=site%3Afacebook.com+"{fullName}"',
        validator: 'getAndValidateName'
    },
    'names-google-maps': {
        name: 'Google Maps: Name Search',
        description: 'Performs a search for a name on Google Maps.',
        urlTemplate: 'https://www.google.com/maps/search/FULL_NAME_ENC{fullName}',
        validator: 'getAndValidateName'
    },
    'names-google-search': {
        name: 'Google: Name Search',
        description: 'Performs a quoted search on Google for a full name.',
        urlTemplate: 'https://www.google.com/search?q="{fullName}"',
        validator: 'getAndValidateName'
    },
    'names-idcrawl': {
        name: 'IDCrawl: Name Search',
        description: 'Searches for a name on IDCrawl.',
        urlTemplate: 'https://www.idcrawl.com/{fullNameDash}',
        validator: 'getAndValidateName'
    },
    'names-instagram-google': {
        name: 'Google dork: Instagram',
        description: 'Uses a Google dork to search for a name on Instagram.',
        urlTemplate: 'https://www.google.com/search?q=site%3Ainstagram.com+"{fullName}"',
        validator: 'getAndValidateName'
    },
    'names-socialsearcher': {
        name: 'Social Searcher',
        description: 'Searches for a name across multiple social networks.',
        urlTemplate: 'https://www.social-searcher.com/search-users/?q6={fullName}',
        validator: 'getAndValidateName'
    },
    'names-thatsthem-name': {
        name: 'ThatsThem: Name Search',
        description: 'Searches for a name on ThatsThem.',
        urlTemplate: 'https://thatsthem.com/name/{fullNameDash}',
        validator: 'getAndValidateName'
    },
    'names-twitter-direct': {
        name: 'X (Twitter): Name Search',
        description: 'Searches for user profiles on X (Twitter) by real name.',
        urlTemplate: 'https://twitter.com/search?q=({fullName})&src=typed_query&f=user',
        validator: 'getAndValidateName'
    },
    'names-twitter-google': {
        name: 'Google dork: X (Twitter)',
        description: 'Uses a Google dork to search for a name on X (Twitter).',
        urlTemplate: 'https://www.google.com/search?q=site%3Atwitter.com+"{fullName}"',
        validator: 'getAndValidateName'
    },
    'names-webmii': {
        name: 'Webmii: Name Search',
        description: 'Searches for a name across the web using Webmii.',
        urlTemplate: 'https://webmii.com/people?n={fullName}',
        validator: 'getAndValidateName'
    },
    'names-asa': {
        name: 'ASA (UK): Sanctions',
        description: 'Searches the UK Advertising Standards Authority for a name.',
        urlTemplate: 'https://www.asa.org.uk/search.html?q={fullName}',
        validator: 'getAndValidateName'
    },
    'names-occrp': {
        name: 'OCCRP Aleph: Name Search',
        description: 'Searches the OCCRP Aleph database for a name.',
        urlTemplate: 'https://aleph.occrp.org/search?limit=30&q={fullName}',
        validator: 'getAndValidateName'
    },
    'names-ofac-recent': {
        name: 'OFAC: Recent Actions',
        description: 'Searches OFAC recent actions for a name.',
        urlTemplate: 'https://ofac.treasury.gov/recent-actions?search_api_fulltext={fullName}&ra-start-date=&ra-end-date=&ra_year=',
        validator: 'getAndValidateName'
    },
    'names-opensanctions': {
        name: 'OpenSanctions: Name Search',
        description: 'Checks the name against the OpenSanctions database.',
        urlTemplate: 'https://www.opensanctions.org/search/?q={fullName}',
        validator: 'getAndValidateName'
    },
    'names-udrp': {
        name: 'UDRP: Party Search',
        description: 'Searches Uniform Domain-Name Dispute-Resolution Policy cases for a name.',
        urlTemplate: 'https://www.udrpsearch.com/search?query={fullName}&search=parties',
        validator: 'getAndValidateName'
    },
    'names-interpol': {
        name: 'Interpol: Red Notices',
        description: 'Opens the Interpol page for wanted persons (no input).',
        urlTemplate: 'https://www.interpol.int/en/How-we-work/Notices/View-Red-Notices',
        no_input: true
    },
    'names-ofac-search': {
        name: 'OFAC: Sanctions List Search',
        description: 'Opens the main OFAC sanctions list search page.',
        urlTemplate: 'https://sanctionssearch.ofac.treas.gov/',
        no_input: true
    },
    'names-censys-cert': {
        name: 'Censys: Certificate Search',
        description: 'Searches SSL/TLS certificates on Censys for a name.',
        urlTemplate: 'https://search.censys.io/search?resource=certificates&sort=RELEVANCE&per_page=25&virtual_hosts=EXCLUDE&q={fullName}',
        validator: 'getAndValidateName'
    },
    'names-crunchbase': {
        name: 'Crunchbase: People Search',
        description: 'Searches for people on Crunchbase.',
        urlTemplate: 'https://www.crunchbase.com/discover/people/{fullNameDashLower}',
        validator: 'getAndValidateName'
    },
    'names-domaintools-whois': {
        name: 'DomainTools: Reverse Whois',
        description: 'Performs a reverse Whois lookup on DomainTools for a name.',
        urlTemplate: 'https://reversewhois.domaintools.com/?refine#q=%5B%5B%5B"whois","2","{fullName}"%5D%5D%5D&historical=1',
        validator: 'getAndValidateName'
    },
    'names-opencorporates': {
        name: 'OpenCorporates: Officers',
        description: 'Searches for corporate officers by name on OpenCorporates.',
        urlTemplate: 'https://opencorporates.com/officers?q={fullName}',
        validator: 'getAndValidateName'
    },
    'names-riskiq': {
        name: 'RiskIQ: Tracker Search',
        description: 'Searches for trackers by name using RiskIQ Community.',
        urlTemplate: 'https://community.riskiq.com/search/trackers?query={fullName}',
        validator: 'getAndValidateName'
    },
    'names-canada411': {
        name: 'Canada411',
        description: 'Opens the Canada411 address search page.',
        urlTemplate: 'https://www.canada411.ca/search/address.html',
        no_input: true
    },
    'names-zaubacorp': {
        name: 'ZaubaCorp: Director Search (India)',
        description: 'Searches for company directors in India.',
        urlTemplate: 'https://www.zaubacorp.com/directorsearchresults/{fullName}',
        validator: 'getAndValidateName'
    },
    'names-paginebianche': {
        name: 'Pagine Bianche (Italy)',
        description: 'Searches for people in the Italian White Pages.',
        urlTemplate: 'https://www.paginebianche.it/persone?qs={fullNameDash}',
        validator: 'getAndValidateName'
    },
    'names-paginegialle': {
        name: 'Pagine Gialle (Italy)',
        description: 'Searches the Italian Yellow Pages.',
        urlTemplate: 'https://www.paginegialle.it/ricerca/{fullNameDash}',
        validator: 'getAndValidateName'
    },
    'names-checkoru': {
        name: 'Checko.ru (Russia)',
        description: 'Searches for names in Russia via Checko.ru.',
        urlTemplate: 'https://checko.ru/search?query={fullName}',
        validator: 'getAndValidateName'
    },
    'names-rusfinder': {
        name: 'Rusfinder.pro (Russia)',
        description: 'Opens the Rusfinder.pro search page.',
        urlTemplate: 'https://rusfinder.pro/search/',
        no_input: true
    },
    'names-ukphonebook-name': {
        name: 'UK Phone Book: Name Search',
        description: 'Searches for a person by name in the UK Phone Book.',
        urlTemplate: 'https://www.ukphonebook.com/find-a-person/by-fullname/{fullName}',
        validator: 'getAndValidateName'
    },
    'names-ukphonebook-resi': {
        name: 'UK Phone Book: Directory',
        description: 'Opens the UK residential telephone directory.',
        urlTemplate: 'https://www.ukphonebook.com/residential-telephone-directory/',
        no_input: true
    },
    'names-us-addresses': {
        name: 'Addresses.com (US)',
        description: 'Searches for people in the US on Addresses.com.',
        urlTemplate: 'https://www.addresses.com/people/{fullNameDash}',
        validator: 'getAndValidateName'
    },
    'names-us-advbackground': {
        name: 'Advanced Background Checks (US)',
        description: 'Searches for people in the US using Advanced Background Checks.',
        urlTemplate: 'https://www.advancedbackgroundchecks.com/names/{firstName}-{lastName}',
        validator: 'getAndValidateName'
    },
    'names-us-classmates': {
        name: 'Classmates.com (US)',
        description: 'Searches for people on Classmates.com.',
        urlTemplate: 'https://www.classmates.com/siteui/ybsearch/results?q={fullName}',
        validator: 'getAndValidateName'
    },
    'names-us-cyberbackground': {
        name: 'Cyber Background Checks (US)',
        description: 'Searches for people using Cyber Background Checks.',
        urlTemplate: 'https://www.cyberbackgroundchecks.com/people/{firstName}-{lastName}',
        validator: 'getAndValidateName'
    },
    'names-us-familytreenow': {
        name: 'FamilyTreeNow (US)',
        description: 'Searches genealogy records on FamilyTreeNow.',
        urlTemplate: 'https://www.familytreenow.com/search/genealogy/results?first={firstName}&last={lastName}',
        validator: 'getAndValidateName'
    },
    'names-us-fastpeople': {
        name: 'FastPeopleSearch (US)',
        description: 'Searches for people using FastPeopleSearch.',
        urlTemplate: 'https://www.fastpeoplesearch.com/name/{firstName}-{lastName}',
        validator: 'getAndValidateName'
    },
    'names-us-idcrawl-us': {
        name: 'IDCrawl (US Focused)',
        description: 'Performs a US-focused search on IDCrawl.',
        urlTemplate: 'https://www.idcrawl.com/{firstName}-{lastName}',
        validator: 'getAndValidateName'
    },
    'names-us-intelius': {
        name: 'Intelius (US)',
        description: 'Searches for people using Intelius.',
        urlTemplate: 'https://www.intelius.com/people-search/{firstName}-{lastName}',
        validator: 'getAndValidateName'
    },
    'names-us-nuwber': {
        name: 'Nuwber (US)',
        description: 'Searches for people on Nuwber.',
        urlTemplate: 'https://nuwber.com/search?name={fullName}',
        validator: 'getAndValidateName'
    },
    'names-us-peoplebyname': {
        name: 'PeopleByName (US)',
        description: 'Searches for people using PeopleByName.',
        urlTemplate: 'https://www.peoplebyname.com/people/{lastName_RAW}/{firstName_RAW}',
        validator: 'getAndValidateName'
    },
    'names-us-peoplesearchnow': {
        name: 'PeopleSearchNow (US)',
        description: 'Searches for people on PeopleSearchNow.',
        urlTemplate: 'https://www.peoplesearchnow.com/person/{firstName}-{lastName}',
        validator: 'getAndValidateName'
    },
    'names-us-radaris': {
        name: 'Radaris (US)',
        description: 'Searches for people on Radaris.',
        urlTemplate: 'https://radaris.com/p/{firstName_RAW}/{lastName_RAW}',
        validator: 'getAndValidateName'
    },
    'names-us-rocketreach': {
        name: 'RocketReach (Google Dork)',
        description: 'Uses Google to search for professional profiles on RocketReach.',
        urlTemplate: 'https://google.com/search?q=site:rocketreach.co+"{fullName}"',
        validator: 'getAndValidateName'
    },
    'names-us-searchpeoplefree': {
        name: 'SearchPeopleFree (US)',
        description: 'Searches for people on SearchPeopleFree.',
        urlTemplate: 'https://www.searchpeoplefree.com/find/{firstName}-{lastName}',
        validator: 'getAndValidateName'
    },
    'names-us-searchsystems': {
        name: 'SearchSystems.net (US)',
        description: 'Opens the SearchSystems.net public records portal.',
        urlTemplate: 'https://publicrecords.searchsystems.net/',
        no_input: true
    },
    'names-us-spokeo': {
        name: 'Spokeo (US)',
        description: 'Searches for people on Spokeo.',
        urlTemplate: 'https://www.spokeo.com/{firstName}-{lastName}?loaded=1',
        validator: 'getAndValidateName'
    },
    'names-us-thatsthem': {
        name: 'ThatsThem: Name Search (US)',
        description: 'Searches for people by name on ThatsThem.',
        urlTemplate: 'https://thatsthem.com/name/{fullNameDash}',
        validator: 'getAndValidateName'
    },
    'names-us-truepeople': {
        name: 'TruePeopleSearch (US)',
        description: 'Searches for people on TruePeopleSearch.',
        urlTemplate: 'https://www.truepeoplesearch.com/results?name={fullName}',
        validator: 'getAndValidateName'
    },
    'names-us-truthfinder': {
        name: 'TruthFinder (US)',
        description: 'Searches for people on TruthFinder.',
        urlTemplate: 'https://www.truthfinder.com/results/?firstName={firstName}&lastName={lastName}&state=ALL',
        validator: 'getAndValidateName'
    },
    'names-us-usaofficial': {
        name: 'USA-Official.com (US)',
        description: 'Searches for people on USA-Official.com.',
        urlTemplate: 'https://usa-official.com/{firstName}-{lastName}',
        validator: 'getAndValidateName'
    },
    'names-us-whitepages': {
        name: 'WhitePages: Name Search (US)',
        description: 'Searches for people by name on WhitePages.',
        urlTemplate: 'https://www.whitepages.com/name/{fullNameDash}',
        validator: 'getAndValidateName'
    },
    'names-us-yasni': {
        name: 'Yasni (US)',
        description: 'Searches for people on Yasni.',
        urlTemplate: 'https://www.yasni.com/{fullName}/check+people?sh',
        validator: 'getAndValidateName'
    },
    'names-us-zabasearch': {
        name: 'ZabaSearch (US)',
        description: 'Searches for people on ZabaSearch.',
        urlTemplate: 'https://www.zabasearch.com/people/{fullName}',
        validator: 'getAndValidateName'
    },
//
// --- Entries for Documents Page ---
//
'docs-google-api': {
    name: 'Google: API Storage',
    description: 'Searches for documents within storage.googleapis.com.',
    urlTemplate: 'https://www.google.com/search?q=site%3Astorage.googleapis.com+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-google-books': {
    name: 'Google: Books',
    description: 'Searches for the term within Google Books.',
    urlTemplate: 'https://www.google.com/search?tbm=bks&q={term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-google-docs': {
    name: 'Google: Docs',
    description: 'Searches for public documents on docs.google.com.',
    urlTemplate: 'https://www.google.com/search?q=site%3Adocs.google.com+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-google-drive': {
    name: 'Google: Drive',
    description: 'Searches for public files on drive.google.com.',
    urlTemplate: 'https://www.google.com/search?q=site%3Adrive.google.com+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-amazon': {
    name: 'Amazon AWS Search',
    description: 'Searches for public files hosted on Amazon AWS.',
    urlTemplate: 'https://www.google.com/search?q=site%3Aamazonaws.com+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-archiveorg': {
    name: 'Archive.org Search',
    description: 'Searches for text content within Archive.org.',
    urlTemplate: 'https://archive.org/search.php?query={term}&sin=TXT',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-cloudfront': {
    name: 'Cloudfront Search',
    description: 'Searches for public files hosted on Cloudfront.',
    urlTemplate: 'https://www.google.com/search?q=site%3Acloudfront.net+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-core': {
    name: 'CORE Search',
    description: 'Searches for open access research papers on core.ac.uk.',
    urlTemplate: 'https://core.ac.uk/search/?q={term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-grayhat': {
    name: 'GrayHatWarfare Buckets',
    description: 'Searches for terms in public cloud storage buckets.',
    urlTemplate: 'https://buckets.grayhatwarfare.com/results/{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-issuu': {
    name: 'ISSUU Search',
    description: 'Searches for publications on issuu.com.',
    urlTemplate: 'https://www.google.com/search?q=site%3Aissuu.com+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-msdocs': {
    name: 'Microsoft Docs Search',
    description: 'Searches for public documents on docs.microsoft.com.',
    urlTemplate: 'https://www.google.com/search?q=site%3Adocs.microsoft.com+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-pdfdrive': {
    name: 'PDF Drive',
    description: 'Searches for PDF documents on PDFDrive.net.',
    urlTemplate: 'https://www.pdfdrive.net/search?q={term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-powershow': {
    name: 'Powershow Search',
    description: 'Searches for presentations on Powershow.com.',
    urlTemplate: 'https://www.powershow.com/search/presentations/ppt/{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-prezi': {
    name: 'Prezi Search',
    description: 'Searches for presentations on prezi.com.',
    urlTemplate: 'https://www.google.com/search?q=site%3Aprezi.com+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-refseek': {
    name: 'Refseek Document Search',
    description: 'Searches for documents on the Refseek academic search engine.',
    urlTemplate: 'https://www.refseek.com/documents?q={term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-scribd': {
    name: 'Scribd Search',
    description: 'Searches for documents on scribd.com.',
    urlTemplate: 'https://www.google.com/search?q=site%3Ascribd.com+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-slidebean': {
    name: 'Slide Bean Search',
    description: 'Searches for presentations on slidebean.com.',
    urlTemplate: 'https://www.google.com/search?q=site%3Aslidebean.com+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-slideshare': {
    name: 'SlideShare Search',
    description: 'Searches for presentations on slideshare.net.',
    urlTemplate: 'https://www.google.com/search?q=site%3Aslideshare.net+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-other-wikileaks': {
    name: 'Wikileaks Search',
    description: 'Searches the Wikileaks database.',
    urlTemplate: 'https://search.wikileaks.org/?query={term}&exact_phrase=&any_of=&exclude_words=&document_date_start=&document_date_end=&released_date_start=&released_date_end=&new_search=True&order_by=most_relevant#results',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-doc': {
    name: 'Filetype: DOC/DOCX',
    description: 'Google dork to find Microsoft Word documents.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Adoc+OR+ext%3Adocx+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-odt': {
    name: 'Filetype: ODT/ODS/ODP',
    description: 'Google dork to find OpenDocument format files.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Aodt+OR+ext%3Aods+OR+ext%3Aodp+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-pdf': {
    name: 'Filetype: PDF',
    description: 'Google dork to find PDF documents.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Apdf+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-ppt': {
    name: 'Filetype: PPT/PPTX/KEY',
    description: 'Google dork to find presentation files.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Appt+OR+ext%3Apptx+OR+ext%3Akey+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-txt': {
    name: 'Filetype: TXT/RTF/XML',
    description: 'Google dork to find plain text, rich text, or XML files.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Atxt+OR+ext%3Artf+OR+ext%3Axml+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-xls': {
    name: 'Filetype: XLS/XLSX/CSV',
    description: 'Google dork to find spreadsheet files.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Axls+OR+ext%3Axlsx+OR+ext%3Acsv+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-jpg': {
    name: 'Filetype: JPG/PNG (Images)',
    description: 'Google dork to find common image files.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Ajpg+OR+ext%3Ajpeg+OR+ext%3Apng+{term}&tbm=isch',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-mp3': {
    name: 'Filetype: MP3/WAV (Audio)',
    description: 'Google dork to find common audio files.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Amp3+OR+ext%3Awav+OR+ext%3Aflac+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-mpg': {
    name: 'Filetype: MPG/MP4 (Video)',
    description: 'Google dork to find common video files.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Ampg+OR+ext%3Ampeg+OR+ext%3Amp4+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
'docs-filetype-zip': {
    name: 'Filetype: ZIP/RAR/7Z (Archives)',
    description: 'Google dork to find common compressed archive files.',
    urlTemplate: 'https://www.google.com/search?q=ext%3Azip+OR+ext%3Arar+OR+ext%3A7z+{term}',
    validator: 'getAndValidateSingleInput',
    targetInput: 'input-docs-term'
},
    //
    // --- Entries for Address Page ---
    //
    'address-us-addressescom': {
        name: 'Addresses.com: Address Search (US)',
        description: 'Searches for a US address on Addresses.com.',
        urlTemplate: 'https://www.addresses.com/addr/{usNum}+{usStreet}/{usCity}+{usState}/',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-advbackground': {
        name: 'Advanced Background Checks: Address (US)',
        description: 'Performs a reverse address lookup on Advanced Background Checks.',
        urlTemplate: 'https://www.advancedbackgroundchecks.com/address/{usNum}-{usStreet}_{usCity}-{usState}-{usZip}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-cyberbackground': {
        name: 'Cyber Background Checks: Address (US)',
        description: 'Performs a reverse address lookup on Cyber Background Checks.',
        urlTemplate: 'https://www.cyberbackgroundchecks.com/address/{usNum}-{usStreet}/{usCity}/{usState}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-fastpeople': {
        name: 'FastPeopleSearch: Address (US)',
        description: 'Performs a reverse address lookup on FastPeopleSearch.',
        urlTemplate: 'https://www.fastpeoplesearch.com/address/{usNum}-{usStreet}_{usCity}-{usState}-{usZip}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-gisgraphy': {
        name: 'GISGraphy: Geocoding (US)',
        description: 'Performs a geocoding lookup for a US address.',
        urlTemplate: 'https://services.gisgraphy.com/geocoding/geocode?address={usNum}+{usStreet}+{usCity}+{usState}+{usZip}&format=json',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-google': {
        name: 'Google: Address Search (US)',
        description: 'Searches for a specific US address on Google.',
        urlTemplate: 'https://www.google.com/search?q={usNum}+{usStreet}+{usCity}+{usState}+{usZip}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-hudway': {
        name: 'Hudway: House Search (US)',
        description: 'Searches for a house on Hudway.',
        urlTemplate: 'https://hudwayglass.com/house/{usNum}+{usStreet},+{usCity}+{usState}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-peoplefinders': {
        name: 'PeopleFinders: Address Search (US)',
        description: 'Performs a reverse address lookup on PeopleFinders.',
        urlTemplate: 'https://www.peoplefinders.com/people/search/address?address={usNum}%20{usStreet}&city={usCity}&state={usState}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-rehold': {
        name: 'Rehold: Property Search (US)',
        description: 'Searches for property information on Rehold.',
        urlTemplate: 'https://rehold.com/{usCity}+{usState}/{usStreet}/{usNum}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-searchpeoplefree': {
        name: 'SearchPeopleFree: Address (US)',
        description: 'Performs a reverse address lookup on SearchPeopleFree.',
        urlTemplate: 'https://www.searchpeoplefree.com/address/{usState}/{usCity}/{usStreet}/{usNum}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-smartbackground': {
        name: 'Smart Background Checks: Address (US)',
        description: 'Performs a reverse address lookup on Smart Background Checks.',
        urlTemplate: 'https://www.smartbackgroundchecks.com/address-search/{usNum}-{usStreet}/{usCity}/{usState}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-spokeo': {
        name: 'Spokeo: Address Search (US)',
        description: 'Performs a reverse address lookup on Spokeo.',
        urlTemplate: 'https://www.spokeo.com/{usState}/{usCity}/{usNum}-{usStreet}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-truepeople': {
        name: 'TruePeopleSearch: Address (US)',
        description: 'Performs a reverse address lookup on TruePeopleSearch.',
        urlTemplate: 'https://www.truepeoplesearch.com/resultaddress?streetaddress={usNum}%20{usStreet}&citystatezip={usCity}%20{usState}%20{usZip}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-usapeople': {
        name: 'USA People Search: Address (US)',
        description: 'Performs a reverse address lookup on USA People Search.',
        urlTemplate: 'https://www.usa-people-search.com/address/{usNum}-{usStreet}/{usCity}-{usState}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-whitepages': {
        name: 'WhitePages: Address Search (US)',
        description: 'Performs a reverse address lookup on WhitePages.',
        urlTemplate: 'https://www.whitepages.com/address/{usNum}-{usStreet}/{usCity}-{usState}',
        validator: 'getAndValidateUsAddress'
    },
    'address-us-zillow': {
        name: 'Zillow: Property Search (US)',
        description: 'Searches for property information on Zillow.',
        urlTemplate: 'https://www.zillow.com/homes/{usNum}-{usStreet}-{usCity}-{usState}-{usZip}_rb/',
        validator: 'getAndValidateUsAddress'
    },
    'address-intl-fastpeople': {
        name: 'FastPeopleSearch: Address (Intl)',
        description: 'Performs an international reverse address lookup on FastPeopleSearch.',
        urlTemplate: 'https://www.fastpeoplesearch.com/address/{intlNum}-{intlStreet}_{intlCity}-{intlRegion}-{intlZip}',
        validator: 'getAndValidateIntlAddress'
    },
    'address-intl-gisgraphy': {
        name: 'GISGraphy: Geocoding (Intl)',
        description: 'Performs a geocoding lookup for an international address.',
        urlTemplate: 'https://services.gisgraphy.com/geocoding/geocode?address={intlStreet}+{intlNum}+{intlZip}+{intlCity}+{intlRegion}&format=json',
        validator: 'getAndValidateIntlAddress'
    },
    'address-intl-google': {
        name: 'Google: Address Search (Intl)',
        description: 'Searches for a specific international address on Google.',
        urlTemplate: 'https://www.google.com/search?q={intlStreet}+{intlNum}+{intlZip}+{intlCity}+{intlRegion}',
        validator: 'getAndValidateIntlAddress'
    },
    'address-it-paginebianche-companies': {
        name: 'Pagine Bianche: Companies (IT)',
        description: 'Searches for companies in the Italian White Pages.',
        urlTemplate: 'https://www.paginebianche.it/aziende?qs={itCompany}&dv={itCity}%20({itProv})',
        validator: 'getAndValidateItCompanies'
    },
    'address-it-paginebianche-people': {
        name: 'Pagine Bianche: People (IT)',
        description: 'Searches for people in the Italian White Pages.',
        urlTemplate: 'https://www.paginebianche.it/persone?qs={itFirst}%20{itLast}&dv={itCityP}%20({itProvP})',
        validator: 'getAndValidateItPeople'
    },
    'address-it-paginegialle': {
        name: 'Pagine Gialle (IT)',
        description: 'Searches the Italian Yellow Pages by activity and location.',
        urlTemplate: 'https://www.paginegialle.it/ricerca/{itAct}/{itLoc}',
        validator: 'getAndValidateItYellow'
    },

    //
    // --- Entries for Communities Page ---
    //
    'communities-reddit-keyword': {
        name: 'Reddit: Keyword Search',
        description: 'Performs a keyword search across all of Reddit.',
        urlTemplate: 'https://old.reddit.com/search?q={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditTerm'
    },
    'communities-reddit-title': {
        name: 'Reddit: Title Search',
        description: 'Searches for submissions with a specific title on Reddit.',
        urlTemplate: 'https://old.reddit.com/search?q=title:{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditTerm'
    },
    'communities-reddit-pullpush-asc': {
        name: 'PullPush: Reddit Comments Asc',
        description: 'Searches Reddit comments via the PullPush API, sorted ascending.',
        urlTemplate: 'https://api.pullpush.io/reddit/search/comment/?q={term}&sort=asc&size=100',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditTerm'
    },
    'communities-reddit-pullpush-desc': {
        name: 'PullPush: Reddit Comments Desc',
        description: 'Searches Reddit comments via the PullPush API, sorted descending.',
        urlTemplate: 'https://api.pullpush.io/reddit/search/comment/?q={term}&sort=desc&size=100',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditTerm'
    },
    'communities-reddit-profile': {
        name: 'Reddit: User Profile',
        description: 'Looks up a specific user profile on Reddit.',
        urlTemplate: 'https://old.reddit.com/user/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditUser'
    },
    'communities-reddit-submissions': {
        name: 'Reddit: User Submissions',
        description: 'Views all submissions made by a specific Reddit user.',
        urlTemplate: 'https://old.reddit.com/user/{term}/submitted',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditUser'
    },
    'communities-reddit-comments': {
        name: 'Reddit: User Comments',
        description: 'Views all comments made by a specific Reddit user.',
        urlTemplate: 'https://old.reddit.com/user/{term}/comments/',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditUser'
    },
    'communities-reddit-archive': {
        name: 'Wayback: Reddit User Archive',
        description: 'Searches the Wayback Machine for archives of a Reddit user profile.',
        urlTemplate: 'https://web.archive.org/*/https://www.reddit.com/user/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditUser'
    },
    'communities-reddit-api-asc': {
        name: 'PullPush: User Comments Asc',
        description: 'Retrieves user comments from the PullPush API, sorted ascending.',
        urlTemplate: 'https://api.pullpush.io/reddit/search/comment/?author={term}&sort=asc&size=100',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditUser'
    },
    'communities-reddit-api-desc': {
        name: 'PullPush: User Comments Desc',
        description: 'Retrieves user comments from the PullPush API, sorted descending.',
        urlTemplate: 'https://api.pullpush.io/reddit/search/comment/?author={term}&sort=desc&size=100',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-redditUser'
    },
    'communities-hn-search': {
        name: 'Hacker News: Search',
        description: 'Searches Hacker News via Algolia, sorted by date.',
        urlTemplate: 'https://hn.algolia.com/?query={term}&sort=byDate&page=0',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-hnTerm'
    },
    'communities-hn-google': {
        name: 'Google dork: Hacker News',
        description: 'Uses a Google dork to search Hacker News.',
        urlTemplate: 'https://www.google.com/search?q=site:news.ycombinator.com+{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-hnTerm'
    },
    'communities-hn-profile': {
        name: 'Hacker News: User Profile',
        description: 'Looks up a specific user profile on Hacker News.',
        urlTemplate: 'https://news.ycombinator.com/user?id={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-hnUser'
    },
    'communities-hn-submissions': {
        name: 'Hacker News: User Submissions',
        description: 'Views all submissions made by a specific Hacker News user.',
        urlTemplate: 'https://news.ycombinator.com/submitted?id={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-hnUser'
    },
    'communities-hn-threads': {
        name: 'Hacker News: User Threads',
        description: 'Views all comment threads a specific Hacker News user participated in.',
        urlTemplate: 'https://news.ycombinator.com/threads?id={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-hnUser'
    },
    'communities-hn-favorites': {
        name: 'Hacker News: User Favorites',
        description: 'Views all stories favorited by a specific Hacker News user.',
        urlTemplate: 'https://news.ycombinator.com/favorites?id={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-hnUser'
    },
    'communities-4chan-boards': {
        name: '4chan: Board Search',
        description: 'Searches 4chan boards for a term.',
        urlTemplate: 'http://4chansearch.com/?q={term}&s=4',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-4chanTerm'
    },
    'communities-4chan-threads': {
        name: '4chan: Thread Search',
        description: 'Searches 4chan threads for a term.',
        urlTemplate: 'http://4chansearch.com/?q={term}&s=7',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-4chanTerm'
    },
    'communities-4chan-archive': {
        name: '4plebs: 4chan Archive Search',
        description: 'Searches the 4plebs archive for a term.',
        urlTemplate: 'https://archive.4plebs.org/_/search/text/{term}/order/asc/',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-4chanTerm'
    },
    'communities-4chan-google': {
        name: 'Google dork: 4chan',
        description: 'Uses a Google dork to search 4chan.org.',
        urlTemplate: 'https://www.google.com/search?q=site:4chan.org+{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-4chanTerm'
    },
    'communities-discord-invite': {
        name: 'Discord: Server Invite',
        description: 'Attempts to resolve a Discord server invite link.',
        urlTemplate: 'https://discord.gg/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-discordTerm'
    },
    'communities-discord-disboard': {
        name: 'Disboard: Server Search',
        description: 'Searches for Discord servers on Disboard.org.',
        urlTemplate: 'https://disboard.org/search?keyword={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-discordTerm'
    },
    'communities-discord-me': {
        name: 'Discord.me: Server Search',
        description: 'Searches for Discord servers on Discord.me.',
        urlTemplate: 'https://discord.me/servers?search={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-discordTerm'
    },
    'communities-discord-servers': {
        name: 'DiscordServers.com: Server Search',
        description: 'Searches for Discord servers on DiscordServers.com.',
        urlTemplate: 'https://discordservers.com/search/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-discordTerm'
    },
    'communities-discord-bee': {
        name: 'DiscordBee: Server Search',
        description: 'Searches for Discord servers on DiscordBee.com.',
        urlTemplate: 'https://discordbee.com/servers?q={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-discordTerm'
    },
    'communities-discord-google': {
        name: 'Google dork: Discord',
        description: 'Uses a Google dork to search for Discord servers.',
        urlTemplate: 'https://www.google.com/search?q=site:discord.com+{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-discordTerm'
    },
    'communities-tg-profile': {
        name: 'Telegram: Profile/Channel',
        description: 'Opens a Telegram user profile or channel page.',
        urlTemplate: 'https://t.me/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-tgUser'
    },
    'communities-tg-preview': {
        name: 'Telegram: Channel Preview',
        description: 'Previews a Telegram channel\'s content without joining.',
        urlTemplate: 'https://telegram.me/s/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-tgUser'
    },
    'communities-tg-telescope': {
        name: 'Telesco.pe: Channel View',
        description: 'Views a public Telegram channel via Telesco.pe.',
        urlTemplate: 'https://telesco.pe/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-tgUser'
    },
    'communities-tg-telemetrio': {
        name: 'Telemetr.io: Channel Analytics',
        description: 'Views Telegram channel analytics on Telemetr.io.',
        urlTemplate: 'https://telemetr.io/en/channels?channel={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-tgUser'
    },
    'communities-tg-groupsearch': {
        name: 'Telegram: Group Search',
        description: 'Searches for Telegram groups matching a keyword.',
        urlTemplate: 'https://www.telegram-group.com/en?s={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-tgKey'
    },
    'communities-tg-channelsearch': {
        name: 'Telegram: Channel Search',
        description: 'Searches for Telegram channels matching a keyword.',
        urlTemplate: 'https://telegramchannels.me/search?type=all&search={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-communities-tgKey'
    },

    //
    // --- Entries for X (Twitter) Page ---
    //
    'x-account-profile': {
        name: 'X (Twitter): Profile',
        description: 'Views a user profile on X (Twitter).',
        urlTemplate: 'https://x.com/{term}',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-outgoing': {
        name: 'X (Twitter): Outgoing Tweets',
        description: 'Searches for all outgoing tweets from a user.',
        urlTemplate: 'https://x.com/search?q=from%3A{term}&f=live',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-incoming': {
        name: 'X (Twitter): Incoming Tweets',
        description: 'Searches for all tweets directed to a user.',
        urlTemplate: 'https://x.com/search?q=to%3A{term}&f=live',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-only-replies': {
        name: 'X (Twitter): View Replies',
        description: 'Shows only the replies sent by a user.',
        urlTemplate: 'https://x.com/search?q=from%3A{term}%20filter%3Areplies&f=live',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-no-replies': {
        name: 'X (Twitter): Hide Replies',
        description: 'Shows tweets from a user, excluding their replies.',
        urlTemplate: 'https://x.com/search?q=from%3A{term}%20-filter%3Areplies&f=live',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-media': {
        name: 'X (Twitter): User Media',
        description: 'Views all media posted by a user.',
        urlTemplate: 'https://x.com/{term}/media',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-highlights': {
        name: 'X (Twitter): User Highlights',
        description: 'Views a user\'s highlighted tweets.',
        urlTemplate: 'https://x.com/{term}/highlights',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-lists-created': {
        name: 'X (Twitter): Lists Created',
        description: 'Views all lists created by a user.',
        urlTemplate: 'https://x.com/{term}/lists',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-lists-included': {
        name: 'X (Twitter): List Memberships',
        description: 'Views all lists that a user is a member of.',
        urlTemplate: 'https://x.com/{term}/lists/memberships',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-topics': {
        name: 'X (Twitter): User Topics',
        description: 'Views topics followed by a user.',
        urlTemplate: 'https://x.com/{term}/topics',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-links': {
        name: 'X (Twitter): Shared Links',
        description: 'Searches for tweets from a user that contain links.',
        urlTemplate: 'https://x.com/search?q=from%3A{term}%20filter%3Alinks&f=live',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-followers': {
        name: 'X (Twitter): Followers',
        description: 'Views a user\'s followers.',
        urlTemplate: 'https://x.com/{term}/followers',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-account-following': {
        name: 'X (Twitter): Following',
        description: 'Views who a user is following.',
        urlTemplate: 'https://x.com/{term}/following',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-account'
    },
    'x-list-view': {
        name: 'X (Twitter): View List',
        description: 'Views a specific list by its numeric ID.',
        urlTemplate: 'https://x.com/i/lists/{term}',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-x-listId'
    },
    'x-list-members': {
        name: 'X (Twitter): List Members',
        description: 'Views the members of a specific list by its numeric ID.',
        urlTemplate: 'https://x.com/i/lists/{term}/members',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-x-listId'
    },
    'x-list-followers': {
        name: 'X (Twitter): List Followers',
        description: 'Views the followers of a specific list by its numeric ID.',
        urlTemplate: 'https://x.com/i/lists/{term}/followers',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-x-listId'
    },
    'x-other-profilename': {
        name: 'X (Twitter): Real Name Search',
        description: 'Searches for user profiles on X using a real name.',
        urlTemplate: 'https://x.com/search?q={term}&f=user',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-realName'
    },
    'x-year-outgoing': {
        name: 'X (Twitter): Outgoing by Year',
        description: 'Searches for outgoing tweets from a user within a specific year.',
        urlTemplate: 'https://x.com/search?q=from%3A{term}%20since%3A{year}-01-01%20until%3A{year}-12-31&f=live',
        validator: 'getAndValidateYearSearch'
    },
    'x-year-incoming': {
        name: 'X (Twitter): Incoming by Year',
        description: 'Searches for incoming tweets to a user within a specific year.',
        urlTemplate: 'https://x.com/search?q=to%3A{term}%20since%3A{year}-01-01%20until%3A{year}-12-31&f=live',
        validator: 'getAndValidateYearSearch'
    },
    'x-year-media': {
        name: 'X (Twitter): Media by Year',
        description: 'Searches for media tweets from a user within a specific year.',
        urlTemplate: 'https://x.com/search?q=from%3A{term}%20since%3A{year}-01-01%20until%3A{year}-12-31%20filter%3Amedia&f=live',
        validator: 'getAndValidateYearSearch'
    },
    'x-year-term': {
        name: 'X (Twitter): Term by Year',
        description: 'Searches for a keyword within a specific year.',
        urlTemplate: 'https://x.com/search?q={term}%20since%3A{year}-01-01%20until%3A{year}-12-31&f=live',
        validator: 'getAndValidateYearSearch'
    },
    'x-year-no-replies': {
        name: 'X (Twitter): No Replies by Year',
        description: 'Searches user tweets, excluding replies, within a specific year.',
        urlTemplate: 'https://x.com/search?q=from%3A{term}%20since%3A{year}-01-01%20until%3A{year}-12-31%20-filter%3Areplies&f=live',
        validator: 'getAndValidateYearSearch'
    },
    'x-year-only-replies': {
        name: 'X (Twitter): Only Replies by Year',
        description: 'Searches only user replies within a specific year.',
        urlTemplate: 'https://x.com/search?q=from%3A{term}%20since%3A{year}-01-01%20until%3A{year}-12-31%20filter%3Areplies&f=live',
        validator: 'getAndValidateYearSearch'
    },
    'x-archive-google-site': {
        name: 'Google dork: X User Archive',
        description: 'Uses Google to search for archives of a user profile.',
        urlTemplate: 'https://www.google.com/search?q=site:x.com/{term}',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-archiveUser'
    },
    'x-archive-google-tweets': {
        name: 'Google dork: X User Tweets',
        description: 'Uses Google to search for archives of a user\'s statuses.',
        urlTemplate: 'https://www.google.com/search?q=site:x.com/{term}/status/',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-archiveUser'
    },
    'x-archive-bing': {
        name: 'Bing: X User Archive',
        description: 'Uses Bing to search for archives of a user profile.',
        urlTemplate: 'https://www.bing.com/search?q=x.com/{term}',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-archiveUser'
    },
    'x-archive-yandex': {
        name: 'Yandex: X User Archive',
        description: 'Uses Yandex to search for archives of a user profile.',
        urlTemplate: 'https://www.yandex.com/search/?text=https%3A%2F%2Fx.com%2F{term}',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-archiveUser'
    },
    'x-archive-wayback': {
        name: 'Wayback Machine: X User Archive',
        description: 'Searches the Wayback Machine for snapshots of a user profile.',
        urlTemplate: 'https://web.archive.org/web/*/x.com/{term}',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-archiveUser'
    },
    'x-archive-memorylol': {
        name: 'Memory.lol: User Archive',
        description: 'Retrieves user information from the Memory.lol API by username.',
        urlTemplate: 'https://api.memory.lol/v1/tw/{term}',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-archiveUser'
    },
    'x-archive-audit': {
        name: 'TwitterAudit',
        description: 'Checks the authenticity of a user\'s followers via TwitterAudit.',
        urlTemplate: 'https://www.twitteraudit.com/{term}',
        validator: 'getAndValidateUsername',
        targetInput: 'input-x-archiveUser'
    },
    'x-archive-memorylol-id': {
        name: 'Memory.lol: User ID Archive',
        description: 'Retrieves user information from the Memory.lol API by numeric ID.',
        urlTemplate: 'https://api.memory.lol/v1/tw/id/{term}',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-x-memoryId'
    },

    //
    // --- Entries for Currencies Page ---
    //
    'currencies-btc-blockchair': {
        name: 'Blockchair (BTC)',
        description: 'Searches a Bitcoin address on Blockchair.',
        urlTemplate: 'https://blockchair.com/bitcoin/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-whoswho': {
        name: 'BitcoinWhosWho',
        description: 'Checks a Bitcoin address against the BitcoinWhosWho database.',
        urlTemplate: 'https://bitcoinwhoswho.com/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-blockchaincom': {
        name: 'Blockchain.com (BTC)',
        description: 'Searches a Bitcoin address on Blockchain.com.',
        urlTemplate: 'https://www.blockchain.com/btc/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-validation': {
        name: 'BTC Address Validation',
        description: 'Validates a Bitcoin address format via BlockExplorer API.',
        urlTemplate: 'https://blockexplorer.com/api/addr/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-chainabuse': {
        name: 'Chainabuse Report',
        description: 'Checks a Bitcoin address for reports on Chainabuse.',
        urlTemplate: 'https://www.chainabuse.com/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-cloverpool': {
        name: 'Cloverpool Summary',
        description: 'Views a summary for a Bitcoin address on Cloverpool.',
        urlTemplate: 'https://explorer.cloverpool.com/btc/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-firstseen': {
        name: 'BTC First Seen',
        description: 'Retrieves the creation date of a Bitcoin address.',
        urlTemplate: 'https://blockchain.info/q/addressfirstseen/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-oxtme': {
        name: 'OXT.me Explorer',
        description: 'Searches a Bitcoin address on the OXT.me explorer.',
        urlTemplate: 'https://oxt.me/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-balance': {
        name: 'BTC Balance (Satoshi)',
        description: 'Retrieves the current balance of a Bitcoin address in Satoshi.',
        urlTemplate: 'https://blockchain.info/q/addressbalance/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-received': {
        name: 'BTC Received (Satoshi)',
        description: 'Retrieves the total amount received by a Bitcoin address in Satoshi.',
        urlTemplate: 'https://blockchain.info/q/getreceivedbyaddress/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-sent': {
        name: 'BTC Sent (Satoshi)',
        description: 'Retrieves the total amount sent from a Bitcoin address in Satoshi.',
        urlTemplate: 'https://blockchain.info/q/getsentbyaddress/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-btc-walletexplorer': {
        name: 'WalletExplorer (Address)',
        description: 'Searches a Bitcoin address on WalletExplorer.',
        urlTemplate: 'https://www.walletexplorer.com/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-btcAddress'
    },
    'currencies-sec-ofac': {
        name: 'OFAC Sanctions Homepage',
        description: 'Opens the OFAC sanctions list search homepage.',
        urlTemplate: 'https://sanctionssearch.ofac.treas.gov/',
        no_input: true
    },
    'currencies-sec-riskiq': {
        name: 'RiskIQ Tracker Search',
        description: 'Searches for an address or term in RiskIQ trackers.',
        urlTemplate: 'https://community.riskiq.com/search/trackers?query={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-securityQuery'
    },
    'currencies-sec-scamsearch': {
        name: 'ScamSearch.io',
        description: 'Checks an address or term against the ScamSearch.io database.',
        urlTemplate: 'https://scamsearch.io/search_report?searchoption=all&search={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-securityQuery'
    },
    'currencies-conv-btc-eur': {
        name: 'Convert BTC to EUR',
        description: 'Converts a Bitcoin amount to Euro.',
        urlTemplate: 'https://api.coinconvert.net/convert/btc/eur?amount={term}',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-currencies-cryptoAmount'
    },
    'currencies-conv-btc-usd': {
        name: 'Convert BTC to USD',
        description: 'Converts a Bitcoin amount to US Dollars.',
        urlTemplate: 'https://api.coinconvert.net/convert/btc/usd?amount={term}',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-currencies-cryptoAmount'
    },
    'currencies-conv-satoshi-usd': {
        name: 'Convert Satoshi to USD',
        description: 'Converts a Satoshi amount to US Dollars.',
        urlTemplate: 'https://api.exchangerate.host/convert?from=SAT&to=USD&amount={term}',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-currencies-cryptoAmount'
    },
    'currencies-conv-eur-btc': {
        name: 'Convert EUR to BTC',
        description: 'Converts a Euro amount to Bitcoin.',
        urlTemplate: 'https://blockchain.info/tobtc?currency=EUR&value={term}',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-currencies-fiatAmount'
    },
    'currencies-conv-usd-btc': {
        name: 'Convert USD to BTC',
        description: 'Converts a US Dollar amount to Bitcoin.',
        urlTemplate: 'https://blockchain.info/tobtc?currency=USD&value={term}',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-currencies-fiatAmount'
    },
    'currencies-conv-usd-satoshi': {
        name: 'Convert USD to Satoshi',
        description: 'Converts a US Dollar amount to Satoshi.',
        urlTemplate: 'https://api.exchangerate.host/convert?from=USD&to=SAT&amount={term}',
        validator: 'getAndValidateNumeric',
        targetInput: 'input-currencies-fiatAmount'
    },
    'currencies-crypto-bch': {
        name: 'Blockchair (BCH)',
        description: 'Searches a Bitcoin Cash address on Blockchair.',
        urlTemplate: 'https://blockchair.com/bitcoin-cash/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-bsv': {
        name: 'Blockchair (BSV)',
        description: 'Searches a Bitcoin SV address on Blockchair.',
        urlTemplate: 'https://blockchair.com/bitcoin-sv/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-dash': {
        name: 'Blockchair (Dash)',
        description: 'Searches a Dash address on Blockchair.',
        urlTemplate: 'https://blockchair.com/dash/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-doge': {
        name: 'Blockchair (Dogecoin)',
        description: 'Searches a Dogecoin address on Blockchair.',
        urlTemplate: 'https://blockchair.com/dogecoin/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-eth': {
        name: 'Blockchair (ETH)',
        description: 'Searches an Ethereum address on Blockchair.',
        urlTemplate: 'https://blockchair.com/ethereum/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-ltc': {
        name: 'Blockchair (LTC)',
        description: 'Searches a Litecoin address on Blockchair.',
        urlTemplate: 'https://blockchair.com/litecoin/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-blockscan': {
        name: 'Blockscan (Multichain)',
        description: 'Searches an address across multiple chains via Blockscan.',
        urlTemplate: 'https://blockscan.com/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-etherscan': {
        name: 'Etherscan (ETH)',
        description: 'Searches an Ethereum address, TxID, or block on Etherscan.',
        urlTemplate: 'https://etherscan.io/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-metasleuth-bsc': {
        name: 'MetaSleuth (BSC)',
        description: 'Investigates a Binance Smart Chain address with MetaSleuth.',
        urlTemplate: 'https://metasleuth.io/result/bsc/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-metasleuth-eth': {
        name: 'MetaSleuth (ETH)',
        description: 'Investigates an Ethereum address with MetaSleuth.',
        urlTemplate: 'https://metasleuth.io/result/eth/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-metasleuth-poly': {
        name: 'MetaSleuth (Polygon)',
        description: 'Investigates a Polygon address with MetaSleuth.',
        urlTemplate: 'https://metasleuth.io/result/polygon/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-polygonscan': {
        name: 'PolygonScan',
        description: 'Searches a Polygon address, TxID, or block on PolygonScan.',
        urlTemplate: 'https://polygonscan.com/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-solanafm': {
        name: 'SolanaFM',
        description: 'Searches a Solana address, TxID, or block on SolanaFM.',
        urlTemplate: 'https://solana.fm/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-walletexplorer': {
        name: 'WalletExplorer (ID)',
        description: 'Searches a wallet ID or address on WalletExplorer.',
        urlTemplate: 'https://www.walletexplorer.com/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-tron-address': {
        name: 'Tronscan: Address',
        description: 'Searches an address on Tronscan.',
        urlTemplate: 'https://tronscan.org/#/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-tron-contract': {
        name: 'Tronscan: Contract',
        description: 'Views a contract on Tronscan.',
        urlTemplate: 'https://tronscan.org/#/contract/{term}/code',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-crypto-tron-tx': {
        name: 'Tronscan: Transaction',
        description: 'Searches a transaction ID on Tronscan.',
        urlTemplate: 'https://tronscan.org/#/transaction/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-otherCryptoAddress'
    },
    'currencies-analysis-arkham-exp': {
        name: 'Arkham Explorer',
        description: 'Explores an address or entity on the Arkham Intelligence platform.',
        urlTemplate: 'https://platform.arkhamintelligence.com/explorer/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-arkham-viz': {
        name: 'Arkham Visualizer',
        description: 'Visualizes an entity\'s connections on the Arkham Intelligence platform.',
        urlTemplate: 'https://platform.arkhamintelligence.com/visualizer/entity/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-blockscan': {
        name: 'Blockscan Token',
        description: 'Looks up a token on Blockscan.',
        urlTemplate: 'https://blockscan.com/Home/SearchAddress?searchAddress={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-breadcrumbs': {
        name: 'Breadcrumbs Report',
        description: 'Generates a report for an address on Breadcrumbs.',
        urlTemplate: 'https://www.breadcrumbs.app/reports/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-crystal-exp': {
        name: 'Crystal Explorer',
        description: 'Explores an address on Crystal Blockchain.',
        urlTemplate: 'https://explorer.crystalblockchain.com/address/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-crystal-viz': {
        name: 'Crystal Visualizer',
        description: 'Visualizes an address or entity on Crystal Blockchain.',
        urlTemplate: 'https://explorer.crystalblockchain.com/visualization/new/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-debank': {
        name: 'Debank Profile',
        description: 'Views a DeFi profile on Debank.',
        urlTemplate: 'https://debank.com/profile/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-google': {
        name: 'Google: Address Search',
        description: 'Performs a quoted Google search for a crypto address.',
        urlTemplate: 'https://www.google.com/search?q=%22{term}%22',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-metasleuth-btc': {
        name: 'MetaSleuth (BTC)',
        description: 'Investigates a Bitcoin address with MetaSleuth.',
        urlTemplate: 'https://metasleuth.io/result/btc/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-oklink-exp': {
        name: 'OKLink Explorer',
        description: 'Performs a multi-chain search on OKLink.',
        urlTemplate: 'https://www.oklink.com/middle/multi-search#key={term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-oklink-viz': {
        name: 'OKLink Visualisation',
        description: 'Visualizes blockchain data using OKLink Tianyan.',
        urlTemplate: 'https://www.oklink.com/en/tianyan/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-phalcon': {
        name: 'Phalcon Explorer (ETH)',
        description: 'Explores an Ethereum transaction with Phalcon.',
        urlTemplate: 'https://phalcon.xyz/tx/eth/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
    'currencies-analysis-zapper': {
        name: 'Zapper Account',
        description: 'Views a DeFi and NFT portfolio on Zapper.',
        urlTemplate: 'https://zapper.fi/account/{term}',
        validator: 'getAndValidateSingleInput',
        targetInput: 'input-currencies-analysisQuery'
    },
	
//
// --- Entries for Domains Page ---
//
// Search Engines
'domains-search-baidu': { name: 'Baidu (Exact)', description: 'Performs an exact phrase search on Baidu.', urlTemplate: 'https://www.baidu.com/s?wd="{term}"', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-search-bing': { name: 'Bing (Exact)', description: 'Performs an exact phrase search on Bing.', urlTemplate: 'https://www.bing.com/search?q="{term}"', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-search-google': { name: 'Google (Exact)', description: 'Performs an exact phrase search on Google.', urlTemplate: 'https://www.google.com/search?q="{term}"', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-search-googlesite': { name: 'Google Site Search', description: 'Performs a Google search scoped to the specified domain.', urlTemplate: 'https://www.google.com/search?q=site%3A{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-search-yandex': { name: 'Yandex (Exact)', description: 'Performs an exact phrase search on Yandex.', urlTemplate: 'https://yandex.com/search/?text="{term}"', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },

// Website Profiling
'domains-profile-adsense-dnslytics': { name: 'AdSense Lookup', description: 'Finds sites sharing the same AdSense ID via DNSlytics.', urlTemplate: 'https://dnslytics.com/reverse-adsense/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-analyzeid': { name: 'AnalyzeID', description: 'Finds sites sharing the same tracking IDs.', urlTemplate: 'http://analyzeid.com/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-builtwith': { name: 'BuiltWith', description: 'Identifies the technology stack of a website.', urlTemplate: 'https://builtwith.com/detailed/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-centralops': { name: 'CentralOps Dossier', description: 'Generates a comprehensive report on a domain.', urlTemplate: 'https://centralops.net/co/DomainDossier.aspx?addr={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-domaincodex': { name: 'DomainCodex', description: 'Gathers information about a domain.', urlTemplate: 'https://www.domaincodex.com/search.php?q={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-domainiq': { name: 'DomainIQ', description: 'Provides a snapshot history and profile of a domain.', urlTemplate: 'https://www.domainiq.com/snapshot_history?data={term}#{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-ga-dnslytics': { name: 'GA Lookup', description: 'Finds sites sharing the same Google Analytics ID via DNSlytics.', urlTemplate: 'https://dnslytics.com/reverse-analytics/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-hostio': { name: 'Host.io', description: 'Provides detailed domain and hosting information.', urlTemplate: 'https://host.io/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-httpheaders': { name: 'HTTP Headers', description: 'Views the live HTTP headers for a domain via ViewDNS.', urlTemplate: 'http://viewdns.info/httpheaders/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-informeremails': { name: 'Informer Emails', description: 'Finds email addresses associated with a domain via website.informer.com.', urlTemplate: 'https://website.informer.com/{term}/emails', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-ismysitedown': { name: 'Is My Site Down', description: 'Checks if a website is currently online via ViewDNS.', urlTemplate: 'http://viewdns.info/ismysitedown/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-netcraft-report': { name: 'Netcraft Site Report', description: 'Generates a detailed security and technology report from Netcraft.', urlTemplate: 'https://sitereport.netcraft.com/?url=http://{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-nerdydata': { name: 'NerdyData', description: 'Searches website source code for the given term.', urlTemplate: 'https://www.nerdydata.com/reports/new?search=%7B%22all%22%3A%5B%7B%22type%22%3A%22code%22,%22value%22%3A%22{term}%22%7D%5D,%22any%22%3A%5B%5D,%22none%22%3A%5B%5D%7D', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-profile-publicwww': { name: 'PublicWWW', description: 'Searches for the term in public website source code.', urlTemplate: 'https://publicwww.com/websites/{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-profile-robotstxt': { name: 'Robots.txt', description: 'Retrieves the robots.txt file from a domain.', urlTemplate: 'http://{term}/robots.txt', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-spyonweb': { name: 'SpyOnWeb', description: 'Finds associated domains and tracking codes.', urlTemplate: 'http://spyonweb.com/{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-profile-wmtips': { name: 'WMTips', description: 'Provides website information and tools.', urlTemplate: 'https://www.wmtips.com/tools/info/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-profile-webscout': { name: 'Webscout', description: 'Looks up information on a domain.', urlTemplate: 'https://webscout.io/lookup/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },

// Screenshots
'domains-screenshot-dmnsapp': { name: 'DMNs.app Screenshot', description: 'Retrieves a screenshot of a domain.', urlTemplate: 'https://files.dmns.app/screenshots/{term}.jpg', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-screenshot-domainiq': { name: 'DomainIQ Screenshot', description: 'Views the screenshot history for a domain on DomainIQ.', urlTemplate: 'https://www.domainiq.com/snapshot_history#{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-screenshot-domaintools': { name: 'DomainTools Screenshot', description: 'Views the screenshot history for a domain on DomainTools.', urlTemplate: 'https://research.domaintools.com/research/screenshot-history/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-screenshot-easycounter': { name: 'EasyCounter Screenshot', description: 'Views statistics and a screenshot of a domain.', urlTemplate: 'https://www.easycounter.com/report/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-screenshot-hypestat': { name: 'HypeStat Screenshot', description: 'Views statistics and a screenshot of a domain.', urlTemplate: 'https://hypestat.com/info/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-screenshot-informer': { name: 'Informer Screenshot', description: 'Views statistics and a screenshot of a domain.', urlTemplate: 'https://website.informer.com/{term}#tab_stats', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-screenshot-urlscan': { name: 'URLScan Domain Scan', description: 'Views scan results and a screenshot for a domain.', urlTemplate: 'https://urlscan.io/domain/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },

// Archives
'domains-archive-archiveit': { name: 'Archive-it Search', description: 'Searches for the term in Archive-it.org collections.', urlTemplate: 'https://archive-it.org/collections/11718?q={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-archive-archivemd': { name: 'Archive.md', description: 'Retrieves a snapshot of a URL from Archive.md.', urlTemplate: 'http://archive.md/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-archiveorg': { name: 'Archive.org', description: 'Views snapshots for a URL on Archive.org.', urlTemplate: 'http://web.archive.org/web/*/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-archiveph': { name: 'archive.ph Homepage', description: 'Opens the archive.ph homepage (manual search).', urlTemplate: 'https://archive.ph/', no_input: true },
'domains-archive-archivescan': { name: 'Archive Scan (CDX)', description: 'Searches the Common Crawl index for a domain.', urlTemplate: 'https://web.archive.org/cdx/search/cdx?url={term}/*&output=text&fl=original&collapse=urlkey', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-wildcard': { name: 'Archive.org Wildcard', description: 'Searches for all archived URLs under a domain.', urlTemplate: 'http://web.archive.org/web/*/{term}/*', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-arquivopt': { name: 'Arquivo.pt', description: 'Searches the Portuguese web archive.', urlTemplate: 'https://arquivo.pt/url/search?hitsPerPage=100&q={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-carbondating': { name: 'CarbonDating', description: 'Finds the creation date of a web page.', urlTemplate: 'http://carbondate.cs.odu.edu/#{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-congress': { name: 'Library of Congress Archives', description: 'Searches the US Library of Congress web archives.', urlTemplate: 'https://webarchive.loc.gov/all/*/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-dthistory': { name: 'DomainTools Screenshot History', description: 'Views historical screenshots of a domain.', urlTemplate: 'https://research.domaintools.com/research/screenshot-history/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-elephind': { name: 'Elephind Newspaper Archives', description: 'Searches historical newspaper archives.', urlTemplate: 'https://elephind.com/?a=q&hs=1&r=1&results=1&txq={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-archive-googlecache': { name: 'Google Cache', description: 'Attempts to retrieve the cached version of a page from Google.', urlTemplate: 'http://webcache.googleusercontent.com/search?q=cache:{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-mementoweb': { name: 'Mementoweb', description: 'Finds archived versions of a page across multiple archives.', urlTemplate: 'http://timetravel.mementoweb.org/list/19991212110000/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-wayback-keyword': { name: 'Wayback Machine Keyword', description: 'Performs a keyword search on Archive.org.', urlTemplate: 'https://archive.org/search.php?query={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-archive-whoishistory': { name: 'Who.Is History', description: 'Views the domain history on Who.is.', urlTemplate: 'http://who.is/domain-history/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-whois-whois': { name: 'Whois Archive (who.is)', description: 'Searches for Whois records on Who.is via Wayback Machine.', urlTemplate: 'https://web.archive.org/web/http://www.who.is/whois/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-whois-dt': { name: 'Whois Archive (DomainTools)', description: 'Searches for Whois records on DomainTools via Wayback Machine.', urlTemplate: 'https://web.archive.org/web/https://whois.domaintools.com/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-archive-whois-whoxy': { name: 'Whois Archive (Whoxy)', description: 'Searches for Whois records on Whoxy via Wayback Machine.', urlTemplate: 'https://web.archive.org/web/https://www.whoxy.com/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },

// SEO, Traffic & Links
'domains-seo-linkody': { name: 'Linkody Backlinks', description: 'Checks for backlinks to a domain.', urlTemplate: 'http://bc.linkody.com/en/seo-tools/free-backlink-checker/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-copyscape': { name: 'CopyScape', description: 'Checks for plagiarism and duplicate content.', urlTemplate: 'https://www.copyscape.com/?q=http%3A%2F%2F{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-hostio-backlinks': { name: 'Host.io Backlinks', description: 'Finds backlinks to a domain.', urlTemplate: 'https://host.io/backlinks/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-hostio-redirects': { name: 'Host.io Redirects', description: 'Traces redirects for a domain.', urlTemplate: 'https://host.io/redirects/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-moz': { name: 'Moz Domain Analysis', description: 'Analyzes domain authority and other SEO metrics.', urlTemplate: 'https://moz.com/domain-analysis?site={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-reddit-mentions': { name: 'Reddit Domain Mentions', description: 'Searches for mentions of a domain on Reddit.', urlTemplate: 'https://www.reddit.com/search?q=site:{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-reddit-url': { name: 'Reddit URL Search', description: 'Searches for submissions of a specific URL on Reddit.', urlTemplate: 'https://old.reddit.com/search?q=url:{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-sharedcount': { name: 'SharedCount', description: 'Checks social media share counts for a URL.', urlTemplate: 'https://api.sharedcount.com/v1.0/?url=https%3A%2F%2F{term}&apikey=1934f519a63e142e0d3c893e59cc37fe0172e98a', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-similarweb': { name: 'SimilarWeb', description: 'Provides traffic and ranking information for a website.', urlTemplate: 'http://www.similarweb.com/website/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-sitemapper': { name: 'Visual Site Mapper', description: 'Generates a visual sitemap for a domain.', urlTemplate: 'http://www.visualsitemapper.com/map/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-seo-spyfu': { name: 'SpyFu', description: 'Provides SEO and keyword research data.', urlTemplate: 'https://www.spyfu.com/overview/domain?query={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },

// Security & Reputation
'domains-sec-alienvault': { name: 'AlienVault OTX', description: 'Checks a domain against the AlienVault Open Threat Exchange.', urlTemplate: 'https://otx.alienvault.com/indicator/domain/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-blacklight': { name: 'Blacklight Privacy Inspector', description: 'Inspects a website for user-tracking technologies.', urlTemplate: 'https://themarkup.org/blacklight?url={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-chinatest': { name: 'Chinese Firewall Test', description: 'Checks if a domain is accessible from behind the Great Firewall of China.', urlTemplate: 'http://viewdns.info/chinesefirewall/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-dehashed': { name: 'Dehashed', description: 'Searches for a domain in leaked databases.', urlTemplate: 'https://dehashed.com/search?query=%22{term}%22', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-hudsonrock': { name: 'HudsonRock', description: 'Searches for a domain in cybercrime intelligence data.', urlTemplate: 'https://www.hudsonrock.com/search?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-hybridanalysis': { name: 'Hybrid Analysis', description: 'Searches a domain, IP, or hash in the Hybrid Analysis malware database.', urlTemplate: 'https://hybrid-analysis.com/search?query={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-sec-ibmxforce': { name: 'IBM X-Force Exchange', description: 'Looks up a URL or domain in the IBM X-Force threat intelligence platform.', urlTemplate: 'https://exchange.xforce.ibmcloud.com/url/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-intelx': { name: 'IntelligenceX', description: 'Searches for a domain in the IntelligenceX archive.', urlTemplate: 'https://intelx.io/?s={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-irantest': { name: 'Iran Firewall Test', description: 'Checks if a domain is accessible from Iran.', urlTemplate: 'http://viewdns.info/iranfirewall/?siteurl={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-joesandbox': { name: 'Joe Sandbox', description: 'Searches for a term in the Joe Sandbox malware analysis reports.', urlTemplate: 'https://www.joesandbox.com/search?q={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-sec-leakix': { name: 'LeakIX Domain', description: 'Searches for leaks related to a domain on LeakIX.', urlTemplate: 'https://leakix.net/domain/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-leakix-search': { name: 'LeakIX Search', description: 'Performs a leak-scoped search on LeakIX.', urlTemplate: 'https://leakix.net/search?scope=leak&q={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-maltiverse': { name: 'Maltiverse', description: 'Searches for a domain in the Maltiverse threat intelligence platform.', urlTemplate: 'https://maltiverse.com/search;query={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-mywot': { name: 'MyWOT', description: 'Checks the reputation of a website on MyWOT.', urlTemplate: 'https://www.mywot.com/en/scorecard/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-phishcheck': { name: 'PhishCheck.me', description: 'Checks a URL against the PhishCheck database.', urlTemplate: 'https://phishcheck.me/search/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-pulsedive': { name: 'Pulsedive', description: 'Searches for an Indicator of Compromise (IOC) on Pulsedive.', urlTemplate: 'https://pulsedive.com/explore/?q=ioc%3D{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-sec-riskiq': { name: 'RiskIQ Search', description: 'Performs a search on the RiskIQ Community Edition.', urlTemplate: 'https://community.riskiq.com/search/{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-sec-securityheaders': { name: 'Security Headers Scan', description: 'Scans the security headers of a website.', urlTemplate: 'https://securityheaders.com/?q={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-securitytrails': { name: 'SecurityTrails', description: 'Looks up domain and DNS data on SecurityTrails.', urlTemplate: 'https://securitytrails.com/list/apex_domain/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-securitytrails-overview': { name: 'SecurityTrails Overview', description: 'Provides a domain overview from SecurityTrails.', urlTemplate: 'https://securitytrails.com/domain/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-skymem': { name: 'Skymem', description: 'Searches for a domain in the Skymem data breach archive.', urlTemplate: 'https://www.skymem.info/srch?q={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-spamorg': { name: 'Spam.org', description: 'Checks a domain against the Spam.org reputation database.', urlTemplate: 'https://www.spam.org/search?type=domain&convert_block=1&group_ips=1&data={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-spamhaus': { name: 'Spamhaus Check', description: 'Checks a domain or IP against Spamhaus blocklists.', urlTemplate: 'https://check.spamhaus.org/not_listed/?searchterm={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-stopforumspam': { name: 'Stop Forum Spam', description: 'Checks a domain, email, or username against the Stop Forum Spam database.', urlTemplate: 'https://www.stopforumspam.com/search/{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-sec-threatcrowd': { name: 'ThreatCrowd', description: 'Searches for a domain in the ThreatCrowd threat intelligence graph.', urlTemplate: 'https://ci-www.threatcrowd.org/domain.php?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-threatintel': { name: 'ThreatIntel Platform', description: 'Gets a reputation report for a domain.', urlTemplate: 'https://threatintelligenceplatform.com/report/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-triage-smtp': { name: 'Triage SMTP Search', description: 'Searches Triage for SMTP servers related to a domain.', urlTemplate: 'https://tria.ge/s?q=smtp.{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-triage-url': { name: 'Triage URL Search', description: 'Searches Triage for a specific URL.', urlTemplate: 'https://tria.ge/s?q=url:{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-urlscan-page': { name: 'URLScan Page Search', description: 'Searches for scans of a specific domain on urlscan.io.', urlTemplate: 'https://urlscan.io/search/#page.domain%3A{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-sec-urlscan-general': { name: 'urlscan.io General Search', description: 'Performs a general search on urlscan.io.', urlTemplate: 'https://urlscan.io/search/#{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-sec-virustotal': { name: 'VirusTotal Domain Report', description: 'Retrieves a reputation report for a domain from VirusTotal.', urlTemplate: 'https://www.virustotal.com/gui/domain/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },

// Whois & DNS Lookup
'domains-dns-abusecontact': { name: 'Abuse Contact Lookup', description: 'Finds the abuse contact for a domain via ViewDNS.', urlTemplate: 'http://viewdns.info/abuselookup/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-censys': { name: 'Censys DNS Names', description: 'Searches for DNS names associated with a domain on Censys.', urlTemplate: 'https://search.censys.io/search?resource=hosts&q=dns.names%3A{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-crtsh': { name: 'crt.sh', description: 'Searches for SSL/TLS certificates for a domain.', urlTemplate: 'https://crt.sh/?q={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-records': { name: 'DNS Records', description: 'Retrieves DNS records for a domain via ViewDNS.', urlTemplate: 'http://viewdns.info/dnsrecord/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-report': { name: 'DNS Report', description: 'Generates a DNS report for a domain via ViewDNS.', urlTemplate: 'http://viewdns.info/dnsreport/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-dnssec': { name: 'DNSSEC Test', description: 'Tests the DNSSEC configuration of a domain via ViewDNS.', urlTemplate: 'http://viewdns.info/dnssec/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-dnsdump': { name: 'DNSDumpster', description: 'Finds DNS and subdomain information for a domain.', urlTemplate: 'https://dnsdumpster.com/', no_input: true },
'domains-dns-dnslytics': { name: 'DNSlytics', description: 'Provides DNS and network information for a domain.', urlTemplate: 'https://dnslytics.com/domain/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-domainapp': { name: 'DomainApp DNS', description: 'Looks up DNS records for a domain.', urlTemplate: 'https://dmns.app/domains?q={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-domaintools': { name: 'DomainTools WHOIS', description: 'Performs a Whois lookup on DomainTools.', urlTemplate: 'https://whois.domaintools.com/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-eurid': { name: 'EURid WHOIS', description: 'Performs a Whois lookup for .eu domains.', urlTemplate: 'https://whois.eurid.eu/en/search/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-etherscan-ens': { name: 'Etherscan ENS Lookup', description: 'Looks up an Ethereum Name Service (ENS) domain.', urlTemplate: 'https://etherscan.io/name-lookup-search?id={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-godaddy': { name: 'GoDaddy WHOIS', description: 'Performs a Whois lookup on GoDaddy.', urlTemplate: 'https://ie.godaddy.com/whois/results.aspx?checkAvail=1&domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-netcraft-subdomain': { name: 'Netcraft Subdomains', description: 'Finds subdomains using Netcraft.', urlTemplate: 'https://searchdns.netcraft.com/?restriction=site+contains&host={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-resolvers': { name: 'Resolve.rs DNS', description: 'Looks up DNS records via Resolve.rs.', urlTemplate: 'https://resolve.rs/dns/lookup.html?hostname={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-reversedns': { name: 'Reverse DNS', description: 'Performs a reverse DNS lookup via ViewDNS.', urlTemplate: 'http://viewdns.info/reversedns/?ip={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-robtex': { name: 'Robtex', description: 'Provides a graphical analysis of DNS relationships.', urlTemplate: 'https://www.robtex.com/dns-lookup/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-subdomains-columbus': { name: 'Columbus Subdomains', description: 'Finds subdomains using the Columbus Project.', urlTemplate: 'https://columbus.elmasy.com/lookup/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-whois': { name: 'Who.Is', description: 'Performs a Whois lookup on Who.is.', urlTemplate: 'http://who.is/whois/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-whois-dns': { name: 'Who.Is DNS', description: 'Looks up DNS records for a domain on Who.is.', urlTemplate: 'http://who.is/dns/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-whoiscom': { name: 'Whois.com', description: 'Performs a Whois lookup on Whois.com.', urlTemplate: 'https://www.whois.com/whois/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-whois-viewdns': { name: 'ViewDNS WHOIS', description: 'Performs a Whois lookup via ViewDNS.', urlTemplate: 'http://viewdns.info/whois/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-whoisology': { name: 'Whoisology', description: 'Finds historical Whois records and connections.', urlTemplate: 'https://whoisology.com/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-dns-whoxy': { name: 'Whoxy', description: 'Provides Whois lookup and domain intelligence.', urlTemplate: 'https://www.whoxy.com/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },

// IP & Network Info
'domains-ip-censys': { name: 'Censys IP Search', description: 'Searches for hosts on Censys matching a domain.', urlTemplate: 'https://search.censys.io/search?resource=hosts&sort=RELEVANCE&per_page=100&virtual_hosts=INCLUDE&q={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-ip-networksdb': { name: 'NetworksDB IPs', description: 'Finds IPs associated with a domain.', urlTemplate: 'https://networksdb.io/search/domain-to-ips?q={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-ip-history': { name: 'IP History', description: 'Shows the IP address history for a domain via ViewDNS.', urlTemplate: 'http://viewdns.info/iphistory/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-ip-portscan': { name: 'Port Scan', description: 'Performs a port scan on a host via ViewDNS.', urlTemplate: 'http://viewdns.info/portscan/?host={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-ip-reverseip': { name: 'Reverse IP Lookup', description: 'Finds domains hosted on the same IP address via ViewDNS.', urlTemplate: 'http://viewdns.info/reverseip/?host={term}&t=1', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-ip-shodan-domain': { name: 'Shodan Domain Search', description: 'Searches Shodan for information related to a domain.', urlTemplate: 'https://www.shodan.io/domain/{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-ip-shodan-hostname': { name: 'Shodan Hostname Search', description: 'Searches Shodan for a specific hostname.', urlTemplate: 'https://www.shodan.io/search?query=hostname%3A{term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-ip-shodan-query': { name: 'Shodan General Query', description: 'Performs a general query on Shodan.', urlTemplate: 'https://www.shodan.io/search?query={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-ip-traceroute': { name: 'Traceroute', description: 'Performs a traceroute to a host via ViewDNS.', urlTemplate: 'http://viewdns.info/traceroute/?domain={term}', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },

// Public Records
'domains-records-asa': { name: 'ASA Search (UK)', description: 'Searches the UK Advertising Standards Authority.', urlTemplate: 'https://www.asa.org.uk/search.html?q={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-records-dnpedia': { name: 'DNPedia', description: 'Opens the DNPedia domain search page.', urlTemplate: 'https://dnpedia.com/domains/search.php', no_input: true },
'domains-records-fca': { name: 'FCA Warnings (UK)', description: 'Searches FCA warnings for a domain or company.', urlTemplate: 'https://www.google.com/search?q=site%3Ahttps%3A%2F%2Ffca.org.uk+AND+%22{term}%22', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-records-googlegroups': { name: 'Google Groups', description: 'Searches Google Groups for a term.', urlTemplate: 'https://groups.google.com/search?q={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-records-occrp': { name: 'OCCRP Aleph', description: 'Searches the OCCRP Aleph database.', urlTemplate: 'https://aleph.occrp.org/search?q={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-records-ofac': { name: 'OFAC Sanctions', description: 'Searches OFAC sanctions data for a term.', urlTemplate: 'https://ofac.treasury.gov/recent-actions?search_api_fulltext={term}&ra-start-date=&ra-end-date=&ra_year=', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-records-sra': { name: 'SRA Search (UK Solicitors)', description: 'Searches the Solicitors Regulation Authority database.', urlTemplate: 'https://www.sra.org.uk/search-results/?searchText={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },
'domains-records-udrp': { name: 'UDRP Search', description: 'Searches UDRP cases for a domain.', urlTemplate: 'https://www.udrpsearch.com/search?query={term}&search=domain', validator: 'getAndValidateDomain', targetInput: 'input-domains-main' },
'domains-records-wipo': { name: 'WIPO Search (Google)', description: 'Uses Google to search the WIPO database.', urlTemplate: 'https://www.google.com/search?q=site%3Ahttps://www.wipo.int/ AND %22{term}%22', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-main' },

// URL Shorteners
'domains-shorturl-bitly': { name: 'Expand Bit.ly', description: 'Expands a Bit.ly short URL by adding a + to the end.', urlTemplate: 'https://{term}+', validator: 'getAndValidateUrl', targetInput: 'input-domains-shortUrl' },
'domains-shorturl-any': { name: 'Expand Any URL', description: 'Uses checkshorturl.com to expand any short URL.', urlTemplate: 'http://checkshorturl.com/expand.php?u={term}', validator: 'getAndValidateUrl', targetInput: 'input-domains-shortUrl' },
'domains-shorturl-tinycc': { name: 'Expand Tiny.cc', description: 'Expands a Tiny.cc short URL by adding a ~ to the end.', urlTemplate: 'https://{term}~', validator: 'getAndValidateUrl', targetInput: 'input-domains-shortUrl' },

// AdSense ID
'domains-adsense-analyzeid': { name: 'AnalyzeID (AdSense)', description: 'Finds sites sharing the same AdSense ID.', urlTemplate: 'https://analyzeid.com/id/{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-adsenseId' },
'domains-adsense-dnslytics': { name: 'DNSlytics (AdSense)', description: 'Finds sites sharing the same AdSense ID.', urlTemplate: 'https://dnslytics.com/reverse-adsense/{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-adsenseId' },
'domains-adsense-hackertarget': { name: 'HackerTarget (AdSense)', description: 'Finds sites sharing the same AdSense ID.', urlTemplate: 'https://hackertarget.com/reverse-analytics-search/?q={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-adsenseId' },
'domains-adsense-riskiq': { name: 'RiskIQ (AdSense)', description: 'Searches for an AdSense ID in RiskIQ trackers.', urlTemplate: 'https://community.riskiq.com/search/trackers?query={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-adsenseId' },

// Analytics ID
'domains-analytics-analyzeid': { name: 'AnalyzeID (Analytics)', description: 'Finds sites sharing the same Analytics ID.', urlTemplate: 'https://analyzeid.com/id/{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-analyticsId' },
'domains-analytics-dnslytics': { name: 'DNSlytics (Analytics)', description: 'Finds sites sharing the same Analytics ID.', urlTemplate: 'https://dnslytics.com/reverse-analytics/{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-analyticsId' },
'domains-analytics-hackertarget': { name: 'HackerTarget (Analytics)', description: 'Finds sites sharing the same Analytics ID.', urlTemplate: 'https://hackertarget.com/reverse-analytics-search/?q={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-analyticsId' },
'domains-analytics-publicwww': { name: 'PublicWWW (Analytics)', description: 'Finds sites using the same Analytics ID.', urlTemplate: 'https://publicwww.com/websites/%22{term}%22/', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-analyticsId' },
'domains-analytics-riskiq': { name: 'RiskIQ (Analytics)', description: 'Searches for an Analytics ID in RiskIQ trackers.', urlTemplate: 'https://community.riskiq.com/search/trackers?query={term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-analyticsId' },

// Favicon
'domains-favicon-hash': { name: 'Calculate Favicon Hash', description: 'Calculates the MurmurHash3 of a favicon URL.', urlTemplate: 'https://faviconhash.com/{term}', validator: 'getAndValidateUrl', targetInput: 'input-domains-faviconUrl' },
'domains-favicon-shodan': { name: 'Shodan (Favicon Hash)', description: 'Searches Shodan for websites with a matching favicon hash.', urlTemplate: 'https://www.shodan.io/search?query=http.favicon.hash%3A{term}', validator: 'getAndValidateNumeric', targetInput: 'input-domains-faviconHash' },

// CSP
'domains-csp-censys': { name: 'Censys (CSP Search)', description: 'Searches Censys for websites with a matching Content-Security-Policy.', urlTemplate: 'https://search.censys.io/search?resource=hosts&q=services.http.response.headers.content_security_policy%3A{term}', validator: 'getAndValidateSingleInput', targetInput: 'input-domains-csp' },
	
};