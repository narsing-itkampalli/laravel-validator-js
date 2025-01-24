
export default class EmailValidator {
    static isRFCValid(email:string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static isStrictValid(email:string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    static isSpoofedDomain(email:string) {
        const domain = email.split('@')[1];
        if (!domain) return false;

        try {
            const url = new URL(`http://${domain}`);
            const punycodeDomain = url.hostname;

            return domain !== punycodeDomain;
        } catch (error) {
            return true;
        }
    }

    static isUnicodeFiltered(email:string) {
        return /^[\x00-\x7F]*$/.test(email);
    }
}

/*

rfc: RFCValidation
strict: NoRFCWarningsValidation
dns: DNSCheckValidation
spoof: SpoofCheckValidation
filter: FilterEmailValidation
filter_unicode: FilterEmailValidation::unicode()

*/

// Cyrillic
// "user@examрle.com"