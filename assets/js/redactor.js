// Exploratores Redactor — browser-side PII redaction with reversible mapping.
// All processing is local: the redaction map lives only in memory, custom
// patterns persist in localStorage. Used exclusively by pages/redactor.html.
//
// The checksum validators (Codice Fiscale, Partita IVA, IBAN mod-97, Luhn), the
// printed-IBAN scanner, the tolerant restore and the URL, IP, plate, amount,
// act-reference and Italian phone patterns are adapted from rizzo-pii
// (https://github.com/Rizzo-AI-Academy/rizzo-pii), released under this licence:
//
//   MIT License
//
//   Copyright (c) 2026 Simone Rizzo — Rizzo AI Academy
//
//   Permission is hereby granted, free of charge, to any person obtaining a copy
//   of this software and associated documentation files (the "Software"), to deal
//   in the Software without restriction, including without limitation the rights
//   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//   copies of the Software, and to permit persons to whom the Software is
//   furnished to do so, subject to the following conditions:
//
//   The above copyright notice and this permission notice shall be included in all
//   copies or substantial portions of the Software.
//
//   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//   SOFTWARE.
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof exploratoresConfig !== 'undefined' && exploratoresConfig.lightVersionEnabled) {
      exploratoresConfig.selectorsToHide.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => el.classList.add('hidden-in-light'));
        } catch (e) {
          console.error("Invalid selector in config.js:", selector);
        }
      });
    }
  });

  // ─── Checksum Validators ────────────────────────────────────────────────────
  // Used to rank candidates, never to discard a value (see findAllMatches): a
  // mistyped identifier stays redacted. The only exception is CF_OMOCODE, whose
  // shape alone is too generic and is accepted only when the check letter is right.

  const CF_ODD = {
    0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21,
    A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18,
    N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
  };

  // Italian Codice Fiscale check letter. Works on omocodic codes too (letters in
  // place of digits), because even positions map letters and digits alike.
  function cfOk(value) {
    const c = value.trim().toUpperCase();
    if (!/^[A-Z0-9]{16}$/.test(c)) return false;
    let total = 0;
    for (let i = 0; i < 15; i++) {
      const ch = c[i];
      if (i % 2 === 0) total += CF_ODD[ch];
      else total += /\d/.test(ch) ? Number(ch) : ch.charCodeAt(0) - 65;
    }
    return String.fromCharCode(65 + (total % 26)) === c[15];
  }

  // Italian Partita IVA (11 digits, Luhn-like check digit). An "IT" prefix is ignored.
  function pivaOk(value) {
    const p = value.replace(/\D/g, '');
    if (p.length !== 11) return false;
    let total = 0;
    for (let i = 0; i < 10; i++) {
      const d = Number(p[i]);
      if (i % 2 === 0) total += d;
      else total += d * 2 > 9 ? d * 2 - 9 : d * 2;
    }
    return (10 - (total % 10)) % 10 === Number(p[10]);
  }

  // IBAN mod-97 (ISO 13616). Separators allowed by the patterns are stripped first.
  function ibanOk(value) {
    const s = value.replace(/[\s.\-]/g, '').toUpperCase();
    if (!/^[A-Z0-9]{15,34}$/.test(s)) return false;
    const r = s.slice(4) + s.slice(0, 4);
    let rem = 0;
    for (const ch of r) {
      const digits = /\d/.test(ch) ? ch : String(ch.charCodeAt(0) - 55);
      for (const d of digits) rem = (rem * 10 + Number(d)) % 97;
    }
    return rem === 1;
  }

  // Luhn check for payment cards (13–19 digits).
  function luhnOk(value) {
    const d = value.replace(/\D/g, '');
    if (d.length < 13 || d.length > 19) return false;
    let total = 0;
    let alt = false;
    for (let i = d.length - 1; i >= 0; i--) {
      let n = Number(d[i]);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      total += n;
      alt = !alt;
    }
    return total % 10 === 0;
  }

  // ─── Printed IBAN Scanner ───────────────────────────────────────────────────
  // ISO 13616 length per country. It tells where a grouped IBAN ends: without it a
  // regex either swallows the next word ("BE68 5390 0754 7034 Gent") or stops short
  // and leaves the tail of the IBAN in clear.
  const IBAN_LEN = {};
  ('AD24 AE23 AL28 AT20 AZ28 BA20 BE16 BG22 BH22 BI27 BR29 BY28 CH21 CR22 CY28 CZ24 ' +
   'DE22 DJ27 DK18 DO28 EE20 EG29 ES24 FI18 FK18 FO18 FR27 GB22 GE22 GI23 GL18 GR27 ' +
   'GT28 HN28 HR21 HU28 IE22 IL23 IQ23 IS26 IT27 JO30 KW30 KZ20 LB28 LC32 LI21 LT20 ' +
   'LU20 LV21 LY25 MC27 MD24 ME22 MK19 MN20 MR27 MT31 MU30 NI28 NL18 NO15 OM23 PK24 ' +
   'PL28 PS29 PT25 QA29 RO24 RS22 RU33 SA24 SC31 SD18 SE24 SI19 SK24 SM27 SO23 ST25 ' +
   'SV28 TL23 TN24 TR26 UA29 VA22 VG24 XK20 YE30').split(' ').forEach(c => {
    IBAN_LEN[c.slice(0, 2)] = Number(c.slice(2));
  });
  const IBAN_MAX_SEP = 3;   // consecutive separators (justified PDF text, tables)
  const IBAN_RUN = 5;       // characters per group: longer runs are words, not groups
  const IBAN_REGEX = /\b[A-Za-z]{2}\d{2}(?:[ -][A-Za-z0-9]{4}){2,7}(?:[ -][A-Za-z0-9]{1,4})?\b|\b[A-Za-z]{2}\d{2}[A-Za-z0-9]{11,30}\b/g;

  function isIbanChar(c) { return /^[A-Za-z0-9]$/.test(c); }

  // Returns checksum-valid IBANs, compact or printed in groups separated by spaces,
  // dots, hyphens or one line break. Consumes exactly the length expected for the country.
  function detectIban(text) {
    const found = [];
    const head = /(?<![\p{L}\p{N}])[A-Za-z]{2}\d{2}/gu;
    let m;
    while ((m = head.exec(text)) !== null) {
      const n = IBAN_LEN[m[0].slice(0, 2).toUpperCase()];
      if (!n) continue;
      const start = m.index;
      let i = start, chars = 0, sep = 0, run = 0, breaks = 0, grouped = false;
      while (i < text.length && chars < n) {
        const c = text[i];
        if (isIbanChar(c)) {
          chars++;
          run++;
          sep = 0;
        } else if (sep < IBAN_MAX_SEP && run <= IBAN_RUN && (c === '.' || c === '-' || /\s/.test(c))) {
          sep++;
          run = 0;
          grouped = true;
          if (/\s/.test(c) && c !== ' ' && c !== '\t' && c !== ' ') breaks++;
          if (breaks > 1) break;   // an IBAN wraps once at most; a table column wraps at every cell
        } else {
          break;
        }
        i++;
      }
      if (chars < n || (i < text.length && isIbanChar(text[i]))) continue;   // truncated, or the code goes on
      const span = text.slice(start, i);
      if (grouped) {
        const groups = span.split(/[\s.\-]+/).filter(Boolean);
        const sizes = new Set(groups.slice(0, -1).map(g => g.length));
        if (sizes.size > 1 || groups[groups.length - 1].length > groups[0].length) continue;   // prose, not a printed IBAN
      }
      if (ibanOk(span)) found.push({ start: start, end: i });
    }
    // Two overlapping candidates: one is an artefact of a scan started inside a nearby
    // code. Mask the union, because dropping either one leaves part of the other in clear.
    found.sort((a, b) => a.start - b.start);
    for (let k = 1; k < found.length; k++) {
      const a = found[k - 1], b = found[k];
      if (b.start < a.end) {
        b.end = Math.max(a.end, b.end);
        b.start = a.start;
        a.end = a.start;
      }
    }
    return found.filter(f => f.end > f.start);
  }

  // IBAN candidates: checksum-valid IBANs from the scanner, plus the matches of the
  // older regex that the scanner did not confirm at the same position (countries
  // outside the ISO list, mistyped codes). Those are still redacted, ranked lower.
  function scanIban(text) {
    const valid = detectIban(text);
    const starts = new Set(valid.map(v => v.start));
    const out = valid.map(v => ({ start: v.start, end: v.end, rank: 0 }));
    const re = new RegExp(IBAN_REGEX.source, IBAN_REGEX.flags);
    let m;
    while ((m = re.exec(text)) !== null) {
      if (starts.has(m.index)) continue;
      out.push({ start: m.index, end: m.index + m[0].length, rank: ibanOk(m[0]) ? 0 : 2 });
    }
    return out;
  }

  // URL candidates, without the punctuation that closes the sentence ("see https://x.it/page.").
  const URL_REGEX = /(?:https?|ftp):\/\/[^\s<>"']+|www\.[A-Za-z0-9\-._~%]+\.[A-Za-z]{2,}(?:\/[^\s<>"']*)?|\b(?:[A-Za-z0-9](?:[A-Za-z0-9\-]*[A-Za-z0-9])?\.)+(?:it|com|net|org|eu|info|io|dev|app|gov|edu|cloud|online|site|blog)\b(?:\/[^\s<>"']*)?/gi;
  const URL_TRAIL = '.,;:!?)]}»"\'';

  function scanUrl(text) {
    const out = [];
    const re = new RegExp(URL_REGEX.source, URL_REGEX.flags);
    let m;
    while ((m = re.exec(text)) !== null) {
      let end = m.index + m[0].length;
      while (end > m.index && URL_TRAIL.includes(text[end - 1])) end--;
      if (end > m.index) out.push({ start: m.index, end: end, rank: 1 });
    }
    return out;
  }

  // ─── PII Pattern Definitions ────────────────────────────────────────────────
  // Priority order: longer / more specific patterns first.
  // Prevents shorter numeric patterns from consuming parts of longer matches.
  // Optional fields: `validator` ranks a match on identical spans (a value that passes
  // its checksum wins, one that fails yields); `strict` drops a match that fails it;
  // `scan(text)` replaces `regex` when the end of a match cannot be told by a regex.
  const PII_PATTERNS = [
    {
      type: 'AMEX',
      // CM15 (15 digits), CM13 (13 digits), CM11 (11 digits) starting with 34xx / 37xx.
      // Spaced format: 4-6-N (N = 1, 3 or 5). Separator may be space or hyphen.
      // Unspaced: word-boundary anchors prevent partial matches inside longer digit strings.
      regex: /3[47]\d{2}[\s\-]\d{6}[\s\-]\d{1,5}|\b3[47](?:\d{13}|\d{11}|\d{9})\b/g,
      validator: luhnOk,
      color: '#c0392b'
    },
    {
      type: 'VISA',
      // Visa: 16-digit (most common) or legacy 13-digit, starting with 4.
      // Grouped format: 4-4-4-4 with space or hyphen separator.
      regex: /\b4\d{3}(?:[ -]\d{4}){3}\b|\b4\d{15}\b|\b4\d{12}\b/g,
      validator: luhnOk,
      color: '#1a5276'
    },
    {
      type: 'MASTERCARD',
      // Mastercard: 16 digits. Classic range 51–55xxxx; new range 2221–2720xxxx.
      // Grouped format: 4-4-4-4 with space or hyphen separator.
      regex: /\b5[1-5]\d{2}(?:[ -]\d{4}){3}\b|\b5[1-5]\d{14}\b|\b2[2-7]\d{2}(?:[ -]\d{4}){3}\b|\b2(?:2[2-9]\d|[3-6]\d{2}|7[01]\d|720)\d{12}\b/g,
      validator: luhnOk,
      color: '#922b21'
    },
    {
      type: 'DISCOVER',
      // Discover: 16 digits. Prefixes: 6011, 644–649, 65xx.
      // Grouped format: 4-4-4-4 with space or hyphen separator.
      regex: /\b6(?:011|4[4-9]\d|5\d{2})(?:[ -]\d{4}){3}\b|\b6(?:011|4[4-9]\d|5\d{2})\d{12}\b/g,
      validator: luhnOk,
      color: '#b7950b'
    },
    {
      type: 'JCB',
      // JCB: 16 digits, prefixes 3528–3589. Compact and grouped 4-4-4-4.
      regex: /\b35(?:2[89]|[3-8]\d)(?:[ -]\d{4}){3}\b|\b35(?:2[89]|[3-8]\d)\d{12}\b/g,
      validator: luhnOk,
      color: '#6c3483'
    },
    {
      type: 'DINERS',
      // Diners Club: 14 digits, prefixes 300–305, 36, 38. Compact and grouped 4-6-4.
      regex: /\b3(?:0[0-5]\d|[68]\d{2})[ -]\d{6}[ -]\d{4}\b|\b3(?:0[0-5]\d{11}|[68]\d{12})\b/g,
      validator: luhnOk,
      color: '#1f618d'
    },
    {
      type: 'UNIONPAY',
      // UnionPay: 16–19 digits starting with 62. Compact and grouped 4-4-4-4 (16-digit form).
      regex: /\b62\d{2}(?:[ -]\d{4}){3}\b|\b62\d{14,17}\b/g,
      validator: luhnOk,
      color: '#9c640c'
    },
    // ── Cryptocurrency addresses ───────────────────────────────────────────────
    // Structural matches only, no checksum verification. Solana and other plain
    // base58 formats without a fixed prefix are intentionally omitted: they would
    // match too many random alphanumeric tokens.
    {
      type: 'CRYPTO_XMR',
      // Monero: 95 chars, standard address (4…) or subaddress (8…).
      regex: /\b[48][0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/g,
      color: '#af601a'
    },
    {
      type: 'CRYPTO_ETH',
      // Ethereum and every EVM chain (BSC, Polygon, Arbitrum…): 0x + 40 hex chars.
      regex: /\b0x[a-fA-F0-9]{40}\b/g,
      color: '#5d6d7e'
    },
    {
      type: 'CRYPTO_BTC',
      // Bitcoin: bech32 segwit/taproot (bc1…) or legacy/P2SH base58 (1…/3…).
      // The lookahead requires at least one letter in the base58 form so that long
      // digit-only runs starting with 1 or 3 are left to PCN instead.
      regex: /\bbc1[a-z0-9]{25,87}\b|\b[13](?=[1-9A-HJ-NP-Za-km-z]*[A-HJ-NP-Za-km-z])[1-9A-HJ-NP-Za-km-z]{25,34}\b/g,
      color: '#ca6f1e'
    },
    {
      type: 'CRYPTO_LTC',
      // Litecoin: bech32 (ltc1…) or base58 starting with L or M.
      regex: /\bltc1[a-z0-9]{25,87}\b|\b[LM][1-9A-HJ-NP-Za-km-z]{26,33}\b/g,
      color: '#839192'
    },
    {
      type: 'CRYPTO_TRX',
      // Tron: base58, 34 chars starting with T.
      regex: /\bT[1-9A-HJ-NP-Za-km-z]{33}\b/g,
      color: '#a93226'
    },
    {
      type: 'CRYPTO_XRP',
      // Ripple: base58, 25–35 chars starting with lowercase r. Kept last in the
      // crypto block: a long lowercase word without l/o could theoretically match.
      regex: /\br[1-9A-HJ-NP-Za-km-z]{24,34}\b/g,
      color: '#21618c'
    },
    {
      type: 'CF',
      // Italian Codice Fiscale: 6 letters + 2 digits + 1 letter + 2 digits + 1 letter + 3 digits + 1 letter (16 chars total).
      regex: /\b[A-Za-z]{6}\d{2}[A-Za-z]\d{2}[A-Za-z]\d{3}[A-Za-z]\b/g,
      validator: cfOk,
      color: '#27ae60'
    },
    {
      type: 'CF',
      // Omocodic Codice Fiscale: when two people would share a code, the Agenzia delle
      // Entrate replaces digits from the right with letters (0→L 1→M 2→N 3→P 4→Q 5→R
      // 6→S 7→T 8→U 9→V), so the form above misses it. The shape alone is too generic
      // here (seven positions accept letters), hence strict: the check letter must be right.
      // On a canonical code both entries match the same span and the first one is kept.
      regex: /\b[A-Za-z]{6}[\dLMNPQRSTUVlmnpqrstuv]{2}[A-Za-z][\dLMNPQRSTUVlmnpqrstuv]{2}[A-Za-z][\dLMNPQRSTUVlmnpqrstuv]{3}[A-Za-z]\b/g,
      validator: cfOk,
      strict: true,
      color: '#27ae60'
    },
    // ── National identity / social security numbers ────────────────────────────
    // Only formats with a distinctive structure (letters, separators, embedded
    // dates) are listed. Plain digit-only IDs (NL BSN, DE Steuer-ID, PL PESEL,
    // HR OIB, UK NHS…) are indistinguishable from generic numbers: they are left
    // to VAT_IT / SE10 / PCN or to user-defined custom patterns.
    {
      type: 'SSN_US',
      // US Social Security Number, dashed form only (an unformatted 9-digit run is too generic).
      regex: /\b\d{3}-\d{2}-\d{4}\b/g,
      color: '#7d3c98'
    },
    {
      type: 'NINO_UK',
      // UK National Insurance number: two letters (restricted alphabet), six digits,
      // suffix A–D. Compact (QQ123456C) or spaced (QQ 12 34 56 C).
      regex: /\b[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z] ?\d{2} ?\d{2} ?\d{2} ?[A-D]\b/g,
      color: '#117864'
    },
    {
      type: 'DNI_ES',
      // Spain DNI (8 digits) and NIE (X/Y/Z + 7 digits) with the real check-letter alphabet.
      regex: /\b(?:\d{8}|[XYZ]\d{7})[TRWAGMYFPDXBNJZSQVHLCKE]\b/g,
      color: '#b03a2e'
    },
    {
      type: 'NIR_FR',
      // France NIR (n° de sécurité sociale): 15 digits — sex, YY, MM, department
      // (incl. Corsica 2A/2B), commune, order, key. Compact or INSEE-spaced
      // (1 85 05 78 006 084 36).
      regex: /\b[12] ?\d{2} ?(?:0[1-9]|1[0-2]) ?(?:\d{2}|2[AB]) ?\d{3} ?\d{3} ?\d{2}\b/g,
      color: '#4a235a'
    },
    {
      type: 'AVS_CH',
      // Switzerland AVS/AHV (post-2008): fixed 756 prefix, 13 digits, optional dots.
      regex: /\b756\.?\d{4}\.?\d{4}\.?\d{2}\b/g,
      color: '#6e2c00'
    },
    {
      type: 'CNP_RO',
      // Romania CNP: 13 digits — sex/century digit, YYMMDD birth date, county, sequence.
      regex: /\b[1-8]\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{6}\b/g,
      color: '#633974'
    },
    {
      type: 'HETU_FI',
      // Finland HETU: DDMMYY + century sign (- + A) + 3-digit sequence + check character.
      regex: /\b(?:0[1-9]|[12]\d|3[01])(?:0[1-9]|1[0-2])\d{2}[-+A]\d{3}[0-9A-Y]\b/g,
      color: '#1b4f72'
    },
    {
      type: 'ID_NORDIC',
      // Sweden personnummer / Denmark CPR / Norway fødselsnummer in separated form:
      // 6-digit date + '-' or '+' + 4 digits. The internal date order differs per
      // country, so no date validation is applied (false positives possible on
      // numeric ranges shaped like 123456-7890). HETU_FI is listed first and wins
      // ties on identical spans.
      regex: /\b\d{6}[-+]\d{4}\b/g,
      color: '#148f77'
    },
    {
      type: 'RC_CZSK',
      // Czech/Slovak rodné číslo with slash: YYMMDD/SSS(S); month may be shifted
      // +50 for women (and +20 in some years), hence the loose third digit.
      regex: /\b\d{2}[0156]\d(?:0[1-9]|[12]\d|3[01])\/\d{3,4}\b/g,
      color: '#78281f'
    },
    {
      type: 'NN_BE',
      // Belgium national number in dotted form: YY.MM.DD-SSS.CC.
      regex: /\b\d{2}\.(?:0[1-9]|1[0-2])\.(?:0[1-9]|[12]\d|3[01])-\d{3}\.\d{2}\b/g,
      color: '#5b2c6f'
    },
    // ── VAT / Fiscal Codes by country ──────────────────────────────────────────
    // Each entry is tagged [VAT_XX_N] where XX = ISO 3166-1 alpha-2 country code.
    // Patterns with country prefix (e.g. DE123456789) are placed before plain-digit
    // patterns to win overlap resolution. VAT_IT also catches the unadorned 11-digit
    // Italian Partita IVA for backward compatibility.
    // Note: Montenegro (PIB) and Turkey (VKN) are pure 10/8-digit numbers indistinguishable
    // from SE10 / other codes without prefix — they are caught by SE10 and not listed here.
    { type: 'VAT_IT', regex: /\b[Ii][Tt]\d{11}\b|\b\d{7}(?:0[0-9]{2}|1[01][0-9]|12[01])\d\b/g, validator: pivaOk, color: '#16a085' }, // Italy: EU VAT (IT prefix) or plain 11-digit P.IVA (office code 001-121); a failed check digit yields identical spans to other types (e.g. a UK mobile)
    { type: 'VAT_AL', regex: /\b[A-Za-z]\d{8}[A-Za-z]\b/g,                color: '#c0392b' }, // Albania NIPT: letter + 8 digits + letter. Ambiguous by design: any letter-8digits-letter token matches (false positives on serials / reference codes)
    { type: 'VAT_AT', regex: /\bATU\d{8}\b/g,                              color: '#2980b9' }, // Austria
    { type: 'VAT_BE', regex: /\bBE0?\d{9,10}\b/g,                          color: '#8e44ad' }, // Belgium
    { type: 'VAT_BG', regex: /\bBG\d{9,10}\b/g,                            color: '#27ae60' }, // Bulgaria
    { type: 'VAT_CY', regex: /\bCY\d{8}[A-Za-z]\b/g,                      color: '#d35400' }, // Cyprus
    { type: 'VAT_CZ', regex: /\bCZ\d{8,10}\b/g,                            color: '#7f8c8d' }, // Czech Republic
    { type: 'VAT_DE', regex: /\bDE\d{9}\b/g,                               color: '#2c3e50' }, // Germany
    { type: 'VAT_DK', regex: /\bDK\d{8}\b/g,                               color: '#e74c3c' }, // Denmark
    { type: 'VAT_EE', regex: /\bEE\d{9}\b/g,                               color: '#1abc9c' }, // Estonia
    { type: 'VAT_ES', regex: /\bES[A-Za-z0-9]\d{7}[A-Za-z0-9]\b/g,        color: '#f39c12' }, // Spain
    { type: 'VAT_FI', regex: /\bFI\d{8}\b/g,                               color: '#3498db' }, // Finland
    { type: 'VAT_FR', regex: /\bFR[A-Za-z0-9]{2}\d{9}\b/g,                color: '#9b59b6' }, // France
    { type: 'VAT_GB', regex: /\bGB(?:\d{9}|\d{12}|GD\d{3}|HA\d{3})\b/g,  color: '#1a252f' }, // United Kingdom
    { type: 'VAT_GR', regex: /\b(?:EL|GR)\d{9}\b/g,                       color: '#2980b9' }, // Greece (uses EL prefix in VAT)
    { type: 'VAT_HR', regex: /\bHR\d{11}\b/g,                              color: '#c0392b' }, // Croatia
    { type: 'VAT_HU', regex: /\bHU\d{8}\b/g,                               color: '#e67e22' }, // Hungary
    { type: 'VAT_IE', regex: /\bIE\d[A-Za-z0-9+*]\d{5}[A-Za-z]{1,2}\b/g, color: '#27ae60' }, // Ireland
    { type: 'VAT_LT', regex: /\bLT(?:\d{9}|\d{12})\b/g,                   color: '#16a085' }, // Lithuania
    { type: 'VAT_LU', regex: /\bLU\d{8}\b/g,                               color: '#f1c40f' }, // Luxembourg
    { type: 'VAT_LV', regex: /\bLV\d{11}\b/g,                              color: '#8e44ad' }, // Latvia
    { type: 'VAT_MT', regex: /\bMT\d{8}\b/g,                               color: '#e74c3c' }, // Malta
    { type: 'VAT_NL', regex: /\bNL\d{9}B\d{2}\b/g,                        color: '#e67e22' }, // Netherlands
    { type: 'VAT_PL', regex: /\bPL\d{10}\b/g,                              color: '#c0392b' }, // Poland
    { type: 'VAT_PT', regex: /\bPT\d{9}\b/g,                               color: '#27ae60' }, // Portugal
    { type: 'VAT_RO', regex: /\bRO\d{2,10}\b/g,                            color: '#d35400' }, // Romania
    { type: 'VAT_SE', regex: /\bSE\d{12}\b/g,                              color: '#2980b9' }, // Sweden
    { type: 'VAT_SI', regex: /\bSI\d{8}\b/g,                               color: '#1abc9c' }, // Slovenia
    { type: 'VAT_SK', regex: /\bSK\d{10}\b/g,                              color: '#7f8c8d' }, // Slovakia
    { type: 'VAT_US', regex: /\b\d{2}-\d{7}\b/g,                           color: '#2c3e50' }, // USA EIN. No prefix exists in the wild: any NN-NNNNNNN token matches (false positives on dates/IDs); accepted to avoid missing real EINs
    {
      type: 'EMAIL',
      // Standard RFC-compliant email address.
      regex: /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g,
      color: '#2980b9'
    },
    {
      type: 'URL',
      // Three forms, from the safest to the riskiest: with a scheme (http/https/ftp),
      // www.<domain>, and a bare domain ONLY with a TLD from a closed list. A generic
      // bare domain would catch "p.iva", "n.ro", "S.r.l."; the price of the closed list
      // is that a domain with an unlisted TLD stays in clear. Listed after EMAIL: the
      // domain of an address is covered by the earlier EMAIL match.
      scan: scanUrl,
      color: '#2e86c1'
    },
    {
      type: 'IBAN',
      // International Bank Account Number: 2-letter country code + 2 check digits + BBAN (11–30 alphanumeric chars).
      // The scanner (detectIban) finds checksum-valid IBANs, compact or printed in groups
      // separated by spaces, dots, hyphens or one line break, and stops at the length
      // expected for the country. The older regex (IBAN_REGEX) still runs for the rest:
      // compact, spaced or hyphenated, upper or lower case, any country, no checksum.
      // Placed before PCN so alphanumeric IBANs are not partially consumed by digit-only patterns.
      // Lowercase compact matching can rarely hit hex-like tokens that start with two letters + two digits.
      scan: scanIban,
      color: '#1e8449'
    },
    // ── Phone numbers ──────────────────────────────────────────────────────────
    // Country-specific patterns first, generic PHONE_INTL last: on an identical
    // span the earlier entry wins (stable sort), so a +39/+49/+33/+44 number keeps
    // its country type instead of falling through to the generic one. The whole
    // block stays before PCN and SE10 so mobile numbers are not consumed by the
    // generic digit patterns, and after VAT_*: an 11-digit token starting 07 whose
    // digits 8-10 happen to form a valid P.IVA office code (001-121) is claimed by
    // VAT_IT rather than PHONE_UK_MOBILE — rare, and the value is redacted either way.
    {
      type: 'PHONE_IT_MOBILE',
      // Italian mobile numbers: all active prefixes 32x–39x (10 digits total).
      // Optional country code: +39 / 0039 / (+39) / (0039), with optional space, dot or hyphen separator.
      // Handles compact (3351234567), grouped (335 123 4567, 335.123.4567, 335-123-4567)
      // and prefixed (+39 335 123 4567) formats.
      regex: /(?<!\d)(?:(?:\((?:00|\+)39\)|(?:00|\+)39)[ .\-]?)?3[2-9]\d[ .\-]?\d{3}[ .\-]?\d{4}(?!\d)/g,
      color: '#117a65'
    },
    {
      type: 'PHONE_DE_MOBILE',
      // German mobile numbers: prefixes 015x/016x/017x + 7-8 digits, national form
      // with leading 0 (0151 12345678) or with +49 / 0049 country code replacing it.
      regex: /(?<!\d)(?:(?:\((?:00|\+)49\)|(?:00|\+)49)[ -]?1[5-7]\d|01[5-7]\d)[ -]?\d{7,8}(?!\d)/g,
      color: '#0e6251'
    },
    {
      type: 'PHONE_FR_MOBILE',
      // French mobile numbers: 06/07 + 8 digits in pairs (06 12 34 56 78, dots or
      // hyphens too), compact, or with +33 / 0033 country code replacing the 0.
      regex: /(?<!\d)(?:(?:\((?:00|\+)33\)|(?:00|\+)33)[ -]?[67]|0[67])(?:[ .\-]?\d{2}){4}(?!\d)/g,
      color: '#0b5345'
    },
    {
      type: 'PHONE_UK_MOBILE',
      // UK mobile numbers: 07xxx xxxxxx (11 digits), compact or spaced, or with
      // +44 / 0044 country code replacing the leading 0.
      regex: /(?<!\d)(?:(?:\((?:00|\+)44\)|(?:00|\+)44)[ -]?7\d{3}|07\d{3})[ -]?\d{6}(?!\d)/g,
      color: '#145a32'
    },
    {
      type: 'PHONE_INTL',
      // Generic international number, catch-all for countries without a dedicated
      // pattern. Requires an explicit prefix: '+CC' followed by 6-12 digits (compact
      // or separated, optional parenthesised area code), or '00CC' followed by a
      // separator — the 00-compact form (0031612345678) is intentionally NOT matched:
      // it is indistinguishable from zero-padded numeric IDs common in CSV exports.
      regex: /(?<!\d)\+[1-9]\d{0,2}(?:[ .\-]?\(\d{1,4}\))?(?:[ .\-]?\d){6,12}(?!\d)|(?<!\d)00[1-9]\d{0,2}[ .\-]\(?\d{1,4}\)?(?:[ .\-]?\d){2,11}(?!\d)/g,
      color: '#7e5109'
    },
    {
      type: 'IPADDR',
      // IPv4: four octets 0-255, optional CIDR suffix (/0-32) or range (a.b.c.d-e.f.g.h).
      // The octet constraint keeps out most software versions ("2.3.55.987"); a version
      // whose parts are all 255 or lower ("1.2.3.4") cannot be told apart from an address.
      regex: /\b(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}(?:\/(?:3[0-2]|[12]?\d))?(?:\s*-\s*(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})?\b/g,
      color: '#566573'
    },
    {
      type: 'AMOUNT',
      // Money amount with a euro marker before or after: "€ 12.500,00", "EUR 1,000.00",
      // "1.234 €", "100 euro". Italian and English grouping are both accepted, so the
      // whole figure is covered whichever convention the document uses. A plain space
      // is not a thousands separator (only the no-break and thin spaces are): with it the
      // amount took the first digits of the number that follows ("€ 50 335 123 4567"),
      // and a long run of "123 " made the suffix form quadratic. The lookbehind keeps the
      // suffix form from starting inside a figure grouped with no-break or thin spaces.
      regex: /(?:€|\bEUR\b|\beuro\b)[  ]?\d+(?:[.,  ]\d{3})*(?:[.,]\d{1,2})?(?!\d)|(?<![\d.,]|\d[  ])\d+(?:[.,  ]\d{3})*(?:[.,]\d{1,2})?[  ]?(?:€|EUR\b|euros?\b)/gi,
      color: '#7d6608'
    },
    {
      type: 'DOCID',
      // Italian act reference, always written after its abbreviation: "R.G. 1234/2024",
      // "Prot. n. 456/2024", "Rep. 45". The abbreviation is what makes the number
      // recognisable (a bare "1234/2024" is a fraction or an article), so it is required
      // and included in the span. The "n." between abbreviation and number is optional.
      // Case-sensitive, with lowercase forms only when they end with a dot or are the full
      // word ("prot.", "protocollo"): "rep" and "rg" are also ordinary words. Spaces only,
      // never a line break, between the parts.
      regex: /\b(?:R\.?G\.?[  ]*N\.?R\.?|R\.?G\.?|RG|Prot\.?|prot\.|[Pp]rotocollo|Rep\.?|rep\.|[Rr]epertorio)(?:[  ]*(?:[nN]\.?|num\.?|nro\.?))?[  ]*\d{1,8}(?:[\/\-]\d{2,4})?\b/g,
      color: '#6e2f1a'
    },
    {
      type: 'TARGA',
      // Italian vehicle plate (since 1994): two letters, three digits, two letters,
      // compact or separated by a space or hyphen (AB 123 CD, AB-123-CD). Uppercase only
      // and without I, O, Q, U, the letters plates never use: in lowercase or with every
      // letter allowed, English text like "to 100 km" would match.
      regex: /\b[A-HJ-NPR-TV-Z]{2}[ -]?\d{3}[ -]?[A-HJ-NPR-TV-Z]{2}\b/g,
      color: '#1f3a93'
    },
    {
      type: 'PCN',
      // PCN (Prescription Control Number / codice pratica): any numeric code of 17 or more digits.
      // Placed before SE10 so longer matches win overlap resolution.
      regex: /\b\d{17,}\b/g,
      color: '#e67e22'
    },
    {
      type: 'SE10',
      // SE10 merchant code: exactly 10 consecutive digits.
      // Word boundaries prevent matching inside longer digit sequences.
      // Note: Montenegro PIB (8 digits) and Turkey VKN (10 digits) share this pattern.
      regex: /\b\d{10}\b/g,
      color: '#8e44ad'
    },
    {
      type: 'PHONE_IT_LANDLINE',
      // Italian landline: area code 0[1-9] plus up to two digits, a separator (space,
      // dot, hyphen or slash), then 5-8 digits: "06 1234567", "010-2471234", "02/12345678".
      // The separator is required: compact landlines of 10 digits are already SE10, and
      // without it every number starting with 0 would match (zero-padded IDs in CSVs).
      // Listed last so that existing types keep identical spans: "06 12345678" stays
      // PHONE_FR_MOBILE, a number with +39 stays PHONE_INTL.
      regex: /(?<![\w.,\/\-])0[1-9]\d{0,2}[ .\-\/]\d{5,8}(?!\d)/g,
      color: '#0e6655'
    }
  ];

  // ─── Session State ──────────────────────────────────────────────────────────
  const session = {
    forward: new Map(),    // original value  →  placeholder
    reverse: new Map(),    // placeholder     →  original value
    counters: {},          // dynamically populated: type → highest counter used
    redactedCsvBlob: null,
    restoredCsvBlob: null
  };

  // ─── Core Logic ─────────────────────────────────────────────────────────────

  function getOrCreatePlaceholder(type, value) {
    if (session.forward.has(value)) {
      return session.forward.get(value);
    }
    if (!(type in session.counters)) session.counters[type] = 0;
    session.counters[type]++;
    const placeholder = '[' + type + '_' + session.counters[type] + ']';
    session.forward.set(value, placeholder);
    session.reverse.set(placeholder, value);
    return placeholder;
  }

  function findAllMatches(text) {
    const matches = [];
    for (const pattern of PII_PATTERNS) {
      if (pattern.scan) {
        for (const s of pattern.scan(text)) {
          matches.push({ start: s.start, end: s.end, value: text.slice(s.start, s.end), type: pattern.type, rank: s.rank });
        }
        continue;
      }
      // Re-create the RegExp to reset lastIndex for each call
      const re = new RegExp(pattern.regex.source, pattern.regex.flags);
      let m;
      while ((m = re.exec(text)) !== null) {
        if (m[0].length === 0) { re.lastIndex++; continue; }   // a custom pattern that can match empty
        // rank: 0 = checksum passed, 1 = no checksum for this type, 2 = checksum failed.
        let rank = 1;
        if (pattern.validator) {
          rank = pattern.validator(m[0]) ? 0 : 2;
          if (rank === 2 && pattern.strict) continue;
        }
        matches.push({ start: m.index, end: m.index + m[0].length, value: m[0], type: pattern.type, rank: rank });
      }
    }
    // Sort by start position ascending; ties resolved by preferring the longer (earlier-ending) match.
    // On an identical span the rank decides: a value that passes its checksum beats one with no
    // checksum, which beats one that fails it. The rank never beats position or length, so a
    // failed checksum cannot leave part of a value in clear: it only gives the span to another type.
    // Array.prototype.sort is stable in modern engines, so insertion order is preserved for equal keys.
    // Custom patterns are appended after built-ins, so on an identical span the built-in wins
    // silently, unless the built-in fails its checksum.
    matches.sort((a, b) => a.start - b.start || b.end - a.end || a.rank - b.rank);
    // Remove overlapping matches: leftmost wins; advance cursor past each kept match.
    // A match that starts inside the kept one but ends after it extends the kept one to
    // its end: dropping it would leave its tail in clear (e.g. "€ 50 335 123 4567", where
    // AMOUNT takes "€ 50 335" and the mobile number goes on). The union keeps the type
    // of the leftmost match and covers every character any pattern matched.
    const kept = [];
    let cursor = 0;
    for (const m of matches) {
      if (m.start >= cursor) {
        kept.push(m);
        cursor = m.end;
      } else if (m.end > cursor) {
        const last = kept[kept.length - 1];
        last.end = m.end;
        last.value = text.slice(last.start, last.end);
        cursor = m.end;
      }
    }
    return kept;
  }

  function censorText(text) {
    const matches = findAllMatches(text);
    if (matches.length === 0) return text;
    // Assign placeholders left-to-right so numbering follows reading order ([X_1] is
    // the first occurrence in the text), then replace right-to-left so earlier index
    // positions remain valid after each substitution.
    for (const m of matches) {
      m.placeholder = getOrCreatePlaceholder(m.type, m.value);
    }
    let result = text;
    for (let i = matches.length - 1; i >= 0; i--) {
      const { start, end, placeholder } = matches[i];
      result = result.slice(0, start) + placeholder + result.slice(end);
    }
    return result;
  }

  // Tolerant restore. AI models often rewrite placeholders: they drop the brackets
  // (CF_1), pad them ([ CF_1 ]) or wrap them in markdown (**[CF_1]**). Each placeholder
  // is matched in two forms: bracketed, with optional spaces inside, or bare, with a
  // word boundary on both sides. The boundary is Unicode-aware (JavaScript \b is ASCII
  // only, so "CF_1è" would not see one) and keeps an index invented by the model
  // unresolved: with only CF_1 in the map, [CF_12] and CF_12 stay as they are, because
  // a placeholder left visible is noticed and a wrong value is not.
  // A single pass over the original text: a restored value that happens to contain the
  // name of another placeholder is never replaced again. Markdown around the
  // placeholder is kept, so **[CF_1]** becomes **value**.
  // The regex does not list the placeholders (one alternative per entry made a 10,000-entry
  // map take seconds): it finds any bracketed text and any whole word, and looks the name
  // up in the map. Only imported names with characters outside letters, digits and '_'
  // (e.g. MY-TYPE_1) are listed, because a whole word cannot contain them.
  const WORD_NAME = /^[\p{L}\p{N}_]+$/u;

  function restoreText(text) {
    if (session.reverse.size === 0) return text;
    const byInner = new Map();
    const odd = [];
    for (const [placeholder, original] of session.reverse) {
      const inner = placeholder.slice(1, -1);
      byInner.set(inner, original);
      if (!WORD_NAME.test(inner)) {
        // No escape for '-' or '/': under the 'u' flag an unneeded escape is a syntax error.
        const esc = inner.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        odd.push('(?<![\\p{L}\\p{N}_])' + esc + '(?![\\p{L}\\p{N}_])');
      }
    }
    const pattern = new RegExp(
      '\\[([^\\[\\]]*)\\]|' + (odd.length ? odd.join('|') + '|' : '') +
      '(?<![\\p{L}\\p{N}_])[\\p{L}\\p{N}_]+(?![\\p{L}\\p{N}_])', 'gu');
    return text.replace(pattern, (match, bracketed) => {
      if (bracketed !== undefined) {
        // The exact name first (an imported "[ CF_1]" keeps its space), then trimmed.
        if (byInner.has(bracketed)) return byInner.get(bracketed);
        const trimmed = bracketed.trim();
        return byInner.has(trimmed) ? byInner.get(trimmed) : match;
      }
      return byInner.has(match) ? byInner.get(match) : match;
    });
  }

  // ─── CSV Parser — RFC 4180 ──────────────────────────────────────────────────

  function parseCSV(text) {
    const rows = [];
    let i = 0;
    const len = text.length;
    while (i < len) {
      const row = [];
      while (i < len && text[i] !== '\n' && text[i] !== '\r') {
        if (text[i] === '"') {
          i++;
          let field = '';
          while (i < len) {
            if (text[i] === '"') {
              if (i + 1 < len && text[i + 1] === '"') {
                field += '"';
                i += 2;
              } else {
                i++;
                break;
              }
            } else {
              field += text[i++];
            }
          }
          row.push(field);
          if (i < len && text[i] === ',') i++;
        } else {
          const start = i;
          while (i < len && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') i++;
          row.push(text.slice(start, i));
          if (i < len && text[i] === ',') i++;
        }
      }
      if (row.length > 0) rows.push(row);
      if (i < len && text[i] === '\r') i++;
      if (i < len && text[i] === '\n') i++;
    }
    return rows;
  }

  function serializeCSV(rows) {
    return rows.map(row =>
      row.map(field => {
        if (field.includes(',') || field.includes('"') || field.includes('\n') || field.includes('\r')) {
          return '"' + field.replace(/"/g, '""') + '"';
        }
        return field;
      }).join(',')
    ).join('\r\n');
  }

  function censorCSV(csvText) {
    const rows = parseCSV(csvText);
    let totalRedactions = 0;
    const redacted = rows.map(row =>
      row.map(cell => {
        const censored = censorText(cell);
        if (censored !== cell) totalRedactions++;
        return censored;
      })
    );
    return { rows: redacted, totalRedactions, totalRows: rows.length };
  }

  // ─── UI Helpers ─────────────────────────────────────────────────────────────

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function updateMapTable() {
    const tbody = document.getElementById('map-tbody');
    const table = document.getElementById('map-table');
    const empty = document.getElementById('map-empty');
    tbody.innerHTML = '';
    // The Clear buttons are blue (.text-active) only while a map is active.
    const mapActive = session.reverse.size > 0;
    ['btn-clear-session', 'btn-clear-session-top'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.toggle('text-active', mapActive);
    });
    if (session.reverse.size === 0) {
      table.style.display = 'none';
      empty.style.display = '';
      return;
    }
    empty.style.display = 'none';
    table.style.display = '';

    const entries = Array.from(session.reverse.entries()).map(([placeholder, original]) => {
      const typeMatch = placeholder.match(/^\[(.+)_(\d+)\]$/);
      const type = typeMatch ? typeMatch[1] : 'UNK';
      const num = typeMatch ? parseInt(typeMatch[2], 10) : 0;
      return { placeholder, original, type, num };
    });

    // Groups follow the PII_PATTERNS order (cards, CF, VAT, email, IBAN, phone, PCN,
    // SE10, then custom patterns) so related types sit together; alphabetical fallback
    // covers types that no longer have a pattern (e.g. imported from a removed custom).
    const typeOrder = new Map(PII_PATTERNS.map((p, i) => [p.type, i]));
    entries.sort((a, b) => {
      const oa = typeOrder.has(a.type) ? typeOrder.get(a.type) : PII_PATTERNS.length;
      const ob = typeOrder.has(b.type) ? typeOrder.get(b.type) : PII_PATTERNS.length;
      if (oa !== ob) return oa - ob;
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return a.num - b.num;
    });

    // Rows are built with createElement/textContent (never innerHTML) so PII values
    // and type names can never be interpreted as markup, regardless of their content.
    let lastType = null;
    for (const entry of entries) {
      const patternDef = PII_PATTERNS.find(p => p.type === entry.type);
      const color = patternDef ? patternDef.color : '#666';
      if (entry.type !== lastType) {
        lastType = entry.type;
        const headerTr = document.createElement('tr');
        const headerTd = document.createElement('td');
        headerTd.colSpan = 3;
        headerTd.style.cssText = 'background:' + color + '1a;padding:0.4rem 0.75rem;font-weight:600;font-size:0.85rem;border-bottom:2px solid ' + color + ';';
        const badge = document.createElement('span');
        badge.className = 'pii-badge';
        badge.style.background = color;
        badge.textContent = entry.type;
        const countSpan = document.createElement('span');
        countSpan.style.cssText = 'color:#666;font-weight:400;';
        countSpan.textContent = ' (' + entries.filter(e => e.type === entry.type).length + ')';
        headerTd.appendChild(badge);
        headerTd.appendChild(countSpan);
        headerTr.appendChild(headerTd);
        tbody.appendChild(headerTr);
      }
      const tr = document.createElement('tr');
      const tdPlaceholder = document.createElement('td');
      tdPlaceholder.textContent = entry.placeholder;
      const tdType = document.createElement('td');
      tdType.className = 'td-badge';
      const typeBadge = document.createElement('span');
      typeBadge.className = 'pii-badge';
      typeBadge.style.background = color;
      typeBadge.textContent = entry.type;
      tdType.appendChild(typeBadge);
      const tdOriginal = document.createElement('td');
      tdOriginal.textContent = entry.original;
      tr.appendChild(tdPlaceholder);
      tr.appendChild(tdType);
      tr.appendChild(tdOriginal);
      tbody.appendChild(tr);
    }
  }

  function showCopyFeedback(btn, msg) {
    const orig = btn.textContent;
    btn.textContent = msg || 'Copied!';
    setTimeout(() => { btn.textContent = orig; }, 1500);
  }

  function copyToClipboard(text, btn) {
    // navigator.clipboard is undefined on plain HTTP and file:// in some browsers,
    // and writeText rejects when the user denies the clipboard permission.
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      showCopyFeedback(btn, 'Copy failed');
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => showCopyFeedback(btn),
      () => showCopyFeedback(btn, 'Copy failed')
    );
  }

  // ─── Mode Toggle ─────────────────────────────────────────────────────────────

  document.getElementById('btn-mode-text').addEventListener('click', () => {
    document.getElementById('panel-text').style.display = '';
    document.getElementById('panel-csv').style.display = 'none';
    document.getElementById('btn-mode-text').classList.add('text-active');
    document.getElementById('btn-mode-csv').classList.remove('text-active');
  });

  document.getElementById('btn-mode-csv').addEventListener('click', () => {
    document.getElementById('panel-csv').style.display = '';
    document.getElementById('panel-text').style.display = 'none';
    document.getElementById('btn-mode-csv').classList.add('text-active');
    document.getElementById('btn-mode-text').classList.remove('text-active');
  });

  // ─── Censor Text ─────────────────────────────────────────────────────────────

  document.getElementById('btn-censor-text').addEventListener('click', () => {
    const input = document.getElementById('input-text').value;
    if (!input.trim()) return;
    const warn = checkInputSize(input, 'text');
    if (warn && !confirm(warn + '\n\nProceed anyway?')) return;
    const censored = censorText(input);
    document.getElementById('output-text').value = censored;
    document.getElementById('output-text-wrap').style.display = '';
    updateMapTable();
  });

  document.getElementById('btn-copy-text').addEventListener('click', function () {
    copyToClipboard(document.getElementById('output-text').value, this);
  });

  // ─── Censor CSV ──────────────────────────────────────────────────────────────

  document.getElementById('btn-censor-csv').addEventListener('click', () => {
    const file = document.getElementById('input-csv').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const warn = checkInputSize(e.target.result, 'csv');
      if (warn && !confirm(warn + '\n\nProceed anyway?')) return;
      const { rows, totalRedactions, totalRows } = censorCSV(e.target.result);
      const csvContent = serializeCSV(rows);
      // BOM prefix ensures correct UTF-8 rendering when opened in Excel
      session.redactedCsvBlob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      document.getElementById('csv-stats').textContent =
        'Processed ' + totalRows + ' rows \u2014 ' + totalRedactions + ' cell(s) redacted.';
      document.getElementById('output-csv-wrap').style.display = '';
      updateMapTable();
    };
    reader.onerror = () => { alert('Failed to read file.'); };
    reader.readAsText(file, 'UTF-8');
  });

  document.getElementById('btn-download-csv').addEventListener('click', () => {
    if (!session.redactedCsvBlob) return;
    const url = URL.createObjectURL(session.redactedCsvBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'redacted.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // ─── Restore — Mode Toggle ────────────────────────────────────────────────────

  document.getElementById('btn-restore-mode-text').addEventListener('click', () => {
    document.getElementById('restore-panel-text').style.display = '';
    document.getElementById('restore-panel-csv').style.display = 'none';
    document.getElementById('btn-restore-mode-text').classList.add('text-active');
    document.getElementById('btn-restore-mode-csv').classList.remove('text-active');
  });

  document.getElementById('btn-restore-mode-csv').addEventListener('click', () => {
    document.getElementById('restore-panel-csv').style.display = '';
    document.getElementById('restore-panel-text').style.display = 'none';
    document.getElementById('btn-restore-mode-csv').classList.add('text-active');
    document.getElementById('btn-restore-mode-text').classList.remove('text-active');
  });

  // ─── Restore — Text ───────────────────────────────────────────────────────────

  document.getElementById('btn-restore').addEventListener('click', () => {
    const input = document.getElementById('input-restore').value;
    if (!input.trim()) return;
    const restored = restoreText(input);
    document.getElementById('output-restore').value = restored;
    document.getElementById('output-restore-wrap').style.display = '';
  });

  document.getElementById('btn-copy-restore').addEventListener('click', function () {
    copyToClipboard(document.getElementById('output-restore').value, this);
  });

  // ─── Restore — CSV ────────────────────────────────────────────────────────────

  document.getElementById('btn-restore-csv').addEventListener('click', () => {
    const file = document.getElementById('input-restore-csv').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const warn = checkInputSize(e.target.result, 'csv');
      if (warn && !confirm(warn + '\n\nProceed anyway?')) return;
      const rows = parseCSV(e.target.result);
      let totalRestored = 0;
      const restored = rows.map(row =>
        row.map(cell => {
          const r = restoreText(cell);
          if (r !== cell) totalRestored++;
          return r;
        })
      );
      const csvContent = serializeCSV(restored);
      session.restoredCsvBlob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      document.getElementById('restore-csv-stats').textContent =
        'Processed ' + rows.length + ' rows \u2014 ' + totalRestored + ' cell(s) restored.';
      document.getElementById('output-restore-csv-wrap').style.display = '';
    };
    reader.onerror = () => { alert('Failed to read file.'); };
    reader.readAsText(file, 'UTF-8');
  });

  document.getElementById('btn-download-restore-csv').addEventListener('click', () => {
    if (!session.restoredCsvBlob) return;
    const url = URL.createObjectURL(session.restoredCsvBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'restored.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // ─── Copy Map ────────────────────────────────────────────────────────────────

  function exportMapAsJson() {
    return JSON.stringify(Object.fromEntries(session.reverse), null, 2);
  }

  document.getElementById('btn-copy-map').addEventListener('click', function () {
    if (session.reverse.size === 0) return;
    copyToClipboard(exportMapAsJson(), this);
  });

  // ─── Import Map ───────────────────────────────────────────────────────────────

  // Hard caps keep a corrupted or oversized map from exhausting memory (self-DoS only).
  const IMPORT_MAX_JSON_CHARS = 5 * 1024 * 1024;
  const IMPORT_MAX_ENTRIES = 10000;
  const IMPORT_MAX_VALUE_CHARS = 10000;

  function importSessionMap(jsonStr) {
    if (jsonStr.length > IMPORT_MAX_JSON_CHARS) return false;
    let data;
    try { data = JSON.parse(jsonStr); } catch (e) { return false; }
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
    let count = 0;
    for (const [placeholder, original] of Object.entries(data)) {
      if (count >= IMPORT_MAX_ENTRIES) break;
      if (typeof placeholder !== 'string' || typeof original !== 'string') continue;
      if (original.length > IMPORT_MAX_VALUE_CHARS) continue;
      const m = placeholder.match(/^\[(.+)_(\d+)\]$/);
      if (!m) continue;
      const type = m[1];
      const n = parseInt(m[2], 10);
      session.reverse.set(placeholder, original);
      // If the same original appears under two placeholders, the first mapping wins in
      // forward (future redactions reuse it); reverse keeps both so restore works for either.
      if (!session.forward.has(original)) session.forward.set(original, placeholder);
      session.counters[type] = Math.max(session.counters[type] || 0, n);
      count++;
    }
    return count;
  }

  document.getElementById('btn-import-map').addEventListener('click', () => {
    const raw = document.getElementById('input-import-map').value.trim();
    const fb = document.getElementById('import-feedback');
    if (!raw) { fb.textContent = ''; return; }
    const count = importSessionMap(raw);
    if (count === false || count === 0) {
      fb.textContent = 'Invalid JSON or no valid entries found.';
      fb.className = 'feedback-message feedback-error';
    } else {
      fb.textContent = count + ' entr' + (count === 1 ? 'y' : 'ies') + ' imported.';
      fb.className = 'feedback-message feedback-info';
      document.getElementById('input-import-map').value = '';
      updateMapTable();
    }
  });

  // ─── Custom Patterns ─────────────────────────────────────────────────────────

  const CUSTOM_STORAGE_KEY = 'redactor_custom_patterns';

  function renderCustomPatternsList() {
    const tbody = document.getElementById('cp-tbody');
    const table = document.getElementById('cp-table');
    const empty = document.getElementById('cp-empty');
    const customs = PII_PATTERNS.filter(p => p.custom);
    tbody.innerHTML = '';
    if (customs.length === 0) {
      table.style.display = 'none';
      empty.style.display = '';
      return;
    }
    empty.style.display = 'none';
    table.style.display = '';
    // Built with createElement/textContent (never innerHTML): the type name and regex
    // source are user-controlled and must never be interpreted as markup.
    for (const p of customs) {
      const tr = document.createElement('tr');
      const tdType = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = 'pii-badge';
      badge.style.background = p.color;
      badge.textContent = p.type;
      tdType.appendChild(badge);
      const tdRegex = document.createElement('td');
      tdRegex.style.fontFamily = 'monospace';
      tdRegex.textContent = p.regex.source;
      const tdFlags = document.createElement('td');
      tdFlags.textContent = p.regex.flags;
      const tdColor = document.createElement('td');
      const swatch = document.createElement('span');
      swatch.style.cssText = 'display:inline-block;width:20px;height:20px;background:' + p.color + ';border-radius:3px;vertical-align:middle;border:1px solid #ccc;';
      tdColor.appendChild(swatch);
      const tdRemove = document.createElement('td');
      const removeBtn = document.createElement('button');
      removeBtn.className = 'button';
      removeBtn.style.cssText = 'width:auto;min-width:60px;font-size:0.8rem;';
      removeBtn.dataset.remove = p.type;
      removeBtn.textContent = 'Remove';
      tdRemove.appendChild(removeBtn);
      tr.appendChild(tdType);
      tr.appendChild(tdRegex);
      tr.appendChild(tdFlags);
      tr.appendChild(tdColor);
      tr.appendChild(tdRemove);
      tbody.appendChild(tr);
    }
    tbody.onclick = function(e) {
      const btn = e.target.closest('[data-remove]');
      if (!btn) return;
      removeCustomPattern(btn.getAttribute('data-remove'));
      renderCustomPatternsList();
    };
  }

  // Heuristic ReDoS screen: a quantified group that itself contains a quantifier
  // (e.g. (a+)+, (a*)*, (\d+){2,}) can make a backtracking engine go exponential.
  // Reject the structure before the pattern is ever executed.
  function looksCatastrophic(source) {
    return /\([^()]*[+*][^()]*\)\s*[+*{]/.test(source);
  }

  function addCustomPattern(type, regexSource, flags, color, save) {
    if (save === undefined) save = true;
    if (PII_PATTERNS.some(p => p.type === type)) return 'duplicate';
    if (looksCatastrophic(regexSource)) return 'redos';
    let re;
    try {
      const combinedFlags = flags.includes('g') ? flags : flags + 'g';
      re = new RegExp(regexSource, combinedFlags);
    } catch (e) {
      return 'invalid';
    }
    // Canary run: patterns the structural check misses (e.g. ambiguous alternations)
    // still reveal themselves as slow on a short pathological string.
    const canary = 'aaaaaaaaaaaaaaaaaaaaaaaa! 000000000000000000000001x';
    const t0 = performance.now();
    re.test(canary);
    re.lastIndex = 0;
    if (performance.now() - t0 > 50) return 'redos';
    PII_PATTERNS.push({ type: type, regex: re, color: color, custom: true });
    if (save) {
      try {
        const stored = JSON.parse(localStorage.getItem(CUSTOM_STORAGE_KEY) || '[]');
        stored.push({ type: type, regexSource: regexSource, flags: flags, color: color });
        localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(stored));
      } catch (e) {}
    }
    return true;
  }

  function removeCustomPattern(type) {
    const idx = PII_PATTERNS.findIndex(p => p.type === type && p.custom);
    if (idx !== -1) PII_PATTERNS.splice(idx, 1);
    try {
      const stored = JSON.parse(localStorage.getItem(CUSTOM_STORAGE_KEY) || '[]');
      localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(stored.filter(p => p.type !== type)));
    } catch (e) {}
  }

  function loadCustomPatterns() {
    try {
      const stored = JSON.parse(localStorage.getItem(CUSTOM_STORAGE_KEY) || '[]');
      const list = Array.isArray(stored) ? stored : [];
      for (const p of list) {
        // localStorage can be tampered with by extensions or injected scripts: validate every field.
        if (!p || typeof p.type !== 'string' || !/^[A-Z0-9_]{1,64}$/.test(p.type)) continue;
        if (typeof p.regexSource !== 'string' || p.regexSource.length === 0 || p.regexSource.length > 2000) continue;
        const flags = typeof p.flags === 'string' ? p.flags : '';
        if (!/^[gimsuy]*$/.test(flags)) continue;
        if (typeof p.color !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(p.color)) continue;
        addCustomPattern(p.type, p.regexSource, flags, p.color, false);
      }
    } catch (e) {}
    renderCustomPatternsList();
  }

  document.getElementById('btn-add-pattern').addEventListener('click', () => {
    const fb = document.getElementById('cp-feedback');
    const typeVal = document.getElementById('cp-type').value.trim().toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '');
    const regexVal = document.getElementById('cp-regex').value.trim();
    const colorVal = document.getElementById('cp-color').value;
    const ciVal = document.getElementById('cp-ci').checked ? 'i' : '';
    if (!typeVal || !regexVal) {
      fb.textContent = 'Type name and regex are required.';
      fb.className = 'feedback-message feedback-error';
      return;
    }
    const result = addCustomPattern(typeVal, regexVal, ciVal, colorVal, true);
    if (result !== true) {
      fb.textContent =
        result === 'duplicate' ? 'Type "' + typeVal + '" already exists.' :
        result === 'redos' ? 'Pattern rejected: it could cause catastrophic backtracking and freeze the browser.' :
        'Invalid regex.';
      fb.className = 'feedback-message feedback-error';
      return;
    }
    document.getElementById('cp-type').value = '';
    document.getElementById('cp-regex').value = '';
    document.getElementById('cp-ci').checked = false;
    fb.textContent = 'Pattern "' + typeVal + '" added.';
    fb.className = 'feedback-message feedback-info';
    renderCustomPatternsList();
  });

  loadCustomPatterns();

  // ─── Large Input Warning ──────────────────────────────────────────────────────

  const WARN_CHARS = 400000; // ~20 000 lines of ~20 chars each
  const WARN_CSV_ROWS = 20000;

  function checkInputSize(text, mode) {
    if (mode === 'text' && text.length > WARN_CHARS) {
      return 'Warning: input exceeds ~20 000 lines. Processing may be slow or cause the browser tab to freeze. Consider splitting the input into smaller chunks.';
    }
    if (mode === 'csv') {
      let lines = 0;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === '\n') lines++;
        else if (text[i] === '\r' && text[i + 1] !== '\n') lines++; // bare-CR (old Mac) line endings
      }
      if (lines > WARN_CSV_ROWS) {
        return 'Warning: CSV has more than ' + lines.toLocaleString() + ' lines. Processing may be slow or cause the browser tab to freeze. Consider splitting the file into smaller batches.';
      }
    }
    return null;
  }

  // ─── Clear Redaction Map ─────────────────────────────────────────────────────

  function clearRedactionMap() {
    session.forward.clear();
    session.reverse.clear();
    session.counters = {};
    // The blobs hold no live object URL (download handlers revoke theirs immediately),
    // so nulling the references is enough for the GC to reclaim the memory.
    session.redactedCsvBlob = null;
    session.restoredCsvBlob = null;
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
    document.getElementById('output-text-wrap').style.display = 'none';
    document.getElementById('input-csv').value = '';
    document.getElementById('output-csv-wrap').style.display = 'none';
    document.getElementById('input-restore').value = '';
    document.getElementById('output-restore').value = '';
    document.getElementById('output-restore-wrap').style.display = 'none';
    document.getElementById('input-restore-csv').value = '';
    document.getElementById('output-restore-csv-wrap').style.display = 'none';
    document.getElementById('input-import-map').value = '';
    document.getElementById('import-feedback').textContent = '';
    updateMapTable();
  }

  // The same action is offered in the Redaction Map section and next to the
  // Text/CSV toggle of the Redactor.
  ['btn-clear-session', 'btn-clear-session-top'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', clearRedactionMap);
  });
