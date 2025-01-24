export default function isPlainObject(obj) {
    return typeof obj === 'object' &&
        obj !== null &&
        !Array.isArray(obj) &&
        Object.getPrototypeOf(obj) === Object.prototype;
}
