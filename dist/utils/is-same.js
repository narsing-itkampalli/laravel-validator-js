import isPlainObject from "./is-plain-object.js";
export default function isSame(data1, data2) {
    if (Array.isArray(data1) || isPlainObject(data1)) {
        if (!Array.isArray(data2) && !isPlainObject(data2))
            return false;
        const data1Entries = Object.entries(data1);
        const data2Entries = Object.entries(data2);
        if (data1Entries.length !== data2Entries.length)
            return false;
        return data1Entries.every(([data1EntryKey, data1EntryValue]) => {
            const data2Entry = data2Entries.find(([data2EntryKey]) => data1EntryKey === data2EntryKey);
            if (!data2Entry)
                return false;
            const [, data2EntryValue] = data2Entry;
            return isSame(data1EntryValue, data2EntryValue);
        });
    }
    return data1 === data2;
}
