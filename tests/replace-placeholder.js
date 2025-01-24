const str = "The :attribute field must have at least :min digits.";

const attributes = {
    "apple.*.hi": "narsing"
}


const placeholder = {
    attribute: "apple.0.hi",
    min: "5"
}

const _str = str.replace(/:(.*?)(?:\s|$)/g, (_, placeholderKey) => {
    placeholderKey = placeholderKey.trim();

    if(placeholderKey === 'attribute') {
        const attributeInPlaceholder = placeholder[placeholderKey] || '';

        const customAttributeKey = Object.keys(attributes).find(key => new RegExp(`^${key.replace(/\./g, '\\.').replace(/\*/g, '.+')}$`, "g").test(attributeInPlaceholder));
        return (customAttributeKey ? attributes[customAttributeKey] : placeholder[placeholderKey] || '') + ' ';
    }

    return (placeholder[placeholderKey] || '') + ' ';
})

console.log(_str);