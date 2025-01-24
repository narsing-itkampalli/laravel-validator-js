export default function isMacAddress(value) {
    return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/gi.test(value);
}
