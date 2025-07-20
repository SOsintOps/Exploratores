const ExploratoresValidators = {
    getAndValidateSearchTerm: function(config) {
        const inputElement = document.getElementById('searchInput');
        const value = inputElement ? inputElement.value.trim() : "";
        if (!value) {
            return { isValid: false, message: "Please enter a search term." };
        }
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateNames: function(config) {
        const firstName = document.getElementById('firstName')?.value.trim();
        const lastName = document.getElementById('lastName')?.value.trim();
        if (!firstName && !lastName) {
            return { isValid: false, message: "Please enter at least a first or last name." };
        }
        const fullName = `${firstName} ${lastName}`.trim();
        const fullNameDash = [firstName, lastName].filter(Boolean).join('-');
        return {
            isValid: true,
            data: {
                firstname: firstName,
                lastname: lastName,
                fullname: fullName,
                fullnamedash: fullNameDash,
                fullnamedashlower: fullNameDash.toLowerCase()
            },
            message: "Ready for search."
        };
    },
    
    getAndValidateUsPhone: function(config) {
        const area = document.getElementById('areaCode')?.value.trim();
        const prefix = document.getElementById('prefixCode')?.value.trim();
        const line = document.getElementById('lineNumber')?.value.trim();
        if (!area || !prefix || !line || area.length !== 3 || prefix.length !== 3 || line.length !== 4) {
            return { isValid: false, message: "Please enter a complete 10-digit phone number." };
        }
        const queryVariations = [`"${area}${prefix}${line}"`, `"${area}-${prefix}-${line}"`, `"(${area}) ${prefix}-${line}"`, `"${area}.${prefix}.${line}"`, `"${area} ${prefix} ${line}"`];
        return {
            isValid: true,
            data: {
                area: area, prefix: prefix, line: line,
                full: `${area}${prefix}${line}`,
                full_dash: `${area}-${prefix}-${line}`,
                e164: `1${area}${prefix}${line}`,
                google_query: queryVariations.join(" OR ")
            },
            message: "Ready for search."
        };
    },

    getAndValidateIntlPhone: function(config) {
        const countryCode = document.getElementById('countryCodeInput')?.value.trim();
        const nationalNum = document.getElementById('nationalNumberInput')?.value.trim();
        const countryIso = document.getElementById('countryLettersInput')?.value.trim().toUpperCase();
        
        const rules = config.validation_rules || {};
        if (rules.requireCountryCode && !countryCode) return { isValid: false, message: "Country code is required." };
        if (rules.requireNatNum && !nationalNum) return { isValid: false, message: "National number is required." };
        if (rules.requireCountryLetters && !countryIso) return { isValid: false, message: "Country ISO is required." };
        if (!countryCode && !nationalNum) return { isValid: false, message: "Enter a phone number." };

        const e164 = countryCode.replace('+', '') + nationalNum;
        const queryVariations = [`"${countryCode}${nationalNum}"`, `"${countryCode} ${nationalNum}"`];
        return {
            isValid: true,
            data: {
                e164: e164,
                countrycode: countryCode.replace('+', ''),
                nat_num: nationalNum,
                country_iso: countryIso,
                google_query: queryVariations.join(" OR "),
                dt_plus_cc_num: `${countryCode}.${nationalNum}`,
                dt_plus_cc_0num: `${countryCode}.0${nationalNum}`,
                dt_num_only: nationalNum,
                dt_0num_only: `0${nationalNum}`,
                dt_enum_generic: `e${nationalNum}`,
                dt_num_generic: nationalNum
            },
            message: "Ready for search."
        };
    },

    getAndValidateOfficerName: function(config) {
        const officerName = document.getElementById('officerNameInput')?.value.trim();
        if (!officerName) {
            return { isValid: false, message: "Please enter an officer name." };
        }
        return { isValid: true, data: { officername: officerName }, message: "Ready for search." };
    },

    getAndValidateUsOfficerName: function(config) {
        const firstName = document.getElementById('officerSearchFirstName')?.value.trim();
        const lastName = document.getElementById('officerSearchLastName')?.value.trim();
        if (!firstName || !lastName) {
            return { isValid: false, message: "Please enter both first and last name." };
        }
        return { isValid: true, data: { firstname: firstName, lastname: lastName }, message: "Ready for search." };
    },

    getAndValidateCompanyName: function(config) {
        const companyName = document.getElementById('companyNameInput')?.value.trim();
        if (!companyName) {
            return { isValid: false, message: "Please enter a company name." };
        }
        return { isValid: true, data: { companyname: companyName }, message: "Ready for search." };
    },

    getAndValidateCompanyEmail: function(config) {
        const email = document.getElementById('companyEmailInput')?.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return { isValid: false, message: "Please enter an email address." };
        }
        if (!emailRegex.test(email)) {
            return { isValid: false, message: "Invalid email format." };
        }
        return { isValid: true, data: { email: email }, message: "Ready for search." };
    },

    getAndValidateCompanyPhone: function(config) {
        const phone = document.getElementById('companyPhoneInput')?.value.trim();
        const phoneRegex = /^[0-9\s-()+]+$/;
        if (!phone) {
            return { isValid: false, message: "Please enter a phone number." };
        }
        if (!phoneRegex.test(phone)) {
            return { isValid: false, message: "Invalid phone number format." };
        }
        return { isValid: true, data: { phone: phone }, message: "Ready for search." };
    },

    getAndValidateSsn: function(config) {
        const ssn = document.getElementById('ssnInput')?.value.trim();
        const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
        if (!ssn) {
            return { isValid: false, message: "Please enter an SSN." };
        }
        if (!ssnRegex.test(ssn)) {
            return { isValid: false, message: "Invalid SSN format (XXX-XX-XXXX)." };
        }
        return { isValid: true, data: { ssn: ssn }, message: "Ready for search." };
    },

    getAndValidateEmail: function(config) {
        const email = document.getElementById('emailInput')?.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return { isValid: false, message: "Please enter an email address." };
        }
        if (!emailRegex.test(email)) {
            return { isValid: false, message: "Invalid email format." };
        }
        return { isValid: true, data: { email: email }, message: "Valid email format." };
    },

    getAndValidateGmail: function(config) {
        // CORREZIONE: Usa il riferimento diretto all'oggetto invece di 'this'
        const emailValidation = ExploratoresValidators.getAndValidateEmail(config);
        
        if (!emailValidation.isValid) {
            return emailValidation;
        }
        const emailParts = emailValidation.data.email.split('@');
        if (emailParts.length !== 2 || emailParts[1].toLowerCase() !== 'gmail.com') {
            return { isValid: false, message: "This function requires a @gmail.com address." };
        }
        return { isValid: true, data: { localpart: emailParts[0] }, message: "Valid Gmail address." };
    },
	
	// AGGIUNGI QUESTE FUNZIONI A validators.js

    getAndValidateUsAddress: function(config) {
        const number = document.getElementById('input-address-usNum')?.value.trim();
        const street = document.getElementById('input-address-usStreet')?.value.trim();
        const city = document.getElementById('input-address-usCity')?.value.trim();
        const state = document.getElementById('input-address-usState')?.value.trim();
        const zip = document.getElementById('input-address-usZip')?.value.trim();

        if (!number && !street && !city && !state && !zip) {
            return { isValid: false, message: "Please enter at least one address field." };
        }
        const fullAddress = [number, street, city, state, zip].filter(Boolean).join(' ');
        return { 
            isValid: true, 
            data: { 
                number: number,
                street: street,
                city: city,
                state: state,
                zip: zip,
                full_address: fullAddress
            }, 
            message: "Ready for search." 
        };
    },
    getAndValidateIntlAddress: function(config) {
        const street = document.getElementById('input-address-intlStreet')?.value.trim();
        const number = document.getElementById('input-address-intlNum')?.value.trim();
        const city = document.getElementById('input-address-intlCity')?.value.trim();
        const zip = document.getElementById('input-address-intlZip')?.value.trim();
        const region = document.getElementById('input-address-intlRegion')?.value.trim();

        if (!street && !city && !region) {
            return { isValid: false, message: "Street, City, and Region/Country are required." };
        }
        const fullAddress = [street, number, city, zip, region].filter(Boolean).join(' ');
        return { isValid: true, data: { full_address: fullAddress }, message: "Ready for search." };
    },
    getAndValidateItCompany: function(config) {
        const company = document.getElementById('input-address-itCompany')?.value.trim();
        const city = document.getElementById('input-address-itCity')?.value.trim();
        if (!company && !city) {
            return { isValid: false, message: "Company name and City are required." };
        }
        return { isValid: true, data: { company: company, city: city }, message: "Ready for search." };
    },
    getAndValidateItPeople: function(config) {
        const first = document.getElementById('input-address-itFirst')?.value.trim();
        const last = document.getElementById('input-address-itLast')?.value.trim();
        const city = document.getElementById('input-address-itCityP')?.value.trim();
        if ((!first && !last) || !city) {
            return { isValid: false, message: "Last name (or first) and City are required." };
        }
        return { isValid: true, data: { first: first, last: last, city: city }, message: "Ready for search." };
    },
    getAndValidateItYellow: function(config) {
        const activity = document.getElementById('input-address-itAct')?.value.trim();
        const location = document.getElementById('input-address-itLoc')?.value.trim();
        if (!activity || !location) {
            return { isValid: false, message: "Activity and Location are required." };
        }
        return { isValid: true, data: { activity: activity, location: location }, message: "Ready for search." };
    },
	
	
	// AGGIUNGI QUESTE FUNZIONI A validators.js

    getAndValidateUsername: function(config) {
        const username = document.getElementById('usernameInput')?.value.trim();
        if (!username) {
            return { isValid: false, message: "Please enter a username." };
        }
        return { isValid: true, data: { username: username }, message: "Ready for search." };
    },

    getAndValidateTumblrUsername: function(config) {
        const validation = ExploratoresValidators.getAndValidateUsername(config);
        if (!validation.isValid) {
            return validation;
        }
        // Tumblr URLs non ammettono caratteri speciali tranne il trattino
        const cleanUsername = validation.data.username.replace(/[^a-zA-Z0-9-]/g, '');
        if (!cleanUsername) {
            return { isValid: false, message: "Invalid username format for Tumblr." };
        }
        validation.data.username = cleanUsername;
        return validation;
    },

    getAndValidateSmatVkUsername: function(config) {
        const validation = ExploratoresValidators.getAndValidateUsername(config);
        if (!validation.isValid) {
            return validation;
        }
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        validation.data.enddate = `${year}-${month}-${day}`;
        return validation;
    },

    getAndValidateRedditTerm: function(config) {
        const value = document.getElementById('input-communities-redditTerm')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a search term." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },
    getAndValidateRedditUser: function(config) {
        const value = document.getElementById('input-communities-redditUser')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a username." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },
    getAndValidateHnTerm: function(config) {
        const value = document.getElementById('input-communities-hnTerm')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a search term." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },
    getAndValidateHnUser: function(config) {
        const value = document.getElementById('input-communities-hnUser')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a username." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },
    getAndValidate4chanTerm: function(config) {
        const value = document.getElementById('input-communities-4chanTerm')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a search term." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },
    getAndValidateDiscordTerm: function(config) {
        const value = document.getElementById('input-communities-discordTerm')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a server name or ID." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },
    getAndValidateTgUser: function(config) {
        const value = document.getElementById('input-communities-tgUser')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a user or channel name." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },
    getAndValidateTgKey: function(config) {
        const value = document.getElementById('input-communities-tgKey')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a keyword." };
        return { isValid: true, data: { keyword: value }, message: "Ready for search." };
    },
	
    getAndValidateVin: function(config) {
        const vin = document.getElementById('vinValue')?.value.trim();
        if (!vin) {
            return { isValid: false, message: "Please enter a VIN." };
        }
        if (vin.length !== 17) {
            return { isValid: false, message: `A valid VIN must be 17 characters. Entered: ${vin.length}.` };
        }
        return { isValid: true, data: { vin: vin }, message: "Valid VIN format." };
    },

    getAndValidatePlate: function(config) {
        const plate = document.getElementById('lpNumber')?.value.trim();
        const state = document.getElementById('lpState')?.value.trim().toUpperCase();
        if (!plate || !state) {
            return { isValid: false, message: "Requires a License Plate and a 2-letter State." };
        }
        if (state.length !== 2) {
            return { isValid: false, message: "State must be exactly 2 letters." };
        }
        return { isValid: true, data: { plate: plate, state: state }, message: "Valid format for search." };
    },
	
	// AGGIUNGI QUESTE FUNZIONI A validators.js

    getAndValidateBtcAddress: function(config) {
        const value = document.getElementById('input-currencies-btcAddress')?.value.trim();
        // Regex di base per indirizzi P2PKH, P2SH e Bech32
        const btcRegex = /^(1[a-km-zA-HJ-NP-Z1-9]{25,34})|(3[a-km-zA-HJ-NP-Z1-9]{25,34})|(bc1[a-zA-HJ-NP-Z0-9]{25,90})$/;
        if (!value) return { isValid: false, message: "Please enter a Bitcoin address." };
        if (!btcRegex.test(value)) return { isValid: false, message: "Invalid Bitcoin address format." };
        return { isValid: true, data: { btc_address: value }, message: "Valid address format." };
    },
    getAndValidateCryptoAmount: function(config) {
        const value = document.getElementById('input-currencies-cryptoAmount')?.value.trim();
        if (!value || isNaN(parseFloat(value))) return { isValid: false, message: "Please enter a numeric amount." };
        return { isValid: true, data: { amount: value }, message: "Ready for conversion." };
    },
    getAndValidateFiatAmount: function(config) {
        const value = document.getElementById('input-currencies-fiatAmount')?.value.trim();
        if (!value || isNaN(parseFloat(value))) return { isValid: false, message: "Please enter a numeric amount." };
        return { isValid: true, data: { amount: value }, message: "Ready for conversion." };
    },
    getAndValidateOtherCryptoAddress: function(config) {
        const value = document.getElementById('input-currencies-otherCryptoAddress')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter an address, TxID, or contract." };
        return { isValid: true, data: { query: value }, message: "Ready for search." };
    },
    getAndValidateAnalysisQuery: function(config) {
        const value = document.getElementById('input-currencies-analysisQuery')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter an address, TxHash, or entity." };
        return { isValid: true, data: { query: value }, message: "Ready for search." };
    },
	
	// AGGIUNGI QUESTE FUNZIONI A validators.js

    getAndValidateYoutubeId: function(config) {
        const value = document.getElementById('youtubeVideoIdInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a YouTube Video ID." };
        return { isValid: true, data: { videoid: value }, message: "Ready for search." };
    },
    getAndValidateYoutubeComments: function(config) {
        const videoId = document.getElementById('ytVideoIdForComments')?.value.trim();
        const searchTerm = document.getElementById('ytCommentSearchTerm')?.value.trim();
        if (!videoId || !searchTerm) return { isValid: false, message: "Video ID and Search Term are required." };
        return { isValid: true, data: { videoid: videoId, term: searchTerm }, message: "Ready for search." };
    },
    getAndValidateYoutubeUsername: function(config) {
        const value = document.getElementById('ytUsernameInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a YouTube Username." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },
    getAndValidateYoutubeChannelId: function(config) {
        const value = document.getElementById('ytChannelIdInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a YouTube Channel ID." };
        return { isValid: true, data: { channelid: value }, message: "Ready for search." };
    },
    getAndValidateVideoTerm: function(config) {
        const value = document.getElementById('videoSearchTermsInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter keywords to search." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },
    getAndValidateTikTokHashtag: function(config) {
        const value = document.getElementById('tikTokHashtagInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a hashtag (without #)." };
        return { isValid: true, data: { hashtag: value }, message: "Ready for search." };
    },
    getAndValidateVimeoImageUrl: function(config) {
        const value = document.getElementById('vimeoImgUrlInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a Vimeo Image URL." };
        if (!value.startsWith('http')) return { isValid: false, message: "Please enter a valid URL." };
        return { isValid: true, data: { url: value }, message: "URL is valid." };
    },

    getAndValidateImageTerm: function(config) {
        const value = document.getElementById('imageSearchTermsInput')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter keywords to search." };
        }
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateImageUrl: function(config) {
        const value = document.getElementById('reverseImageUrlInput')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter an image URL." };
        }
        // Validazione di base per un URL
        if (!value.startsWith('http://') && !value.startsWith('https://')) {
            return { isValid: false, message: "Please enter a valid URL (starting with http/https)." };
        }
        return { isValid: true, data: { url: value }, message: "URL is valid." };
    },

    getAndValidateCoordinates: function(config) {
        const lat = document.getElementById('latitudeInput')?.value.trim();
        const lon = document.getElementById('longitudeInput')?.value.trim();
        if (!lat || !lon) {
            return { isValid: false, message: "Please enter both Latitude and Longitude." };
        }
        if (isNaN(parseFloat(lat)) || isNaN(parseFloat(lon))) {
            return { isValid: false, message: "Coordinates must be valid numbers." };
        }
        return { isValid: true, data: { lat: lat, lon: lon }, message: "Coordinates are valid." };
    },

    getAndValidateZillowCoords: function(config) {
        const validation = ExploratoresValidators.getAndValidateCoordinates(config);
        if (!validation.isValid) {
            return validation;
        }
        const lat = parseFloat(validation.data.lat);
        const lon = parseFloat(validation.data.lon);
        const mapBounds = `"west":${lon - 0.01},"east":${lon + 0.01},"south":${lat - 0.01},"north":${lat + 0.01}`;
        const searchQueryState = `{"isMapVisible":true,"mapBounds":{${mapBounds}},"filterState":{"sort":{"value":"globalrelevanceex"},"ah":{"value":true}},"isListVisible":true,"mapZoom":15}`;
        
        validation.data.searchQueryState = searchQueryState;
        return validation;
    },

     getAndValidateUsaAddress: function(config) {
        const number = document.getElementById('usa_number')?.value.trim();
        const street = document.getElementById('usa_street')?.value.trim();
        const city = document.getElementById('usa_city')?.value.trim();
        const state = document.getElementById('usa_state')?.value.trim();
        const zip = document.getElementById('usa_zip')?.value.trim();

        // La validazione ora richiede che almeno un campo sia compilato
        if (!number && !street && !city && !state && !zip) {
            return { isValid: false, message: "Please enter at least one address field." };
        }
        
        const addressQuery = [number, street, city, state, zip].filter(Boolean).join('+');
        return { isValid: true, data: { usa_address_query: addressQuery }, message: "Ready for geocoding." };
    },

    getAndValidateItalyAddress: function(config) {
        const number = document.getElementById('italy_number')?.value.trim();
        const street = document.getElementById('italy_street')?.value.trim();
        const city = document.getElementById('italy_city')?.value.trim();
        const nation = document.getElementById('italy_nation')?.value.trim();
        const zip = document.getElementById('italy_zip')?.value.trim();
        
        if (!number && !street && !city && !nation && !zip) {
            return { isValid: false, message: "Please enter at least one address field." };
        }

        // Combina via e numero civico per il parametro 'street'
        const streetAndNumber = [street, number].filter(Boolean).join(' ');

        return { 
            isValid: true, 
            data: { 
                street: streetAndNumber,
                city: city,
                country: nation,
                postalcode: zip
            }, 
            message: "Ready for geocoding." 
        };
    },
	
};