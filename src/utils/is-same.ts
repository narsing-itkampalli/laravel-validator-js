import isPlainObject from "./is-plain-object";

/**
 * Compares two data structures (arrays or objects) for deep equality.
 * 
 * @param {any} data1 - The first data structure to compare.
 * @param {any} data2 - The second data structure to compare.
 * @returns {boolean} - True if the data structures are deeply equal; otherwise, false.
 *
 * Note:
 * - Arrays and objects are treated interchangeably, similar to how PHP treats arrays.
 * - For example, an object with numeric keys (`{ "0": "apple", "1": "banana" }`) 
 *   is considered equivalent to an array (`["apple", "banana"]`).
 */
export default function isSame(data1: any, data2: any): boolean {
    if (Array.isArray(data1) || isPlainObject(data1)) {
        if (!Array.isArray(data2) && !isPlainObject(data2)) return false;

        // Convert both data structures to key-value entries for comparison
        const data1Entries = Object.entries(data1);
        const data2Entries = Object.entries(data2);

        // Check if both have the same number of entries; if not, they aren't equal
        if (data1Entries.length !== data2Entries.length) return false;

        // Compare each key-value pair in data1 with corresponding pairs in data2
        return data1Entries.every(([data1EntryKey, data1EntryValue]) => {
            const data2Entry = data2Entries.find(([data2EntryKey]) => data1EntryKey === data2EntryKey);

            if (!data2Entry) return false;

            const [, data2EntryValue] = data2Entry;

            // Recursively compare the values for deep equality
            return isSame(data1EntryValue, data2EntryValue);
        });
    }

    // For primitive types or non-object/non-array structures, use strict equality
    return data1 === data2;
}