/**
     * Checks if the provided value is a plain JavaScript object.
     * 
     * A plain object in JavaScript is an object that:
     * - is created using {} or `new Object()`.
     * - is not of any other built-in type like Array, Function, etc.
     * - has its prototype directly linked to `Object.prototype`.
     * 
     * @param obj - The value to check.
     * @returns {boolean} - Returns `true` if the value is a plain object, otherwise `false`.
     */
export default function isPlainObject(obj: any): boolean {
    return typeof obj === 'object' &&
        obj !== null &&
        !Array.isArray(obj) &&
        Object.getPrototypeOf(obj) === Object.prototype;
}