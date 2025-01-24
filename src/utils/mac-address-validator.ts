/**
     * Determines if the provided string is a valid MAC address.
     * 
     * A MAC address is typically represented as six groups of two hexadecimal digits,
     * separated by either colons (:) or hyphens (-). 
     * For example: '00:1A:2B:3C:4D:5E' or '00-1A-2B-3C-4D-5E'.
     * 
     * This function checks the format using a regular expression to ensure the string
     * adheres to the MAC address pattern.
     * 
     * Regular expression sourced from: 
     * https://stackoverflow.com/a/4260512/16135511
     * 
     * @param {string} value - The string to validate.
     * @returns {boolean} - Returns `true` if the string is a valid MAC address, otherwise `false`.
     */
export default function isMacAddress (value: string): boolean {
    return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/gi.test(value);
}