const ExploratoresValidators = {
    getAndValidateSearchTerm: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('searchInput')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a search term." };
        }
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateNames: function(config, queryOverride) {
        // This validator uses multiple inputs, so it is not directly compatible with a single queryOverride.
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
    
    getAndValidateUsPhone: function(config, queryOverride) {
        // Multi-input validator.
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

    getAndValidateIntlPhone: function(config, queryOverride) {
        // Multi-input validator.
        const countryCode = (document.getElementById('countryCodeInput')?.value || '').trim();
        const nationalNum = (document.getElementById('nationalNumberInput')?.value || '').trim();
        const countryIso = (document.getElementById('countryLettersInput')?.value || '').trim().toUpperCase();

        const rules = config.validation_rules || {};
        if (rules.requireCountryCode && !countryCode) return { isValid: false, message: "Country code is required." };
        if (rules.requireNatNum && !nationalNum) return { isValid: false, message: "National number is required." };
        if (rules.requireCountryLetters && !countryIso) return { isValid: false, message: "Country ISO is required." };
        if (!countryCode && !nationalNum) return { isValid: false, message: "Enter a phone number." };

        // Normalize country code: strip spaces, 0039 → 39, +39 → 39
        const cc = countryCode.replace(/\s/g, '').replace(/^\+/, '').replace(/^00/, '');
        // Normalize national number: strip internal spaces and leading zero (trunk prefix)
        const nat = nationalNum.replace(/\s/g, '').replace(/^0/, '');

        // Post-normalization guards: only fire if value was provided but became empty after normalization
        if (countryCode && !cc) return { isValid: false, message: "Invalid country code format." };
        if (nationalNum && !nat) return { isValid: false, message: "Invalid national number format." };

        const e164 = cc + nat;
        const queryVariations = [`"+${cc}${nat}"`, `"+${cc} ${nat}"`];
        return {
            isValid: true,
            data: {
                e164: e164,
                countrycode: cc,
                nat_num: nat,
                country_iso: countryIso,
                country_iso_lower: countryIso.toLowerCase(),
                google_query: queryVariations.join(" OR "),
                dt_plus_cc_num: `+${cc}.${nat}`,
                dt_plus_cc_0num: `+${cc}.0${nat}`,
                dt_num_only: nat,
                dt_0num_only: `0${nat}`,
                dt_enum_generic: `e${nat}`,
                dt_num_generic: nat
            },
            message: "Ready for search."
        };
    },

    getAndValidateOfficerName: function(config, queryOverride) {
        const officerName = queryOverride !== undefined ? queryOverride : document.getElementById('officerNameInput')?.value.trim();
        if (!officerName) {
            return { isValid: false, message: "Please enter an officer name." };
        }
        return { isValid: true, data: { officername: officerName }, message: "Ready for search." };
    },

    getAndValidateUsOfficerName: function(config, queryOverride) {
        // Multi-input validator.
        const firstName = document.getElementById('officerSearchFirstName')?.value.trim();
        const lastName = document.getElementById('officerSearchLastName')?.value.trim();
        if (!firstName || !lastName) {
            return { isValid: false, message: "Please enter both first and last name." };
        }
        return { isValid: true, data: { firstname: firstName, lastname: lastName }, message: "Ready for search." };
    },

    getAndValidateCompanyName: function(config, queryOverride) {
        const companyName = queryOverride !== undefined ? queryOverride : document.getElementById('companyNameInput')?.value.trim();
        if (!companyName) {
            return { isValid: false, message: "Please enter a company name." };
        }
        return { isValid: true, data: { companyname: companyName }, message: "Ready for search." };
    },

    getAndValidateCompanyEmail: function(config, queryOverride) {
        const email = queryOverride !== undefined ? queryOverride : document.getElementById('companyEmailInput')?.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return { isValid: false, message: "Please enter an email address." };
        }
        if (!emailRegex.test(email)) {
            return { isValid: false, message: "Invalid email format." };
        }
        return { isValid: true, data: { email: email }, message: "Ready for search." };
    },

    getAndValidateCompanyPhone: function(config, queryOverride) {
        const phone = queryOverride !== undefined ? queryOverride : document.getElementById('companyPhoneInput')?.value.trim();
        const phoneRegex = /^[0-9\s-()+]+$/;
        if (!phone) {
            return { isValid: false, message: "Please enter a phone number." };
        }
        if (!phoneRegex.test(phone)) {
            return { isValid: false, message: "Invalid phone number format." };
        }
        return { isValid: true, data: { phone: phone }, message: "Ready for search." };
    },

    getAndValidateSsn: function(config, queryOverride) {
        const ssn = queryOverride !== undefined ? queryOverride : document.getElementById('ssnInput')?.value.trim();
        const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
        if (!ssn) {
            return { isValid: false, message: "Please enter an SSN." };
        }
        if (!ssnRegex.test(ssn)) {
            return { isValid: false, message: "Invalid SSN format (XXX-XX-XXXX)." };
        }
        return { isValid: true, data: { ssn: ssn }, message: "Ready for search." };
    },

    getAndValidateEmail: function(config, queryOverride) {
        const email = queryOverride !== undefined ? queryOverride : document.getElementById('emailInput')?.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return { isValid: false, message: "Please enter an email address." };
        }
        if (!emailRegex.test(email)) {
            return { isValid: false, message: "Invalid email format." };
        }
        return { isValid: true, data: { email: email }, message: "Valid email format." };
    },

    getAndValidateGmail: function(config, queryOverride) {
        const email = queryOverride !== undefined ? queryOverride : document.getElementById('emailInput')?.value.trim();
        const emailValidation = this.getAndValidateEmail(config, email);
        if (!emailValidation.isValid) {
            return emailValidation;
        }
        const emailParts = emailValidation.data.email.split('@');
        if (emailParts.length !== 2 || emailParts[1].toLowerCase() !== 'gmail.com') {
            return { isValid: false, message: "This function requires a @gmail.com address." };
        }
        return { isValid: true, data: { localpart: emailParts[0] }, message: "Valid Gmail address." };
    },

    getAndValidateUsAddress: function(config, queryOverride) {
        // Multi-input validator.
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
            data: { number, street, city, state, zip, full_address: fullAddress }, 
            message: "Ready for search." 
        };
    },

    getAndValidateIntlAddress: function(config, queryOverride) {
        // Multi-input validator.
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

    getAndValidateItCompany: function(config, queryOverride) {
        // Multi-input validator.
        const company = document.getElementById('input-address-itCompany')?.value.trim();
        const city = document.getElementById('input-address-itCity')?.value.trim();
        if (!company && !city) {
            return { isValid: false, message: "Company name and City are required." };
        }
        return { isValid: true, data: { company: company, city: city }, message: "Ready for search." };
    },

    getAndValidateItPeople: function(config, queryOverride) {
        // Multi-input validator.
        const first = document.getElementById('input-address-itFirst')?.value.trim();
        const last = document.getElementById('input-address-itLast')?.value.trim();
        const city = document.getElementById('input-address-itCityP')?.value.trim();
        if ((!first && !last) || !city) {
            return { isValid: false, message: "Last name (or first) and City are required." };
        }
        return { isValid: true, data: { first: first, last: last, city: city }, message: "Ready for search." };
    },

    getAndValidateItYellow: function(config, queryOverride) {
        // Multi-input validator.
        const activity = document.getElementById('input-address-itAct')?.value.trim();
        const location = document.getElementById('input-address-itLoc')?.value.trim();
        if (!activity || !location) {
            return { isValid: false, message: "Activity and Location are required." };
        }
        return { isValid: true, data: { activity: activity, location: location }, message: "Ready for search." };
    },

    getAndValidateUsername: function(config, queryOverride) {
        const username = queryOverride !== undefined ? queryOverride : document.getElementById('usernameInput')?.value.trim();
        if (!username) {
            return { isValid: false, message: "Please enter a username." };
        }
        return { isValid: true, data: { username: username }, message: "Ready for search." };
    },

    getAndValidateTumblrUsername: function(config, queryOverride) {
        const validation = this.getAndValidateUsername(config, queryOverride);
        if (!validation.isValid) {
            return validation;
        }
        const cleanUsername = validation.data.username.replace(/[^a-zA-Z0-9-]/g, '');
        if (!cleanUsername) {
            return { isValid: false, message: "Invalid username format for Tumblr." };
        }
        validation.data.username = cleanUsername;
        return validation;
    },

    getAndValidateSmatVkUsername: function(config, queryOverride) {
        const validation = this.getAndValidateUsername(config, queryOverride);
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

    getAndValidateRedditTerm: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-communities-redditTerm')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a search term." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateRedditUser: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-communities-redditUser')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a username." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },

    getAndValidateHnTerm: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-communities-hnTerm')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a search term." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateHnUser: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-communities-hnUser')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a username." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },

    getAndValidate4chanTerm: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-communities-4chanTerm')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a search term." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateDiscordTerm: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-communities-discordTerm')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a server name or ID." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateTgUser: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-communities-tgUser')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a user or channel name." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },

    getAndValidateTgKey: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-communities-tgKey')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a keyword." };
        return { isValid: true, data: { keyword: value }, message: "Ready for search." };
    },
	
    getAndValidateVin: function(config, queryOverride) {
        const vin = queryOverride !== undefined ? queryOverride : document.getElementById('vinValue')?.value.trim();
        if (!vin) {
            return { isValid: false, message: "Please enter a VIN." };
        }
        if (vin.length !== 17) {
            return { isValid: false, message: `A valid VIN must be 17 characters. Entered: ${vin.length}.` };
        }
        return { isValid: true, data: { vin: vin }, message: "Valid VIN format." };
    },

    getAndValidatePlate: function(config, queryOverride) {
        // Multi-input validator.
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

    getAndValidateIpAddress: function(config, queryOverride) {
        const ip = queryOverride !== undefined ? queryOverride : document.getElementById('ipAddressInput')?.value.trim();
        const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!ip) {
            return { isValid: false, message: "Please enter an IP address." };
        }
        if (!ipv4Regex.test(ip)) {
            return { isValid: false, message: "Invalid IPv4 address format." };
        }
        return { isValid: true, data: { ip: ip }, message: "Valid IP address format." };
    },

    getAndValidateNetworksDbRange: function(config, queryOverride) {
        const validation = this.getAndValidateIpAddress(config, queryOverride);
        if (validation.isValid) {
            const ipParts = validation.data.ip.split('.');
            const networkBase = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}`;
            validation.data.start_ip = `${networkBase}.0`;
            validation.data.end_ip = `${networkBase}.255`;
        }
        return validation;
    },

    getAndValidateSsid: function(config, queryOverride) {
        const ssid = queryOverride !== undefined ? queryOverride : document.getElementById('wigleSsidInput')?.value.trim();
        if (!ssid) {
            return { isValid: false, message: "Please enter an SSID." };
        }
        return { isValid: true, data: { ssid: ssid }, message: "Ready for search." };
    },

    getAndValidatePostalCode: function(config, queryOverride) {
        const postal = queryOverride !== undefined ? queryOverride : document.getElementById('wiglePostalInput')?.value.trim();
        if (!postal) {
            return { isValid: false, message: "Please enter a Postal Code." };
        }
        return { isValid: true, data: { postalcode: postal }, message: "Ready for search." };
    },

    getAndValidateBtcAddress: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-currencies-btcAddress')?.value.trim();
        const btcRegex = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
        if (!value) return { isValid: false, message: "Please enter a Bitcoin address." };
        if (!btcRegex.test(value)) return { isValid: false, message: "Invalid Bitcoin address format." };
        return { isValid: true, data: { btc_address: value }, message: "Valid address format." };
    },

    getAndValidateCryptoAmount: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-currencies-cryptoAmount')?.value.trim();
        if (!value || isNaN(parseFloat(value))) return { isValid: false, message: "Please enter a numeric amount." };
        return { isValid: true, data: { amount: value }, message: "Ready for conversion." };
    },

    getAndValidateFiatAmount: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-currencies-fiatAmount')?.value.trim();
        if (!value || isNaN(parseFloat(value))) return { isValid: false, message: "Please enter a numeric amount." };
        return { isValid: true, data: { amount: value }, message: "Ready for conversion." };
    },

    getAndValidateOtherCryptoAddress: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-currencies-otherCryptoAddress')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter an address, TxID, or contract." };
        return { isValid: true, data: { query: value }, message: "Ready for search." };
    },

    getAndValidateAnalysisQuery: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-currencies-analysisQuery')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter an address, TxHash, or entity." };
        return { isValid: true, data: { query: value }, message: "Ready for search." };
    },
	
    getAndValidateYoutubeId: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('youtubeVideoIdInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a YouTube Video ID." };
        return { isValid: true, data: { videoid: value }, message: "Ready for search." };
    },

    getAndValidateYoutubeComments: function(config, queryOverride) {
        // Multi-input validator.
        const videoId = document.getElementById('ytVideoIdForComments')?.value.trim();
        const searchTerm = document.getElementById('ytCommentSearchTerm')?.value.trim();
        if (!videoId || !searchTerm) return { isValid: false, message: "Video ID and Search Term are required." };
        return { isValid: true, data: { videoid: videoId, term: searchTerm }, message: "Ready for search." };
    },

    getAndValidateYoutubeUsername: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('ytUsernameInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a YouTube Username." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },
	
	getAndValidateDocSearchTerm: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-docs-term')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a search term." };
        }
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },
	
    getAndValidateYoutubeChannelId: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('ytChannelIdInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a YouTube Channel ID." };
        return { isValid: true, data: { channelid: value }, message: "Ready for search." };
    },

    getAndValidateVideoTerm: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('videoSearchTermsInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter keywords to search." };
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateTikTokHashtag: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('tikTokHashtagInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a hashtag (without #)." };
        return { isValid: true, data: { hashtag: value }, message: "Ready for search." };
    },

    getAndValidateVimeoImageUrl: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('vimeoImgUrlInput')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a Vimeo Image URL." };
        if (!value.startsWith('http')) return { isValid: false, message: "Please enter a valid URL." };
        return { isValid: true, data: { url: value }, message: "URL is valid." };
    },

    getAndValidateImageTerm: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('imageSearchTermsInput')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter keywords to search." };
        }
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateImageUrl: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('reverseImageUrlInput')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter an image URL." };
        }
        if (!value.startsWith('http://') && !value.startsWith('https://')) {
            return { isValid: false, message: "Please enter a valid URL (starting with http/https)." };
        }
        return { isValid: true, data: { url: value }, message: "URL is valid." };
    },

    getAndValidateCoordinates: function(config, queryOverride) {
        // Multi-input validator.
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

    getAndValidateZillowCoords: function(config, queryOverride) {
        // Multi-input validator.
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

     getAndValidateUsaAddress: function(config, queryOverride) {
        // Multi-input validator.
        const number = document.getElementById('usa_number')?.value.trim();
        const street = document.getElementById('usa_street')?.value.trim();
        const city = document.getElementById('usa_city')?.value.trim();
        const state = document.getElementById('usa_state')?.value.trim();
        const zip = document.getElementById('usa_zip')?.value.trim();
        if (!number && !street && !city && !state && !zip) {
            return { isValid: false, message: "Please enter at least one address field." };
        }
        const addressQuery = [number, street, city, state, zip].filter(Boolean).join('+');
        return { isValid: true, data: { usa_address_query: addressQuery }, message: "Ready for geocoding." };
    },

    getAndValidateItalyAddress: function(config, queryOverride) {
        // Multi-input validator.
        const number = document.getElementById('italy_number')?.value.trim();
        const street = document.getElementById('italy_street')?.value.trim();
        const city = document.getElementById('italy_city')?.value.trim();
        const nation = document.getElementById('italy_nation')?.value.trim();
        const zip = document.getElementById('italy_zip')?.value.trim();
        if (!number && !street && !city && !nation && !zip) {
            return { isValid: false, message: "Please enter at least one address field." };
        }
        const streetAndNumber = [street, number].filter(Boolean).join(' ');
        return { 
            isValid: true, 
            data: { street: streetAndNumber, city, country: nation, postalcode: zip }, 
            message: "Ready for geocoding." 
        };
    },
	
    getAndValidateKeybaseQuery: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('keybaseQueryInput')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a username, team, or query." };
        }
        return { isValid: true, data: { query: value }, message: "Ready for search." };
    },

    getAndValidateLinkedinProfile: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-linkedin-profile-user')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a username or profile path." };
        }
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },

    getAndValidateLinkedinMedia: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-linkedin-media-keyword')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a name or keyword." };
        }
        return { isValid: true, data: { keyword: value }, message: "Ready for search." };
    },

    getAndValidateLinkedinVideo: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-linkedin-video-keyword')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a search term for videos." };
        }
        return { isValid: true, data: { keyword: value }, message: "Ready for search." };
    },

    getAndValidateLinkedinKeyword: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-linkedin-cgs-keyword')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a keyword." };
        }
        return { isValid: true, data: { keyword: value }, message: "Ready for search." };
    },

    getAndValidateLinkedinExternal: function(config, queryOverride) {
        // Multi-input validator.
        const keyword = document.getElementById('input-linkedin-ext-keyword')?.value.trim();
        const fname = document.getElementById('input-linkedin-ext-fname')?.value.trim();
        const lname = document.getElementById('input-linkedin-ext-lname')?.value.trim();
        const title = document.getElementById('input-linkedin-ext-title')?.value.trim();
        const company = document.getElementById('input-linkedin-ext-company')?.value.trim();
        const school = document.getElementById('input-linkedin-ext-school')?.value.trim();
        const queryParts = [keyword, fname, lname, title, company, school].filter(Boolean);
        if (queryParts.length === 0) {
            return { isValid: false, message: "Please enter at least one search term." };
        }
        const query = queryParts.join(' ');
        return { isValid: true, data: { query: query }, message: "Ready for search." };
    },

    getAndValidateXAccountUsername: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-x-account-username')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a username (without @)." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },

    getAndValidateXListId: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-x-listId')?.value.trim();
        if (!/^\d+$/.test(value)) return { isValid: false, message: "Please enter a numeric List ID." };
        return { isValid: true, data: { listid: value }, message: "Ready for search." };
    },

    getAndValidateXRealName: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-x-realName')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a real name." };
        return { isValid: true, data: { realname: value }, message: "Ready for search." };
    },

    getAndValidateXYearSearch: function(config, queryOverride) {
        // Multi-input validator.
        const term = document.getElementById('input-x-yearTerm')?.value.trim();
        const year = document.getElementById('input-x-yearNum')?.value.trim();
        if (!term || !/^\d{4}$/.test(year)) {
            return { isValid: false, message: "Requires a username/term and a 4-digit year." };
        }
        const since = `${year}-01-01`;
        const until = `${year}-12-31`;
        return { isValid: true, data: { term: term, since: since, until: until }, message: "Ready for search." };
    },

    getAndValidateXArchiveUser: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-x-archiveUser')?.value.trim();
        if (!value) return { isValid: false, message: "Please enter a username." };
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },

    getAndValidateXMemoryId: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-x-memoryId')?.value.trim();
        if (!/^\d+$/.test(value)) return { isValid: false, message: "Please enter a numeric User ID." };
        return { isValid: true, data: { userid: value }, message: "Ready for search." };
    },

    getAndValidateFacebookUsername: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-facebook-username')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a username or User ID." };
        }
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },

    getAndValidateFacebookUserId: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-facebook-userid')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a numeric User ID." };
        }
        if (!/^\d+$/.test(value)) {
            return { isValid: false, message: "User ID must be numeric." };
        }
        return { isValid: true, data: { userid: value }, message: "Ready for search." };
    },

    getAndValidateFacebookSearchTerm: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-facebook-searchterm')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a search term." };
        }
        return { isValid: true, data: { term: value }, message: "Ready for search." };
    },

    getAndValidateInstagramUsername: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-instagram-username')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a username." };
        }
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },

    getAndValidateInstagramUserId: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-instagram-userid')?.value.trim();
        const isNumeric = /^\d+$/.test(value);
        if (!value) {
            return { isValid: false, message: "Please enter an Instagram User ID." };
        }
        if (!isNumeric) {
            return { isValid: false, message: "User ID must be numeric." };
        }
        return { isValid: true, data: { userid: value }, message: "Ready for search." };
    },

    getAndValidateInstagramCombinedSearch: function(config, queryOverride) {
        // Multi-input validator.
        const userA = document.getElementById('input-instagram-combo-usera')?.value.trim();
        const userB = document.getElementById('input-instagram-combo-userb')?.value.trim();
        if (!userA || !userB) {
            return { isValid: false, message: "Please enter both a username and a search term/user B." };
        }
        return { isValid: true, data: { usera: userA, userb: userB }, message: "Ready for search." };
    },

    getAndValidateInstagramHashtag: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-instagram-hashtag')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a hashtag or term." };
        }
        return { isValid: true, data: { hashtag: value }, message: "Ready for search." };
    },

    getAndValidateDomain: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-domains-main')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a domain or keyword." };
        }
        const isLikelyDomain = value.includes('.');
        return { 
            isValid: true, 
            data: { domain: value, domain_nodots: value.replace(/\./g, '') }, 
            message: isLikelyDomain ? "Valid domain format." : "Keyword ready for search."
        };
    },

    getAndValidateUrl: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-domains-shortUrl')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a URL." };
        }
        try {
            new URL(value);
            return { isValid: true, data: { url: value }, message: "Valid URL format." };
        } catch (_) {
            return { isValid: false, message: "Invalid URL format. Must include http/https." };
        }
    },

    getAndValidateAdsenseId: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-domains-adsenseId')?.value.trim();
        const adsenseRegex = /^pub-\d{16}$/;
        if (!value) {
            return { isValid: false, message: "Please enter an AdSense ID." };
        }
        if (!adsenseRegex.test(value)) {
            return { isValid: false, message: "Format must be pub-XXXXXXXXXXXXXXXX." };
        }
        return { isValid: true, data: { adsenseid: value }, message: "Valid AdSense ID." };
    },

    getAndValidateAnalyticsId: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-domains-analyticsId')?.value.trim();
        const analyticsRegex = /^(UA-\d{4,}-\d{1,})|(G-[A-Z0-9]{10})$/i;
         if (!value) {
            return { isValid: false, message: "Please enter an Analytics ID." };
        }
        if (!analyticsRegex.test(value)) {
            return { isValid: false, message: "Invalid Analytics ID format (UA-xxxx or G-xxxx)." };
        }
        return { isValid: true, data: { analyticsid: value }, message: "Valid Analytics ID." };
    },

    getAndValidateFaviconUrl: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-domains-faviconUrl')?.value.trim();
         if (!value) {
            return { isValid: false, message: "Please enter a Favicon URL." };
        }
        return { isValid: true, data: { favicon_url: value }, message: "Ready. Note: Hash calculation is external." };
    },

    getAndValidateShodanFaviconHash: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-domains-shodanHash')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a numeric hash." };
        }
        if (!/^-?\d+$/.test(value)) {
            return { isValid: false, message: "Hash must be a numeric value." };
        }
        return { isValid: true, data: { shodan_hash: value }, message: "Valid Shodan hash." };
    },

    getAndValidateMd5Hash: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-domains-md5Hash')?.value.trim().toLowerCase();
        const md5Regex = /^[a-f0-9]{32}$/;
        if (!value) {
            return { isValid: false, message: "Please enter an MD5 hash." };
        }
        if (!md5Regex.test(value)) {
            return { isValid: false, message: "Invalid MD5 format (must be 32 hex chars)." };
        }
        return { isValid: true, data: { md5_hash: value }, message: "Valid MD5 hash." };
    },

    getAndValidateCsp: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-domains-csp')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a CSP string." };
        }
        return { isValid: true, data: { csp_string: value }, message: "Ready for search." };
    },

    getAndValidateVkUsername: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-vk-username')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a username or search term." };
        }
        return { isValid: true, data: { username: value }, message: "Ready for search." };
    },

    getAndValidateVkUserId: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-vk-userid')?.value.trim();
        if (!value || isNaN(value)) {
            return { isValid: false, message: "Please enter a numeric User or Group ID." };
        }
        return { isValid: true, data: { userid: value }, message: "Ready for search." };
    },

    getAndValidateVkTag: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-vk-tag')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a tag to search." };
        }
        const tag = '#' + value.replace(/^#/, '');
        return { isValid: true, data: { tag: tag }, message: "Ready for search." };
    },

    getAndValidateVkSmat: function(config, queryOverride) {
        const value = queryOverride !== undefined ? queryOverride : document.getElementById('input-vk-username')?.value.trim();
        if (!value) {
            return { isValid: false, message: "Please enter a search term for SMAT." };
        }
        const today = new Date();
        const endDate = today.toISOString().split('T')[0];
        return { isValid: true, data: { username: value, enddate: endDate }, message: "Ready for search." };
    },

    getAndValidateIban: function(config, queryOverride) {
        const raw = queryOverride != null ? queryOverride : document.getElementById('ibanSearchInput')?.value.trim();
        const iban = raw ? raw.replace(/\s/g, '').toUpperCase() : '';
        if (!iban) return { isValid: false, message: "Please enter an IBAN." };
        const basicIbanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
        if (!basicIbanRegex.test(iban)) return { isValid: false, message: "Invalid IBAN format." };
        if (typeof ibankit !== 'undefined' && !ibankit.validateIBAN(iban)) {
            return { isValid: false, message: "Invalid IBAN checksum." };
        }
        return { isValid: true, data: { iban: iban }, message: "Valid IBAN." };
    },

    getAndValidateJanuaInput: function(config, queryOverride) {
        // This function is unique to Janua and does not need a queryOverride itself.
        const inputElement = document.getElementById('indicator-input');
        const value = inputElement ? inputElement.value.trim() : "";
        if (!value) {
            return { isValid: false, message: "Indicator is required." };
        }
        const genericData = {
            term: value, email: value, domain: value, ip: value, btc_address: value, 
            username: value, query: value, iban: value, coordinates: value, vin: value,
            phone_e164: value, fullname: value, fullnamedash: value.replace(/\s+/g, '-'), 
            fullnamedashlower: value.replace(/\s+/g, '-').toLowerCase()
        };
        return { isValid: true, data: genericData, message: "Ready." };
    }
};