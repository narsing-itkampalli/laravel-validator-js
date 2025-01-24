

function isSame(data1, data2) {
    if(Array.isArray(data1) || isPlainObject(data1)) {
        if(!Array.isArray(data2) && !isPlainObject(data2)) return false;
        const data1Entries = Object.entries(data1);
        const data2Entries = Object.entries(data2);

        if(data1Entries.length !== data1Entries.length) return false;
        return data1Entries.every(data1Entry => {
            const [data1EntryKey, data1EntryValue] = data1Entry;

            const data2Entry = data2Entries.find(([data2EntryKey]) => data1EntryKey === data2EntryKey);
            if(!data2Entry) return false;
            const [_, data2EntryValue] = data2Entry;

            return isSame(data1EntryValue, data2EntryValue);
        });
    }

    return data1 === data2;
}

function isPlainObject(obj) {
    return typeof obj === 'object' &&
        obj !== null &&
        !Array.isArray(obj) &&
        Object.getPrototypeOf(obj) === Object.prototype;
}

// const data1 = ["a", {}, "c", "d"];
// const data2 = ["a", "c", {}, "d"];

const data1 = {
    "0": 'apple',
    "1": {
        'a': 'apple',
        'b': 'ball'
    }
}

const data2 = ["apple", {
    'a': 'apple',
    'b': 'balls'
}]


console.log(isSame(data1, data2));