/**
 * @file Contains the logic for classifying an indicator (search string) based on its format.
 * It exposes a single function, classifyIndicator, which returns the detected indicator type.
 */

/**
 * Analyzes an input string (query) to determine its type.
 * Classification is done through a series of regular expression checks
 * in a specific priority order to handle ambiguities.
 *
 * @param {string} query The input string to classify.
 * @returns {string} The detected indicator type (e.g., 'EMAIL', 'IPV4', 'GENERIC_TEXT').
 */
function classifyIndicator(query) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return 'EMPTY'; // Or another type to handle empty inputs
  }

  // Regular expression definitions for each indicator type
  const regex = {
    // Matches international IBANs: 2 letters, 2 digits, followed by alphanumeric characters.
    IBAN: /^[A-Z]{2}\d{2}[A-Z\d]{11,30}$/i,

    // Matches the most common Bitcoin address formats (P2PKH, P2SH, Bech32).
    BTC_ADDRESS: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,

    // Matches a valid IPv4 address (four blocks of numbers from 0-255).
    IPV4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,

    // Matches a standard email format (user@domain.tld).
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Matches a domain name. Excludes strings with '@' or spaces.
    DOMAIN: /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,63}$/i,

    // Matches geographic coordinates (lat, lon).
    COORDINATES: /^-?\d{1,3}(?:\.\d+)?,\s*-?\d{1,3}(?:\.\d+)?$/,

    // Matches the E.164 format for international phone numbers.
    PHONE_E164: /^\+\d{7,15}$/,
    
    // Matches a 17-character alphanumeric Vehicle Identification Number (VIN) (excluding I, O, Q).
    VEHICLE_VIN: /^[A-HJ-NPR-Z0-9]{17}$/i,
    
    // Matches a typical online username/alias (no spaces).
    USERNAME: /^[a-zA-Z0-9_.-]{3,24}$/,
  };

  // --- Prioritized chain of checks ---

  if (regex.IBAN.test(trimmedQuery)) {
    return 'IBAN';
  }

  if (regex.BTC_ADDRESS.test(trimmedQuery)) {
    return 'BTC_ADDRESS';
  }

  if (regex.IPV4.test(trimmedQuery)) {
    return 'IPV4';
  }

  if (regex.EMAIL.test(trimmedQuery)) {
    return 'EMAIL';
  }

  // A domain must not contain spaces or '@' (already handled by the email regex).
  if (!trimmedQuery.includes(' ') && regex.DOMAIN.test(trimmedQuery)) {
    return 'DOMAIN';
  }

  if (regex.COORDINATES.test(trimmedQuery)) {
    return 'COORDINATES';
  }

  if (regex.PHONE_E164.test(trimmedQuery)) {
    return 'PHONE_E164';
  }
  
  if (regex.VEHICLE_VIN.test(trimmedQuery)) {
    return 'VEHICLE_VIN';
  }

  // Check if it's a possible username (no spaces).
  // This check has a low priority to avoid capturing other types.
  if (!trimmedQuery.includes(' ') && regex.USERNAME.test(trimmedQuery)) {
    return 'USERNAME';
  }

  // If no specific pattern matches, it is considered generic text.
  // Useful for searching names, phrases, or other terms.
  return 'GENERIC_TEXT';
}