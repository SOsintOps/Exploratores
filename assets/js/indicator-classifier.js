/**
 * @file Contains the logic for classifying an indicator (search string) based on its format.
 * It exposes a single function, classifyIndicator, which returns a sorted array of possible indicator types.
 */

/**
 * Parses a URL to extract platform-specific subtypes and indicators.
 * @param {string} query The URL to parse.
 * @returns {Array<Object>} An array of identified subtypes.
 */
function parseUrlForSubTypes(query) {
    const subTypeResults = [];
    try {
        const url = new URL(query);
        const hostname = url.hostname.replace(/^www\./, '');
        const path = url.pathname.slice(1);

        const platformRules = {
            'vk.com': { type: 'VK_USERNAME', regex: /^([\w.-]+)/ },
            'x.com': { type: 'X_USERNAME', regex: /^([\w.-]+)/ },
            'twitter.com': { type: 'X_USERNAME', regex: /^([\w.-]+)/ },
            'instagram.com': { type: 'INSTAGRAM_USERNAME', regex: /^([\w.-]+)/ },
            't.me': { type: 'TELEGRAM_USERNAME', regex: /^([\w.-]+)/ },
            'facebook.com': { type: 'FACEBOOK_USERNAME', regex: /^([\w.-]+)/ },
            'linkedin.com/in': { type: 'LINKEDIN_PROFILE', regex: /in\/([\w.-]+)/ }
        };

        for (const key in platformRules) {
            if ((hostname + '/' + path).startsWith(key)) {
                const rule = platformRules[key];
                const match = (key + '/' + path).match(rule.regex);
                if (match && match[1]) {
                    const extractedValue = match[1];
                    subTypeResults.push({ type: rule.type, score: 0.9, value: extractedValue });
                    if (rule.type.includes('USERNAME') || rule.type.includes('PROFILE')) {
                         subTypeResults.push({ type: 'USERNAME', score: 0.85, value: extractedValue });
                    }
                }
            }
        }
    } catch (e) { /* Not a valid URL, ignore. */ }
    return subTypeResults;
}

/**
 * Analyzes an input string (query) to determine its possible types using a hierarchical approach.
 * @param {string} query The input string to classify.
 * @returns {Array<Object>} An array of objects, e.g., [{ type: 'EMAIL', score: 0.95 }]
 */
function classifyIndicator(query) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
        return [];
    }

    const robustDomainPattern = new RegExp(/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/);

    // --- GRUPPO 1: Indicatori Univoci (Gerarchia Alta) ---
    const indicatoriUnivoci = [
        { type: 'IBAN', pattern: /^[A-Z]{2}\d{2}[A-Z\d]{11,30}$/i, score: 1.0 },
        { type: 'BTC_ADDRESS', pattern: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/, score: 1.0 },
        { type: 'CRYPTO_ETH', pattern: /^0x[a-fA-F0-9]{40}$/, score: 1.0 },
        { type: 'CRYPTO_XMR', pattern: /^[48][0-9AB][1-9A-HJ-NP-Za-km-z]{93,105}$/, score: 1.0 },
        { type: 'HASH_SHA256', pattern: /^[a-f0-9]{64}$/i, score: 1.0 },
        { type: 'HASH_SHA1', pattern: /^[a-f0-9]{40}$/i, score: 1.0 },
        { type: 'HASH_MD5', pattern: /^[a-f0-9]{32}$/i, score: 1.0 },
        { type: 'SSN', pattern: /^\d{3}-?\d{2}-?\d{4}$/, score: 1.0 },
        { type: 'ADSENSE_ID', pattern: /^pub-\d{16}$/i, score: 1.0 },
        { type: 'ANALYTICS_ID', pattern: /^(UA-\d{4,}-\d{1,}|G-[A-Z0-9]{10})$/i, score: 1.0 },
        { type: 'IPV4', pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/, score: 0.95 },
        { type: 'EMAIL', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, score: 0.95 },
        { type: 'PHONE_E164', pattern: /^\+\d{7,15}$/, score: 0.9 },
        { type: 'YOUTUBE_CHANNEL_ID', pattern: /^UC[a-zA-Z0-9_-]{22}$/, score: 0.9 },
        { type: 'VEHICLE_VIN', pattern: /^[A-HJ-NPR-Z0-9]{17}$/i, score: 0.85 },
        { type: 'URL', pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i, score: 0.8, preCheck: q => q.includes('.') && !q.includes(' ') },
        { type: 'DOMAIN', pattern: robustDomainPattern, score: 0.8, preCheck: q => !q.includes(' ') && !q.includes('@') }
    ];

    for (const rule of indicatoriUnivoci) {
        if (rule.pattern.test(trimmedQuery)) {
            if (rule.preCheck && !rule.preCheck(trimmedQuery)) {
                continue;
            }
            let results = [{ type: rule.type, score: rule.score, value: trimmedQuery }];
            if (rule.type === 'URL') {
                const subTypes = parseUrlForSubTypes(trimmedQuery);
                results = results.concat(subTypes);
            }
            return results;
        }
    }

    // --- GRUPPO 2: Indicatori Ambigui (Gerarchia Bassa) ---
    // Eseguito solo se nessun indicatore univoco è stato trovato.
    const indicatoriAmbigui = [
        { type: 'COORDINATES', pattern: /^-?\d{1,3}(?:\.\d+)?,\s*-?\d{1,3}(?:\d+)?$/, score: 0.75 },
        { type: 'YOUTUBE_VIDEO_ID', pattern: /^[a-zA-Z0-9_-]{11}$/, score: 0.7 },
        { type: 'USERNAME', pattern: /^[a-zA-Z0-9_.-]{3,24}$/, score: 0.6, preCheck: q => !q.includes(' ') },
        { type: 'PERSON_NAME', pattern: /^[A-Z][a-z']+(\s[A-Z][a-z']{1,})+$/, score: 0.55, preCheck: q => q.includes(' ') },
        { type: 'NUMERIC_ID', pattern: /^\d{5,20}$/, score: 0.5 },
        { type: 'PHONE_NATIONAL', pattern: /^[\d\s-()]{7,15}$/, score: 0.5, preCheck: q => !q.startsWith('+') && /\d/.test(q) }
    ];

    let ambiguousResults = [];
    indicatoriAmbigui.forEach(rule => {
        let passesPreCheck = rule.preCheck ? rule.preCheck(trimmedQuery) : true;
        if (passesPreCheck && rule.pattern.test(trimmedQuery)) {
            ambiguousResults.push({ type: rule.type, score: rule.score, value: trimmedQuery });
        }
    });

    // Fallback
    const genericTextScore = ambiguousResults.length > 0 ? 0.1 : 0.5;
    ambiguousResults.push({ type: 'GENERIC_TEXT', score: genericTextScore, value: trimmedQuery });
    
    // Sort and deduplicate
    ambiguousResults.sort((a, b) => b.score - a.score);
    const uniqueResults = [];
    const seenTypes = new Set();
    for (const result of ambiguousResults) {
        if (!seenTypes.has(result.type)) {
            uniqueResults.push(result);
            seenTypes.add(result.type);
        }
    }

    return uniqueResults;
}