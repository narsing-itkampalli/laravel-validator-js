export default class EmailValidator {
    static isRFCValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    static isStrictValid(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
    static isSpoofedDomain(email) {
        const domain = email.split('@')[1];
        if (!domain)
            return false;
        try {
            const url = new URL(`http://${domain}`);
            const punycodeDomain = url.hostname;
            return domain !== punycodeDomain;
        }
        catch (error) {
            return true;
        }
    }
    static isUnicodeFiltered(email) {
        return /^[\x00-\x7F]*$/.test(email);
    }
}
