export default class IPValidator {
    /**
     * Determines if the provided string is a valid IPV4 address.
     * 
     * An IPV4 address consists of four numeric segments separated by dots.
     * Each segment can range from 0 to 255. For example: 192.168.1.1
     * 
     * @param {string} value - The string to validate.
     * @returns {boolean} - Returns `true` if the string is a valid IPV4 address, otherwise `false`.
     */
    static isIPV4(value: string): boolean {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g.test(value);
    }

    /**
     * Determines if the provided string is a valid IPV6 address.
     * 
     * An IPV6 address is represented as eight groups of four hexadecimal digits,
     * each group representing 16 bits (two octets). The groups are separated by colons (:).
     * For example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
     * 
     * Regular expression sourced from: 
     * https://stackoverflow.com/a/17871737/16135511
     * 
     * @param {string} value - The string to validate.
     * @returns {boolean} - Returns `true` if the string is a valid IPV6 address, otherwise `false`.
     */
    static isIPV6(value: string): boolean {
        return /^(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))(%.+)?\s*$/g.test(value);
        // Note: Due to the complexity of the regular expression, this comment only provides a brief description.
    }

    /**
     * Determines if the provided string is a valid IP address (either IPV4 or IPV6).
     * 
     * @param {string} value - The string to validate.
     * @returns {boolean} - Returns `true` if the string is a valid IP address (either IPV4 or IPV6), otherwise `false`.
     */
    static isIP(value: string): boolean {
        return this.isIPV4(value) || this.isIPV6(value);
    }
}