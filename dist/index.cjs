'use strict';

const validatorDefaultMessages = {
    "accepted": "The :attribute field must be accepted.",
    "accepted_if": "The :attribute field must be accepted when :other is :value.",
    "active_url": "The :attribute field must be a valid URL.",
    "after": "The :attribute field must be a date after :date.",
    "after_or_equal": "The :attribute field must be a date after or equal to :date.",
    "alpha": "The :attribute field must only contain letters.",
    "alpha_dash": "The :attribute field must only contain letters, numbers, dashes, and underscores.",
    "alpha_num": "The :attribute field must only contain letters and numbers.",
    "array": "The :attribute field must be an array.",
    "ascii": "The :attribute field must only contain single-byte alphanumeric characters and symbols.",
    "before": "The :attribute field must be a date before :date.",
    "before_or_equal": "The :attribute field must be a date before or equal to :date.",
    "between": {
        "array": "The :attribute field must have between :min and :max items.",
        "file": "The :attribute field must be between :min and :max kilobytes.",
        "numeric": "The :attribute field must be between :min and :max.",
        "string": "The :attribute field must be between :min and :max characters."
    },
    "boolean": "The :attribute field must be true or false.",
    "can": "The :attribute field contains an unauthorized value.",
    "confirmed": "The :attribute field confirmation does not match.",
    "contains": "The :attribute field is missing a required value.",
    "current_password": "The password is incorrect.",
    "date": "The :attribute field must be a valid date.",
    "date_equals": "The :attribute field must be a date equal to :date.",
    "date_format": "The :attribute field must match the format :format.",
    "decimal": "The :attribute field must have :decimal decimal places.",
    "declined": "The :attribute field must be declined.",
    "declined_if": "The :attribute field must be declined when :other is :value.",
    "different": "The :attribute field and :other must be different.",
    "digits": "The :attribute field must be :digits digits.",
    "digits_between": "The :attribute field must be between :min and :max digits.",
    "dimensions": "The :attribute field has invalid image dimensions.",
    "distinct": "The :attribute field has a duplicate value.",
    "doesnt_end_with": "The :attribute field must not end with one of the following: :values.",
    "doesnt_start_with": "The :attribute field must not start with one of the following: :values.",
    "email": "The :attribute field must be a valid email address.",
    "ends_with": "The :attribute field must end with one of the following: :values.",
    "enum": "The selected :attribute is invalid.",
    "exists": "The selected :attribute is invalid.",
    "extensions": "The :attribute field must have one of the following extensions: :values.",
    "file": "The :attribute field must be a file.",
    "filled": "The :attribute field must have a value.",
    "gt": {
        "array": "The :attribute field must have more than :value items.",
        "file": "The :attribute field must be greater than :value kilobytes.",
        "numeric": "The :attribute field must be greater than :value.",
        "string": "The :attribute field must be greater than :value characters."
    },
    "gte": {
        "array": "The :attribute field must have :value items or more.",
        "file": "The :attribute field must be greater than or equal to :value kilobytes.",
        "numeric": "The :attribute field must be greater than or equal to :value.",
        "string": "The :attribute field must be greater than or equal to :value characters."
    },
    "hex_color": "The :attribute field must be a valid hexadecimal color.",
    "image": "The :attribute field must be an image.",
    "in": "The selected :attribute is invalid.",
    "in_array": "The :attribute field must exist in :other.",
    "integer": "The :attribute field must be an integer.",
    "ip": "The :attribute field must be a valid IP address.",
    "ipv4": "The :attribute field must be a valid IPv4 address.",
    "ipv6": "The :attribute field must be a valid IPv6 address.",
    "json": "The :attribute field must be a valid JSON string.",
    "list": "The :attribute field must be a list.",
    "lowercase": "The :attribute field must be lowercase.",
    "lt": {
        "array": "The :attribute field must have less than :value items.",
        "file": "The :attribute field must be less than :value kilobytes.",
        "numeric": "The :attribute field must be less than :value.",
        "string": "The :attribute field must be less than :value characters."
    },
    "lte": {
        "array": "The :attribute field must not have more than :value items.",
        "file": "The :attribute field must be less than or equal to :value kilobytes.",
        "numeric": "The :attribute field must be less than or equal to :value.",
        "string": "The :attribute field must be less than or equal to :value characters."
    },
    "mac_address": "The :attribute field must be a valid MAC address.",
    "max": {
        "array": "The :attribute field must not have more than :max items.",
        "file": "The :attribute field must not be greater than :max kilobytes.",
        "numeric": "The :attribute field must not be greater than :max.",
        "string": "The :attribute field must not be greater than :max characters."
    },
    "max_digits": "The :attribute field must not have more than :max digits.",
    "mimes": "The :attribute field must be a file of type: :values.",
    "mimetypes": "The :attribute field must be a file of type: :values.",
    "min": {
        "array": "The :attribute field must have at least :min items.",
        "file": "The :attribute field must be at least :min kilobytes.",
        "numeric": "The :attribute field must be at least :min.",
        "string": "The :attribute field must be at least :min characters."
    },
    "min_digits": "The :attribute field must have at least :min digits.",
    "missing": "The :attribute field must be missing.",
    "missing_if": "The :attribute field must be missing when :other is :value.",
    "missing_unless": "The :attribute field must be missing unless :other is :value.",
    "missing_with": "The :attribute field must be missing when :values is present.",
    "missing_with_all": "The :attribute field must be missing when :values are present.",
    "multiple_of": "The :attribute field must be a multiple of :value.",
    "not_in": "The selected :attribute is invalid.",
    "not_regex": "The :attribute field format is invalid.",
    "numeric": "The :attribute field must be a number.",
    "password": {
        "letters": "The :attribute field must contain at least one letter.",
        "mixed": "The :attribute field must contain at least one uppercase and one lowercase letter.",
        "numbers": "The :attribute field must contain at least one number.",
        "symbols": "The :attribute field must contain at least one symbol.",
        "uncompromised": "The given :attribute has appeared in a data leak. Please choose a different :attribute."
    },
    "present": "The :attribute field must be present.",
    "present_if": "The :attribute field must be present when :other is :value.",
    "present_unless": "The :attribute field must be present unless :other is :value.",
    "present_with": "The :attribute field must be present when :values is present.",
    "present_with_all": "The :attribute field must be present when :values are present.",
    "prohibited": "The :attribute field is prohibited.",
    "prohibited_if": "The :attribute field is prohibited when :other is :value.",
    "prohibited_unless": "The :attribute field is prohibited unless :other is in :values.",
    "prohibits": "The :attribute field prohibits :other from being present.",
    "regex": "The :attribute field format is invalid.",
    "required": "The :attribute field is required.",
    "required_array_keys": "The :attribute field must contain entries for: :values.",
    "required_if": "The :attribute field is required when :other is :value.",
    "required_if_accepted": "The :attribute field is required when :other is accepted.",
    "required_if_declined": "The :attribute field is required when :other is declined.",
    "required_unless": "The :attribute field is required unless :other is in :values.",
    "required_with": "The :attribute field is required when :values is present.",
    "required_with_all": "The :attribute field is required when :values are present.",
    "required_without": "The :attribute field is required when :values is not present.",
    "required_without_all": "The :attribute field is required when none of :values are present.",
    "same": "The :attribute field must match :other.",
    "size": {
        "array": "The :attribute field must contain :size items.",
        "file": "The :attribute field must be :size kilobytes.",
        "numeric": "The :attribute field must be :size.",
        "string": "The :attribute field must be :size characters."
    },
    "starts_with": "The :attribute field must start with one of the following: :values.",
    "string": "The :attribute field must be a string.",
    "timezone": "The :attribute field must be a valid timezone.",
    "unique": "The :attribute has already been taken.",
    "uploaded": "The :attribute failed to upload.",
    "uppercase": "The :attribute field must be uppercase.",
    "url": "The :attribute field must be a valid URL.",
    "ulid": "The :attribute field must be a valid ULID.",
    "uuid": "The :attribute field must be a valid UUID."
};

function isPlainObject(obj) {
    return typeof obj === 'object' &&
        obj !== null &&
        !Array.isArray(obj) &&
        Object.getPrototypeOf(obj) === Object.prototype;
}

class ValidatorData {
    constructor(data) {
        this.value = [];
        try {
            if (data instanceof HTMLFormElement) {
                data = new FormData(data);
            }
        }
        catch { }
        if (!(data instanceof FormData)) {
            this.value = data;
        }
        else {
            const objectData = {};
            data.forEach((value, key) => {
                let hasMultipleValue = false;
                if (key.endsWith('[]')) {
                    key = key.slice(0, -2);
                    hasMultipleValue = true;
                }
                if (hasMultipleValue) {
                    if (Array.isArray(objectData[key])) {
                        objectData[key].push(value);
                    }
                    else {
                        objectData[key] = [value];
                    }
                }
                objectData[key] = value;
            });
            this.value = objectData;
        }
    }
    has(pathString) {
        const foundData = this.get(pathString);
        if (Array.isArray(foundData)) {
            return foundData.some((obj) => obj.value !== undefined);
        }
        return foundData.value !== undefined;
    }
    get(pathString) {
        const pathSegments = pathString
            .split(/(?<!\\)\./g)
            .map(segment => segment.replace(/\\\./g, '.'));
        function traverse(currentData, remainingPath, currentPath) {
            if (!remainingPath.length) {
                return {
                    path: currentPath.map(part => part.replace(/\./g, '\\.')),
                    key: currentPath[currentPath.length - 1],
                    value: currentData
                };
            }
            const currentSegment = remainingPath[0];
            const nextPath = remainingPath.slice(1);
            if (currentSegment.includes('*')) {
                const regex = new RegExp(`^${currentSegment.replace(/\*/g, '.*')}$`);
                if (Array.isArray(currentData) || isPlainObject(currentData)) {
                    return Object.entries(currentData)
                        .filter(([key]) => regex.test(key))
                        .flatMap(([key, value]) => traverse(value, nextPath, [...currentPath, key]));
                }
                return [traverse(currentData === null || currentData === undefined ? undefined : currentData[currentSegment], [], [...currentPath, ...nextPath, currentSegment])].flat(1);
            }
            return traverse(currentData === null || currentData === undefined ? undefined : currentData[currentSegment], nextPath, [...currentPath, currentSegment]);
        }
        return traverse(this.value, pathSegments, []);
    }
}

class IPValidator {
    static isIPV4(value) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g.test(value);
    }
    static isIPV6(value) {
        return /^(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))(%.+)?\s*$/g.test(value);
    }
    static isIP(value) {
        return this.isIPV4(value) || this.isIPV6(value);
    }
}

function isSame(data1, data2) {
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

function isMacAddress(value) {
    return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/gi.test(value);
}

function isValidUrl(value, allowedProtocols) {
    try {
        const parsedUrl = new URL(value);
        if (allowedProtocols && allowedProtocols.length) {
            return allowedProtocols.includes(parsedUrl.protocol.replace(':', ''));
        }
        return true;
    }
    catch (e) {
        return false;
    }
}

function validateHexColor(value) {
    return /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value);
}

class EmailValidator {
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

class ValidationHandler {
    constructor(context) {
        this.handlers = {
            accepted: () => {
                return async ({ value, path }) => {
                    return {
                        passed: this.helpers.isAccepted(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            accepted_if: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !ifCondition.passed || this.helpers.isAccepted(value),
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            value: ifCondition.otherValue
                        }
                    };
                };
            },
            active_url: () => {
                return ({ value, path }) => {
                    return {
                        passed: isValidUrl(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            after: ({ ruleParams }) => {
                let otherDate = new Date(ruleParams[0]);
                if (isNaN(otherDate.getTime())) {
                    const otherDateFieldValue = this.context.data.get(ruleParams[0]);
                    if (!Array.isArray(otherDateFieldValue)) {
                        otherDate = new Date(otherDateFieldValue.value);
                    }
                }
                return ({ value, path }) => {
                    const dateValue = new Date(value);
                    return {
                        passed: isNaN(otherDate.getDate()) || dateValue > otherDate,
                        placeholder: {
                            attribute: path.join('.'),
                            date: otherDate.toDateString()
                        }
                    };
                };
            },
            after_or_equal: ({ ruleParams }) => {
                let otherDate = new Date(ruleParams[0]);
                if (isNaN(otherDate.getTime())) {
                    const otherDateFieldValue = this.context.data.get(ruleParams[0]);
                    if (!Array.isArray(otherDateFieldValue)) {
                        otherDate = new Date(otherDateFieldValue.value);
                    }
                }
                return ({ value, path }) => {
                    return {
                        passed: isNaN(otherDate.getDate()) || new Date(value) >= otherDate,
                        placeholder: {
                            attribute: path.join('.'),
                            date: otherDate.toDateString()
                        }
                    };
                };
            },
            alpha: ({ ruleParams }) => {
                const regex = (ruleParams[0] === 'ascii' ? /^[a-zA-Z]+$/ :
                    /^[\p{L}\p{M}]+$/u);
                return ({ value, path }) => {
                    return {
                        passed: regex.test(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            alpha_dash: ({ ruleParams }) => {
                const regex = (ruleParams[0] === 'ascii' ? /^[a-zA-Z0-9\-_]+$/ :
                    /^[\p{L}\p{M}\p{N}\-_]+$/u);
                return ({ value, path }) => {
                    return {
                        passed: regex.test(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            alpha_num: ({ ruleParams }) => {
                const regex = (ruleParams[0] === 'ascii' ? /^[a-zA-Z0-9]+$/ :
                    /^[\p{L}\p{M}\p{N}]+$/u);
                return ({ value, path }) => {
                    return {
                        passed: regex.test(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            array: ({ ruleParams }) => {
                return ({ value, path }) => {
                    let passed = false;
                    console.log({ value, ruleParams });
                    if (Array.isArray(value) || isPlainObject(value)) {
                        passed = ruleParams.length === 0 || Object.entries(value).every(([key]) => ruleParams.includes(key));
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            ascii: () => {
                return ({ value, path }) => {
                    return {
                        passed: /^[\x00-\x7F]*$/.test(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            before: ({ ruleParams }) => {
                let otherDate = new Date(ruleParams[0]);
                if (isNaN(otherDate.getTime())) {
                    const otherDateFieldValue = this.context.data.get(ruleParams[0]);
                    if (!Array.isArray(otherDateFieldValue)) {
                        otherDate = new Date(otherDateFieldValue.value);
                    }
                }
                return ({ value, path }) => {
                    const dateValue = new Date(value);
                    return {
                        passed: isNaN(otherDate.getDate()) || dateValue < otherDate,
                        placeholder: {
                            attribute: path.join('.'),
                            date: otherDate.toDateString()
                        }
                    };
                };
            },
            before_or_equal: ({ ruleParams }) => {
                let otherDate = new Date(ruleParams[0]);
                if (isNaN(otherDate.getTime())) {
                    const otherDateFieldValue = this.context.data.get(ruleParams[0]);
                    if (!Array.isArray(otherDateFieldValue)) {
                        otherDate = new Date(otherDateFieldValue.value);
                    }
                }
                return ({ value, path }) => {
                    const dateValue = new Date(value);
                    return {
                        passed: isNaN(otherDate.getDate()) || dateValue <= otherDate,
                        placeholder: {
                            attribute: path.join('.'),
                            date: otherDate.toDateString()
                        }
                    };
                };
            },
            between: ({ ruleParams, fieldRulesArray }) => {
                return ({ value, path }) => {
                    let valueType = this.helpers.getDataType(value);
                    const isInteger = fieldRulesArray.find(fieldRule => fieldRule.name === 'integer');
                    const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                    const response = {
                        passed: false,
                        type: isInteger ? 'numeric' : (isArray ? 'array' : (valueType === 'file' ? 'file' : 'string')),
                        placeholder: {
                            attribute: path.join('.'),
                            min: ruleParams[0],
                            max: ruleParams[1]
                        }
                    };
                    if (valueType) {
                        let valueSize = this.helpers.getSize(value, valueType, !!isInteger);
                        const min = !ruleParams[0] || !ruleParams[0].trim() ? NaN : Number(ruleParams[0]);
                        const max = !ruleParams[1] || !ruleParams[1].trim() ? NaN : Number(ruleParams[1]);
                        if (isNaN(min))
                            throw new Error(`The given value "${ruleParams[0]}" does not represent a valid number.`);
                        if (isNaN(max))
                            throw new Error(`The given value "${ruleParams[1]}" does not represent a valid number.`);
                        response.passed = valueSize >= min && valueSize <= max;
                    }
                    return response;
                };
            },
            boolean: () => {
                return ({ value, path }) => {
                    return {
                        passed: [true, false, 1, 0, '1', '0'].includes(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            confirmed: ({ ruleParams }) => {
                return ({ value, key, path }) => {
                    let passed = false;
                    const confirmationFieldName = ruleParams.length ? ruleParams[0] : `${path.join('.')}_confirmation`;
                    const confirmationFieldValue = this.context.data.get(confirmationFieldName);
                    if (Array.isArray(confirmationFieldValue)) {
                        const valueToBeMatched = confirmationFieldValue.find(item => item.key === key);
                        if (valueToBeMatched) {
                            passed = valueToBeMatched.value == value;
                        }
                    }
                    else {
                        passed = confirmationFieldValue.value == value;
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            contains: ({ ruleParams }) => {
                return ({ value, path }) => {
                    let passed = false;
                    if (Array.isArray(value) || isPlainObject(value)) {
                        const valueArray = Object.values(value);
                        passed = ruleParams.every(ruleParam => {
                            return valueArray.findIndex(valueItem => valueItem == ruleParam) > -1;
                        });
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            date: () => {
                return ({ value, path }) => {
                    const dateValue = new Date(value);
                    return {
                        passed: !isNaN(dateValue.getDate()),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            date_equals: ({ ruleParams }) => {
                let otherDate = new Date(ruleParams[0]);
                if (isNaN(otherDate.getTime())) {
                    const otherDateFieldValue = this.context.data.get(ruleParams[0]);
                    if (!Array.isArray(otherDateFieldValue)) {
                        otherDate = new Date(otherDateFieldValue.value);
                    }
                }
                return ({ value, path }) => {
                    const dateValue = new Date(value);
                    return {
                        passed: isNaN(otherDate.getDate()) || dateValue.getTime() == otherDate.getTime(),
                        placeholder: {
                            attribute: path.join('.'),
                            date: otherDate.toDateString()
                        }
                    };
                };
            },
            decimal: ({ ruleParams }) => {
                return ({ value, path }) => {
                    var _a;
                    let passed = false;
                    if (!isNaN(Number(value))) {
                        const decimalPlaces = ((_a = String(value).split('.')[1]) === null || _a === undefined ? undefined : _a.length) || 0;
                        if (ruleParams.length === 1) {
                            passed = decimalPlaces === parseFloat(ruleParams[0]);
                        }
                        else {
                            const min = parseFloat(ruleParams[0]);
                            const max = parseFloat(ruleParams[1]);
                            if (!isNaN(min)) {
                                passed = decimalPlaces >= min && (isNaN(max) || decimalPlaces <= max);
                            }
                        }
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            decimal: ruleParams.slice(0, 2).join('-')
                        }
                    };
                };
            },
            declined: () => {
                return ({ value, path }) => {
                    return {
                        passed: this.helpers.isDeclined(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            declined_if: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !ifCondition.passed || this.helpers.isDeclined(value),
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            value: ifCondition.otherValue
                        }
                    };
                };
            },
            different: ({ ruleParams, fieldValue }) => {
                const otherFieldValue = this.context.data.get(ruleParams[0]);
                return ({ value, key, path }) => {
                    if (!Array.isArray(fieldValue) && Array.isArray(otherFieldValue))
                        return { passed: true };
                    const response = {
                        passed: false,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ''
                        }
                    };
                    if (Array.isArray(otherFieldValue)) {
                        const otherFieldValueItem = otherFieldValue.find((item) => item.key == key && isSame(item.value, value));
                        if (!otherFieldValueItem)
                            response.passed = true;
                        else
                            response.placeholder.other = otherFieldValueItem.key;
                    }
                    else {
                        response.passed = !isSame(otherFieldValue.value, value);
                    }
                    return response;
                };
            },
            digits: ({ ruleParams }) => {
                return ({ value, path }) => {
                    let passed = false;
                    if (['string', 'number'].includes(typeof value)) {
                        const stringValue = String(value).trim();
                        if (/^[0-9]+$/.test(stringValue)) {
                            const digitsCount = Number(ruleParams[0]);
                            passed = !isNaN(digitsCount) && stringValue.length === digitsCount;
                        }
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            digits: ruleParams[0]
                        }
                    };
                };
            },
            digits_between: ({ ruleParams }) => {
                return ({ value, path }) => {
                    let passed = false;
                    if (['string', 'number'].includes(typeof value)) {
                        const stringValue = String(value);
                        if (/^[0-9]+$/.test(stringValue)) {
                            const stringValueLength = stringValue.length;
                            const min = parseFloat(ruleParams[0]);
                            const max = parseFloat(ruleParams[1]);
                            if (!isNaN(min)) {
                                passed = stringValueLength >= min && (isNaN(max) || stringValueLength <= max);
                            }
                        }
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            min: ruleParams[0],
                            max: ruleParams[1]
                        }
                    };
                };
            },
            dimensions: ({ ruleParams }) => {
                const imageRules = ruleParams.map(ruleParam => {
                    return ruleParam.split('=').map(ruleParamItem => ruleParamItem.trim()).slice(0, 2);
                });
                return async ({ value, path }) => {
                    let passed = false;
                    if (value instanceof File && value.type.startsWith('image/')) {
                        try {
                            const isValidDimention = await new Promise((resolve, reject) => {
                                const img = new Image();
                                img.onload = () => {
                                    const { width, height } = img;
                                    const result = imageRules.every(([ruleName, ruleValue]) => {
                                        if (ruleName === 'min_width' && width < parseFloat(ruleValue))
                                            return false;
                                        if (ruleName === 'max_width' && width > parseFloat(ruleValue))
                                            return false;
                                        if (ruleName === 'min_height' && height < parseFloat(ruleValue))
                                            return false;
                                        if (ruleName === 'max_height' && height > parseFloat(ruleValue))
                                            return false;
                                        if (ruleName === 'width' && width != parseFloat(ruleValue))
                                            return false;
                                        if (ruleName === 'height' && width != parseFloat(ruleValue))
                                            return false;
                                        if (ruleName === 'ratio') {
                                            const expectedRatio = ruleValue.includes('/')
                                                ? ruleValue.split('/').map(parseFloat).reduce((numerator, denominator) => numerator / denominator)
                                                : parseFloat(ruleValue);
                                            const actualRatio = width / height;
                                            if (Math.abs(actualRatio - expectedRatio) > 0.01)
                                                return false;
                                        }
                                        return true;
                                    });
                                    resolve(result);
                                };
                                img.onerror = () => reject(new Error('Unable to load image.'));
                                img.src = URL.createObjectURL(value);
                            });
                            passed = isValidDimention;
                        }
                        catch { }
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            distinct: ({ fieldValue, ruleParams }) => {
                let ignoreCase = false;
                let strictComparison = false;
                if (ruleParams.length) {
                    if (ruleParams.includes('strict'))
                        strictComparison = true;
                    if (ruleParams.includes('ignore_case')) {
                        ignoreCase = true;
                        strictComparison = true;
                    }
                }
                return ({ value, key, path }) => {
                    if (!Array.isArray(fieldValue))
                        return { passed: true };
                    const passed = !fieldValue.find((fieldValueItem) => {
                        if (fieldValueItem.key == key)
                            return false;
                        const otherValue = fieldValueItem.value;
                        if (ignoreCase && typeof value === 'string' && typeof otherValue === 'string') {
                            return value.toLowerCase() === otherValue.toLowerCase();
                        }
                        return strictComparison ? value === otherValue : value == otherValue;
                    });
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            doesnt_end_with: ({ ruleParams }) => {
                return ({ value, path }) => {
                    let passed = false;
                    if (ruleParams.length == 0 || !['string', 'number'].includes(typeof value)) {
                        passed = true;
                    }
                    else {
                        passed = !ruleParams.some((ruleParam) => !!ruleParam && String(value).endsWith(ruleParam));
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(', ')
                        }
                    };
                };
            },
            doesnt_start_with: ({ ruleParams }) => {
                return ({ value, path }) => {
                    let passed = false;
                    if (ruleParams.length == 0 || !['string', 'number'].includes(typeof value)) {
                        passed = true;
                    }
                    else {
                        passed = !ruleParams.some((ruleParam) => !!ruleParam && String(value).startsWith(ruleParam));
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(', ')
                        }
                    };
                };
            },
            email: ({ ruleParams }) => {
                const validationFlags = {
                    rfc: ruleParams.includes('rfc'),
                    strict: ruleParams.includes('strict'),
                    spoof: ruleParams.includes('spoof'),
                    filter_unicode: ruleParams.includes('filter_unicode'),
                };
                return ({ value, path }) => {
                    const isValidEmail = () => {
                        if (typeof value !== 'string')
                            return false;
                        if (!EmailValidator.isRFCValid(value))
                            return false;
                        if (validationFlags.strict && !EmailValidator.isStrictValid(value))
                            return false;
                        if (validationFlags.spoof && EmailValidator.isSpoofedDomain(value))
                            return false;
                        if (validationFlags.filter_unicode && !EmailValidator.isUnicodeFiltered(value))
                            return false;
                        return true;
                    };
                    return {
                        passed: isValidEmail(),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            ends_with: ({ ruleParams }) => {
                return ({ value, path }) => {
                    let passed = false;
                    if (['string', 'number'].includes(typeof value)) {
                        const stringValue = String(value);
                        passed = ruleParams.some((ruleParam) => !!ruleParam && stringValue.endsWith(ruleParam));
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(', ')
                        }
                    };
                };
            },
            extensions: ({ ruleParams }) => {
                const validExtensions = new Set(ruleParams.map(ruleParam => ruleParam.toLowerCase()));
                return ({ value, path }) => {
                    let passed = false;
                    if (value instanceof File) {
                        const fileExtension = (value.name.split('.').pop() || '').toLowerCase();
                        passed = validExtensions.has(fileExtension);
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(', ')
                        }
                    };
                };
            },
            file: () => {
                return ({ value, path }) => {
                    return {
                        passed: value instanceof File,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            filled: () => {
                return ({ value, path }) => {
                    let passed = false;
                    if (Array.isArray(value) || isPlainObject(value)) {
                        passed = Boolean(Object.keys(value).length);
                    }
                    else if (value !== undefined && value !== null) {
                        passed = typeof value !== 'string' || Boolean(value.trim());
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            gt: ({ ruleParams, fieldRulesArray }) => {
                const otherFieldValue = this.context.data.get(ruleParams[0]);
                return ({ value, path }) => {
                    let valueType = this.helpers.getDataType(value);
                    const isInteger = fieldRulesArray.find(fieldRule => fieldRule.name === 'integer');
                    const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                    const response = {
                        passed: false,
                        type: (isInteger || valueType == 'numeric') ? 'numeric' : (isArray ? 'array' : (valueType === 'file' ? 'file' : 'string')),
                        placeholder: {
                            attribute: path.join('.'),
                            value: ruleParams[0]
                        }
                    };
                    if (valueType && !Array.isArray(otherFieldValue)) {
                        const otherFieldValueType = this.helpers.getDataType(otherFieldValue.value);
                        if (otherFieldValueType) {
                            let valueSize = this.helpers.getSize(value, valueType, !!isInteger);
                            const otherFieldValueSize = this.helpers.getSize(otherFieldValue.value, otherFieldValueType, !!isInteger || valueType === 'numeric');
                            response.placeholder.value = otherFieldValueSize.toString();
                            if (valueType === otherFieldValueType)
                                response.passed = valueSize > otherFieldValueSize;
                        }
                    }
                    return response;
                };
            },
            gte: ({ ruleParams, fieldRulesArray }) => {
                const otherFieldValue = this.context.data.get(ruleParams[0]);
                return ({ value, path }) => {
                    let valueType = this.helpers.getDataType(value);
                    const isInteger = fieldRulesArray.find(fieldRule => fieldRule.name === 'integer');
                    const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                    const response = {
                        passed: false,
                        type: (isInteger || valueType == 'numeric') ? 'numeric' : (isArray ? 'array' : (valueType === 'file' ? 'file' : 'string')),
                        placeholder: {
                            attribute: path.join('.'),
                            value: ruleParams[0]
                        }
                    };
                    if (valueType && !Array.isArray(otherFieldValue)) {
                        const otherFieldValueType = this.helpers.getDataType(otherFieldValue.value);
                        if (otherFieldValueType) {
                            let valueSize = this.helpers.getSize(value, valueType, !!isInteger);
                            const otherFieldValueSize = this.helpers.getSize(otherFieldValue.value, otherFieldValueType, !!isInteger || valueType === 'numeric');
                            response.placeholder.value = otherFieldValueSize.toString();
                            if (valueType === otherFieldValueType)
                                response.passed = valueSize >= otherFieldValueSize;
                        }
                    }
                    return response;
                };
            },
            hex_color: () => {
                return ({ value, path }) => {
                    return {
                        passed: validateHexColor(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            image: () => {
                return ({ value, path }) => {
                    return {
                        passed: value instanceof File && value.type.startsWith('image/'),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            in: ({ ruleParams, fieldRulesArray }) => {
                const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                return ({ value, path }) => {
                    let passed = false;
                    if (Array.isArray(value) || isPlainObject(value)) {
                        if (isArray) {
                            passed = Object.values(value).every(item => {
                                return ruleParams.some(ruleParam => ruleParam == item);
                            });
                        }
                    }
                    else {
                        passed = ruleParams.some(ruleParam => ruleParam == value);
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            in_array: ({ ruleParams }) => {
                const anotherfieldName = ruleParams[0];
                const anotherFieldValue = this.context.data.get(anotherfieldName);
                return ({ value, path }) => {
                    let passed = false;
                    if (Array.isArray(anotherFieldValue)) {
                        passed = anotherFieldValue.some(item => item.value == value);
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            other: anotherfieldName
                        }
                    };
                };
            },
            integer: () => {
                return ({ value, path }) => {
                    let passed = false;
                    if (['string', 'number'].includes(typeof value)) {
                        passed = !isNaN(Number(value)) && Number(value) == Math.floor(Number(value));
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            ip: () => {
                return ({ value, path }) => {
                    return {
                        passed: IPValidator.isIP(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            ipv4: () => {
                return ({ value, path }) => {
                    return {
                        passed: IPValidator.isIPV4(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            ipv6: () => {
                return ({ value, path }) => {
                    return {
                        passed: IPValidator.isIPV6(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            json: () => {
                return ({ value, path }) => {
                    let passed = false;
                    if (typeof value === 'string') {
                        try {
                            JSON.parse(value);
                            passed = true;
                        }
                        catch { }
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            lt: ({ ruleParams, fieldRulesArray }) => {
                const otherFieldValue = this.context.data.get(ruleParams[0]);
                return ({ value, path }) => {
                    let valueType = this.helpers.getDataType(value);
                    const isInteger = fieldRulesArray.find(fieldRule => fieldRule.name === 'integer');
                    const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                    const response = {
                        passed: false,
                        type: (isInteger || valueType == 'numeric') ? 'numeric' : (isArray ? 'array' : (valueType === 'file' ? 'file' : 'string')),
                        placeholder: {
                            attribute: path.join('.'),
                            value: ruleParams[0]
                        }
                    };
                    if (valueType && !Array.isArray(otherFieldValue)) {
                        const otherFieldValueType = this.helpers.getDataType(otherFieldValue.value);
                        if (otherFieldValueType) {
                            let valueSize = this.helpers.getSize(value, valueType, !!isInteger);
                            const otherFieldValueSize = this.helpers.getSize(otherFieldValue.value, otherFieldValueType, !!isInteger || valueType === 'numeric');
                            response.placeholder.value = otherFieldValueSize.toString();
                            if (valueType === otherFieldValueType)
                                response.passed = valueSize < otherFieldValueSize;
                        }
                    }
                    return response;
                };
            },
            lte: ({ ruleParams, fieldRulesArray }) => {
                const otherFieldValue = this.context.data.get(ruleParams[0]);
                return ({ value, path }) => {
                    let valueType = this.helpers.getDataType(value);
                    const isInteger = fieldRulesArray.find(fieldRule => fieldRule.name === 'integer');
                    const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                    const response = {
                        passed: false,
                        type: (isInteger || valueType == 'numeric') ? 'numeric' : (isArray ? 'array' : (valueType === 'file' ? 'file' : 'string')),
                        placeholder: {
                            attribute: path.join('.'),
                            value: ruleParams[0]
                        }
                    };
                    if (valueType && !Array.isArray(otherFieldValue)) {
                        const otherFieldValueType = this.helpers.getDataType(otherFieldValue.value);
                        if (otherFieldValueType) {
                            let valueSize = this.helpers.getSize(value, valueType, !!isInteger);
                            const otherFieldValueSize = this.helpers.getSize(otherFieldValue.value, otherFieldValueType, !!isInteger || valueType === 'numeric');
                            response.placeholder.value = otherFieldValueSize.toString();
                            if (valueType === otherFieldValueType)
                                response.passed = valueSize <= otherFieldValueSize;
                        }
                    }
                    return response;
                };
            },
            lowercase: () => {
                return ({ value, path }) => {
                    let passed = false;
                    if (typeof value === 'string') {
                        passed = value.toLowerCase() === value;
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            list: () => {
                return ({ value, path }) => {
                    let passed = false;
                    if (Array.isArray(value))
                        passed = true;
                    else if (isPlainObject(value)) {
                        passed = Object.entries(value).every(([key], index) => key == index.toString());
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            mac_address: () => {
                return ({ value, path }) => {
                    return {
                        passed: typeof value === 'string' && isMacAddress(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            max: ({ ruleParams, fieldRulesArray }) => {
                return ({ value, path }) => {
                    let valueType = this.helpers.getDataType(value);
                    const isInteger = fieldRulesArray.find(fieldRule => fieldRule.name === 'integer');
                    const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                    const response = {
                        passed: value === null,
                        type: isInteger ? 'numeric' : (isArray ? 'array' : (valueType === 'file' ? 'file' : 'string')),
                        placeholder: {
                            attribute: path.join('.'),
                            max: ruleParams[0]
                        }
                    };
                    if (valueType) {
                        let valueSize = this.helpers.getSize(value, valueType, !!isInteger);
                        const max = !ruleParams[0].trim() ? NaN : Number(ruleParams[0]);
                        if (isNaN(max))
                            throw new Error(`The given value "${ruleParams[0]}" does not represent a valid number.`);
                        response.passed = valueSize <= max;
                    }
                    return response;
                };
            },
            max_digits: ({ ruleParams }) => {
                const max = parseFloat(ruleParams[0]);
                return ({ value, path }) => {
                    let passed = value === null;
                    if (!isNaN(max) && ['string', 'number'].includes(typeof value)) {
                        const stringValue = String(value).trim();
                        if (/^[0-9]+$/.test(stringValue)) {
                            passed = stringValue.length <= max;
                        }
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            max: ruleParams[0]
                        }
                    };
                };
            },
            mimetypes: ({ ruleParams }) => {
                return ({ value, path }) => {
                    return {
                        passed: value instanceof File && ruleParams.includes(value.type),
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(' / ')
                        }
                    };
                };
            },
            min: ({ ruleParams, fieldRulesArray }) => {
                return ({ value, path }) => {
                    let valueType = this.helpers.getDataType(value);
                    const isInteger = fieldRulesArray.find(fieldRule => fieldRule.name === 'integer');
                    const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                    const response = {
                        passed: false,
                        type: isInteger ? 'numeric' : (isArray ? 'array' : (valueType === 'file' ? 'file' : 'string')),
                        placeholder: {
                            attribute: path.join('.'),
                            min: ruleParams[0]
                        }
                    };
                    if (valueType || value === null) {
                        let valueSize = value === null || !valueType ? 0 : this.helpers.getSize(value, valueType, !!isInteger);
                        const min = !ruleParams[0].trim() ? NaN : Number(ruleParams[0]);
                        if (isNaN(min))
                            throw new Error(`The given value "${ruleParams[0]}" does not represent a valid number.`);
                        response.passed = valueSize >= min;
                    }
                    return response;
                };
            },
            min_digits: ({ ruleParams }) => {
                const max = parseFloat(ruleParams[0]);
                return ({ value, path }) => {
                    let passed = !isNaN(max) && max === 0 && value === null;
                    if (!isNaN(max) && ['string', 'number'].includes(typeof value)) {
                        const stringValue = String(value).trim();
                        if (/^[0-9]+$/.test(stringValue)) {
                            passed = stringValue.length >= max;
                        }
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            min: ruleParams[0]
                        }
                    };
                };
            },
            multiple_of: ({ ruleParams }) => {
                const multipleOfValue = Number(ruleParams[0]);
                return ({ value, path }) => {
                    let passed = false;
                    if (!!value && !isNaN(multipleOfValue)) {
                        const valueNumber = Number(value);
                        passed = !isNaN(valueNumber) && valueNumber % multipleOfValue === 0;
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            value: ruleParams[0]
                        }
                    };
                };
            },
            missing: () => {
                return ({ value, path }) => {
                    return {
                        passed: value === undefined,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            missing_if: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !ifCondition.passed || value === undefined,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            value: ifCondition.otherValue
                        }
                    };
                };
            },
            missing_unless: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !!ifCondition.passed || value === undefined,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            value: ifCondition.otherValue
                        }
                    };
                };
            },
            missing_with: ({ ruleParams }) => {
                const withCondition = ruleParams.some(otherField => {
                    const otherFieldValue = this.context.data.get(otherField);
                    if (Array.isArray(otherFieldValue))
                        return false;
                    return otherFieldValue.value !== undefined;
                });
                return ({ value, path }) => {
                    return {
                        passed: !withCondition || value === undefined,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            values: ruleParams.join(' | ')
                        }
                    };
                };
            },
            missing_with_all: ({ ruleParams }) => {
                const withAllCondition = ruleParams.every(otherField => {
                    const otherFieldValue = this.context.data.get(otherField);
                    if (Array.isArray(otherFieldValue))
                        return false;
                    return otherFieldValue.value !== undefined;
                });
                return ({ value, path }) => {
                    return {
                        passed: !withAllCondition || value === undefined,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            values: ruleParams.join(' | ')
                        }
                    };
                };
            },
            not_in: ({ ruleParams, fieldRulesArray }) => {
                const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                return ({ value, path }) => {
                    let passed = false;
                    if (Array.isArray(value) || isPlainObject(value)) {
                        if (isArray) {
                            passed = Object.values(value).every(item => {
                                return !ruleParams.some(ruleParam => ruleParam == item);
                            });
                        }
                    }
                    else {
                        passed = !ruleParams.some(ruleParam => ruleParam == value);
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            not_regex: ({ fieldName, ruleParams }) => {
                const extractedRegex = this.helpers.extractRegexFromString(ruleParams[0]);
                if (!extractedRegex)
                    throw new Error(`Invalid Regex provided for the field ${fieldName}`);
                const regex = new RegExp(extractedRegex.pattern, extractedRegex.flags);
                return ({ value, path }) => {
                    let passed = false;
                    if (['string', 'number'].includes(typeof value)) {
                        passed = !regex.test(String(value));
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            numeric: () => {
                return ({ value, path }) => {
                    return {
                        passed: ['string', 'number'].includes(typeof value) && !isNaN(Number(value)),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            password: ({ ruleParams }) => {
                const passwordFlags = {
                    letters: ruleParams.includes('letters'),
                    mixed: ruleParams.includes('mixed'),
                    numbers: ruleParams.includes('numbers'),
                    symbols: ruleParams.includes('symbols')
                };
                return ({ value, path }) => {
                    const letters = !passwordFlags.letters || /[\p{L}]/ug.test(value);
                    const mixed = !passwordFlags.mixed || /^(?=.*\p{Lu})(?=.*\p{Ll}).*$/gu.test(value);
                    const numbers = !passwordFlags.numbers || /[0-9]/.test(value);
                    const symbols = !passwordFlags.numbers || /[\p{P}\p{S}]/u.test(value);
                    return {
                        passed: letters && mixed && numbers && symbols,
                        passwordChecks: {
                            letters,
                            mixed,
                            numbers,
                            symbols
                        },
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            present: () => {
                return ({ value, path }) => {
                    return {
                        passed: value !== undefined,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            present_if: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !ifCondition.passed || value !== undefined,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            value: ifCondition.otherValue
                        }
                    };
                };
            },
            present_unless: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !!ifCondition.passed || value !== undefined,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            value: ifCondition.otherValue
                        }
                    };
                };
            },
            present_with: ({ ruleParams }) => {
                const withCondition = ruleParams.some(otherField => {
                    const otherFieldValue = this.context.data.get(otherField);
                    if (Array.isArray(otherFieldValue))
                        return false;
                    return otherFieldValue.value !== undefined;
                });
                return ({ value, path }) => {
                    return {
                        passed: !withCondition || value !== undefined,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            values: ruleParams.join(' / ')
                        }
                    };
                };
            },
            present_with_all: ({ ruleParams }) => {
                const withAllCondition = ruleParams.every(otherField => {
                    const otherFieldValue = this.context.data.get(otherField);
                    if (Array.isArray(otherFieldValue))
                        return false;
                    return otherFieldValue.value !== undefined;
                });
                return ({ value, path }) => {
                    return {
                        passed: !withAllCondition || value !== undefined,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            values: ruleParams.join(' / ')
                        }
                    };
                };
            },
            prohibited: () => {
                return ({ value, path }) => {
                    let passed = false;
                    if (value === undefined || (typeof value === 'string' && !value.trim()))
                        passed = true;
                    else if (value === null)
                        passed = true;
                    else if (Array.isArray(value) || isPlainObject(value))
                        passed = Object.keys(value).length === 0;
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            prohibited_if: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !ifCondition.passed || this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            value: ifCondition.otherValue
                        }
                    };
                };
            },
            prohibited_unless: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !!ifCondition.passed || this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            values: ruleParams.slice(1).join(', ')
                        }
                    };
                };
            },
            prohibits: ({ ruleParams }) => {
                const areAllOtherFieldEmpty = ruleParams.every(otherField => {
                    const otherFieldValue = this.context.data.get(otherField);
                    if (Array.isArray(otherFieldValue))
                        return true;
                    return this.helpers.isEmpty(otherFieldValue.value);
                });
                return ({ value, path }) => {
                    return {
                        passed: this.helpers.isEmpty(value) || areAllOtherFieldEmpty,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams.join(' / ')
                        }
                    };
                };
            },
            regex: ({ fieldName, ruleParams }) => {
                const extractedRegex = this.helpers.extractRegexFromString(ruleParams[0]);
                if (!extractedRegex)
                    throw new Error(`Invalid Regex provided for the field ${fieldName}`);
                const regex = new RegExp(extractedRegex.pattern, extractedRegex.flags);
                return ({ value, path }) => {
                    let passed = false;
                    if (['string', 'number'].includes(typeof value)) {
                        passed = regex.test(String(value));
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            required: () => {
                return ({ value, path }) => {
                    return {
                        passed: !this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            required_if: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !ifCondition.passed || !this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            value: ifCondition.otherValue
                        }
                    };
                };
            },
            required_if_accepted: ({ ruleParams }) => {
                const otherFieldValue = this.context.data.get(ruleParams[0]);
                const ifAcceptedCondition = !Array.isArray(otherFieldValue) && this.helpers.isAccepted(otherFieldValue.value);
                return ({ value, path }) => {
                    return {
                        passed: !ifAcceptedCondition || !this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0]
                        }
                    };
                };
            },
            required_if_declined: ({ ruleParams }) => {
                const otherFieldValue = this.context.data.get(ruleParams[0]);
                const ifAcceptedCondition = !Array.isArray(otherFieldValue) && this.helpers.isDeclined(otherFieldValue.value);
                return ({ value, path }) => {
                    return {
                        passed: !ifAcceptedCondition || !this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0]
                        }
                    };
                };
            },
            required_unless: ({ ruleParams }) => {
                const ifCondition = this.helpers.if(ruleParams);
                return ({ value, path }) => {
                    return {
                        passed: !!ifCondition.passed || !this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0],
                            values: ruleParams.slice(1).join(', ')
                        }
                    };
                };
            },
            required_with: ({ ruleParams }) => {
                const withCondition = ruleParams.some(otherField => {
                    const otherFieldValue = this.context.data.get(otherField);
                    return !Array.isArray(otherFieldValue) && !this.helpers.isEmpty(otherFieldValue.value);
                });
                return ({ value, path }) => {
                    return {
                        passed: !withCondition || !this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(' / ')
                        }
                    };
                };
            },
            required_with_all: ({ ruleParams }) => {
                const withAllCondition = ruleParams.every(otherField => {
                    const otherFieldValue = this.context.data.get(otherField);
                    return !Array.isArray(otherFieldValue) && !this.helpers.isEmpty(otherFieldValue.value);
                });
                return ({ value, path }) => {
                    return {
                        passed: !withAllCondition || !this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(' / ')
                        }
                    };
                };
            },
            required_without: ({ ruleParams }) => {
                const withoutCondition = ruleParams.some(otherField => {
                    const otherFieldValue = this.context.data.get(otherField);
                    return Array.isArray(otherFieldValue) || this.helpers.isEmpty(otherFieldValue.value);
                });
                return ({ value, path }) => {
                    return {
                        passed: !withoutCondition || !this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(' / ')
                        }
                    };
                };
            },
            required_without_all: ({ ruleParams }) => {
                const withoutAllCondition = ruleParams.every(otherField => {
                    const otherFieldValue = this.context.data.get(otherField);
                    return Array.isArray(otherFieldValue) || this.helpers.isEmpty(otherFieldValue.value);
                });
                return ({ value, path }) => {
                    return {
                        passed: !withoutAllCondition || !this.helpers.isEmpty(value),
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(' / ')
                        }
                    };
                };
            },
            required_array_keys: ({ ruleParams }) => {
                return ({ value, path }) => {
                    let passed = false;
                    if (Array.isArray(value) || isPlainObject(value)) {
                        const valueEntries = Object.keys(value);
                        passed = ruleParams.every(ruleParam => valueEntries.includes(ruleParam));
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(', ')
                        }
                    };
                };
            },
            same: ({ ruleParams }) => {
                const otherFieldValue = this.context.data.get(ruleParams[0]);
                return ({ value, path }) => {
                    let passed = false;
                    if (!Array.isArray(otherFieldValue)) {
                        passed = isSame(value, otherFieldValue.value);
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            other: ruleParams[0]
                        }
                    };
                };
            },
            size: ({ ruleParams, fieldRulesArray }) => {
                return ({ value, path }) => {
                    let valueType = this.helpers.getDataType(value);
                    const isInteger = fieldRulesArray.find(fieldRule => fieldRule.name === 'integer');
                    const isArray = fieldRulesArray.find(fieldRule => fieldRule.name === 'array');
                    const response = {
                        passed: false,
                        type: isInteger ? 'numeric' : (isArray ? 'array' : (valueType === 'file' ? 'file' : 'string')),
                        placeholder: {
                            attribute: path.join('.'),
                            size: ruleParams[0]
                        }
                    };
                    if (valueType) {
                        let valueSize = this.helpers.getSize(value, valueType, !!isInteger);
                        const size = !ruleParams[0] || !ruleParams[0].trim() ? NaN : Number(ruleParams[0]);
                        if (isNaN(size))
                            throw new Error(`The given value "${ruleParams[0]}" does not represent a valid number.`);
                        response.passed = valueSize === size;
                    }
                    return response;
                };
            },
            starts_with: ({ ruleParams }) => {
                return ({ value, path }) => {
                    let passed = false;
                    if (['string', 'number'].includes(typeof value)) {
                        const stringValue = String(value);
                        passed = ruleParams.some(ruleParam => ruleParam && stringValue.startsWith(ruleParam));
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.'),
                            values: ruleParams.join(', ') || 'empty'
                        }
                    };
                };
            },
            string: () => {
                return ({ value, path }) => {
                    return {
                        passed: typeof value === 'string',
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            uppercase: () => {
                return ({ value, path }) => {
                    let passed = false;
                    if (typeof value === 'string') {
                        passed = value.toUpperCase() === value;
                    }
                    return {
                        passed,
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            url: ({ ruleParams }) => {
                ruleParams = ruleParams.map(ruleParam => ruleParam.trim());
                return ({ value, path }) => {
                    return {
                        passed: typeof value === 'string' && isValidUrl(value, ruleParams),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            ulid: () => {
                return ({ value, path }) => {
                    return {
                        passed: typeof value === 'string' && IdentifierValidator.isValidULID(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            },
            uuid: () => {
                return ({ value, path }) => {
                    return {
                        passed: typeof value === 'string' && IdentifierValidator.isValidUUID(value),
                        placeholder: {
                            attribute: path.join('.')
                        }
                    };
                };
            }
        };
        this.helpers = {
            if: (ruleParams) => {
                const [otherFieldName, ...definedValues] = ruleParams;
                const dataResult = this.context.data.get(otherFieldName);
                if (Array.isArray(dataResult))
                    return { passed: false };
                const enrichedRuleValues = definedValues.flatMap((item) => {
                    if (item === 'true')
                        return [item, true];
                    if (item === 'false')
                        return [item, false];
                    if (/^[0-9]+$/.test(item))
                        return [item, parseInt(item, 10)];
                    return [item];
                });
                const valueToCheck = dataResult.value;
                return {
                    passed: enrichedRuleValues.includes(valueToCheck),
                    otherValue: dataResult.value
                };
            },
            isEmpty: (value) => {
                if (value === undefined || (typeof value === 'string' && !value.trim()))
                    return true;
                else if (value === null)
                    return true;
                else if (Array.isArray(value) || isPlainObject(value))
                    return Object.keys(value).length === 0;
                return false;
            },
            extractRegexFromString: (string) => {
                const match = /^\/(.*?)\/(.*?)$/.exec(string);
                if (!match)
                    return null;
                return {
                    pattern: match[1],
                    flags: match[2]
                };
            },
            isAccepted: (value) => {
                return ['yes', 'on', 1, '1', true, 'true'].includes(value);
            },
            isDeclined: (value) => {
                return ['no', 'off', 0, '0', false, 'false'].includes(value);
            },
            getDataType: (value) => {
                if (Array.isArray(value) || isPlainObject(value))
                    return 'array';
                if (['string', 'number'].includes(typeof value)) {
                    if (!isNaN(Number(value)))
                        return 'numeric';
                    return 'string';
                }
                if (value instanceof File)
                    return 'file';
                return null;
            },
            getSize: (value, valueType, isInteger) => {
                if (valueType === 'string' || valueType === 'numeric') {
                    return (isInteger && valueType === 'numeric') ? Number(value) : String(value).length;
                }
                else if (valueType === 'array') {
                    return Object.keys(value).length;
                }
                return value.size / 1000;
            }
        };
        this.context = context;
    }
}

class RulesConfig {
}
RulesConfig.minimumRequiredParamsCount = {
    accepted_if: 2,
    after: 1,
    after_or_equal: 1,
    between: 2,
    decimal: 1,
    declined_if: 2,
    different: 1,
    digits: 1,
    digits_between: 2,
    dimensions: 1,
    exclude_if: 2,
    exclude_unless: 2,
    exclude_with: 1,
    exclude_without: 1,
    gt: 1,
    gte: 1,
    in_array: 1,
    lt: 1,
    lte: 1,
    max: 1,
    max_digits: 1,
    multiple_of: 1,
    missing_if: 2,
    missing_unless: 2,
    missing_with: 1,
    missing_with_all: 1,
    not_regex: 1,
    present_if: 2,
    present_unless: 2,
    present_with: 1,
    present_with_all: 1,
    prohibited_if: 2,
    prohibited_unless: 2,
    required_if: 2,
    required_if_accepted: 1,
    required_if_declined: 1,
    required_unless: 2,
    same: 1,
    size: 1
};
RulesConfig.validateEvenDataIsEmpty = [
    'accepted',
    'accepted_if',
    'decimal',
    'declined_if',
    'filled',
    'missing',
    'missing_if',
    'missing_unless',
    'missing_with',
    'missing_with_all',
    'present',
    'present_if',
    'present_unless',
    'present_with',
    'present_with_all',
    'prohibited',
    'prohibited_if',
    'prohibited_unless',
    'prohibits',
    'required',
    'required_array_keys',
    'required_if',
    'required_if_accepted',
    'required_if_declined',
    'required_unless',
    'required_with',
    'required_with_all',
    'required_without',
    'required_without_all',
];

class Validator {
    constructor(input, rules, messages = {}, attributes = {}) {
        this.validationResult = {
            isValidated: false,
            validated: {},
            failed: null,
            errors: {},
            messages: {}
        };
        this.errors = {
            first: async (fieldName) => {
                var _a;
                await this.executeValidation();
                if (fieldName) {
                    const fieldMessageKey = Object.keys(this.validationResult.messages).find((messageFieldName) => {
                        let fieldNameRegexString = fieldName.replace(/\./g, '\\.').replace(/\*/g, '.+');
                        return new RegExp(`^${fieldNameRegexString}$`, 'g').test(messageFieldName);
                    });
                    return fieldMessageKey ? this.validationResult.messages[fieldMessageKey][0] : '';
                }
                return ((_a = Object.values(this.validationResult.messages)[0]) === null || _a === undefined ? undefined : _a[0]) || '';
            },
            get: async (fieldName) => {
                var _a;
                await this.executeValidation();
                const fieldMessages = Object.entries(this.validationResult.messages).filter(([messageFieldName]) => {
                    let fieldNameRegexString = fieldName.replace(/\./g, '\\.').replace(/\*/g, '.+');
                    return new RegExp(`^${fieldNameRegexString}$`, 'g').test(messageFieldName);
                });
                return fieldName.includes('*') ? Object.fromEntries(fieldMessages) : ((_a = fieldMessages[0]) === null || _a === undefined ? undefined : _a[1]) || '';
            },
            all: async () => {
                await this.executeValidation();
                return this.validationResult.messages;
            },
            add: async (key, value) => {
                await this.executeValidation();
                if (!(key in this.validationResult.messages)) {
                    this.validationResult.messages[key] = [value];
                }
                else {
                    this.validationResult.messages[key].push(value);
                }
                return this.validationResult.messages;
            },
            merge: async (messages) => {
                await this.executeValidation();
                Object.entries(messages).forEach(([key, value]) => {
                    if (!(key in this.validationResult.messages)) {
                        this.validationResult.messages[key] = typeof value === 'string' ? [value] : value;
                    }
                    else {
                        this.validationResult.messages[key] = [...this.validationResult.messages[key], ...(typeof value === 'string' ? [value] : value)];
                    }
                });
                return this.validationResult.messages;
            }
        };
        this.shouldRunValidation = (value, ruleName) => {
            return (ruleName in Validator.customRules ||
                (ruleName in this.validationHandler.handlers && (RulesConfig.validateEvenDataIsEmpty.includes(ruleName) ||
                    (value !== undefined &&
                        (typeof value !== 'string' || value.trim() !== '')))));
        };
        const mappedRules = Object.fromEntries(Object.entries(rules).map(([fieldName, fieldRules]) => {
            return [fieldName, (typeof fieldRules === 'string' ? fieldRules.split('|') : typeof fieldRules === 'function' ? [fieldRules] : fieldRules)];
        }));
        this.context = {
            data: new ValidatorData(input),
            rules: mappedRules,
            customMessages: messages,
            attributes,
            errors: {},
            sometimes: [],
            afterCallbacks: [],
            stopOnFirstFailure: false
        };
        this.validationHandler = new ValidationHandler(this.context);
    }
    static make(input, rules, messages, attributes) {
        return new Validator(input, rules, messages, attributes);
    }
    async fails() {
        await this.executeValidation();
        return this.validationResult.failed;
    }
    async passes() {
        await this.executeValidation();
        return !this.validationResult.failed;
    }
    getData() {
        return this.context.data.value;
    }
    getRules() {
        return this.context.rules;
    }
    sometimes(field, rules, condition) {
        this.context.sometimes.push({ field, rules, condition });
    }
    after(callback) {
        this.context.afterCallbacks.push(callback);
    }
    async messages() {
        await this.executeValidation();
        return this.validationResult.messages;
    }
    setRules(rules) {
        const rulesArray = Object.entries(rules);
        this.context.rules = Object.fromEntries(rulesArray.map(([fieldName, fieldRules]) => {
            return [fieldName, typeof fieldRules === 'string' ? fieldRules.split('|') : typeof fieldRules === 'function' ? [fieldRules] : fieldRules];
        }));
    }
    addRules(rules) {
        const rulesArray = Object.entries(rules);
        for (const rulesArrayItem of rulesArray) {
            const [fieldName, fieldRules] = [rulesArrayItem[0], typeof rulesArrayItem[1] === 'string' ? rulesArrayItem[1].split('|') : typeof rulesArrayItem[1] === 'function' ? [rulesArrayItem[1]] : rulesArrayItem[1]];
            if (!(fieldName in this.context.rules)) {
                this.context.rules[fieldName] = (fieldRules);
            }
            else {
                this.context.rules[fieldName] = Array.from(new Set([...this.context.rules[fieldName], ...fieldRules]));
            }
        }
    }
    addCustomAttributes(attributes) {
        this.context.attributes = { ...this.context.attributes, ...attributes };
    }
    setCustomMessages(messages) {
        this.context.customMessages = { ...this.context.customMessages, ...messages };
    }
    static addCustomRule(name, callback, message) {
        this.customRules[name] = {
            callback,
            message
        };
        if (message)
            validatorDefaultMessages[name] = message;
    }
    stopOnFirstFailure() {
        this.context.stopOnFirstFailure = true;
    }
    async validateField(fieldName, fieldRules) {
        const fieldValue = this.context.data.get(fieldName);
        const fieldValueArray = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
        const hasBailRule = fieldRules.some((rule) => rule.name === 'bail');
        const isNullable = fieldRules.some((rule) => rule.name === 'nullable');
        const validationResultResponse = {
            result: {},
            validateNext: true
        };
        for (const fieldValueItem of fieldValueArray) {
            const fieldValidationResult = [];
            for (const { name: ruleName, params: ruleParams } of fieldRules) {
                if (isNullable && fieldValueItem.value === null) {
                    if (isNullable && fieldValueItem.value === null) {
                        fieldValidationResult.push([typeof ruleName == 'string' ? ruleName : '', { passed: true }]);
                        continue;
                    }
                }
                if (typeof ruleName !== 'function') {
                    if (!this.shouldRunValidation(fieldValueItem.value, ruleName)) {
                        fieldValidationResult.push([ruleName, { passed: true }]);
                        continue;
                    }
                    this.validateRuleParams(ruleName, ruleParams);
                    const validationHandlerArguments = {
                        fieldName,
                        fieldValue,
                        fieldRulesArray: fieldRules.filter(({ name }) => typeof name !== 'function'),
                        ruleName,
                        ruleParams,
                    };
                    const validatorMethod = ruleName in Validator.customRules ? this.runCustomRule(validationHandlerArguments) : this.validationHandler.handlers[ruleName](validationHandlerArguments);
                    const result = await validatorMethod(fieldValueItem);
                    fieldValidationResult.push([ruleName, result]);
                    if (!result.passed && hasBailRule)
                        break;
                }
                else {
                    fieldValidationResult.push(['', this.runInlineRule(ruleName, fieldValueItem)]);
                }
            }
            validationResultResponse.result[fieldValueItem.path.join('.')] = fieldValidationResult;
            if (this.context.stopOnFirstFailure && Object.values(fieldValidationResult).some(item => !item[1].passed)) {
                validationResultResponse.validateNext = false;
                break;
            }
        }
        return validationResultResponse;
    }
    async executeValidation() {
        if (this.validationResult.isValidated)
            return;
        this.validationResult.isValidated = true;
        let totalValidationResult = {};
        const fieldRuleArray = Object.entries(this.context.rules);
        let validateNext = true;
        for (const [fieldName, fieldRules] of fieldRuleArray) {
            const rulesArray = this.parseRules(fieldRules);
            const validationResult = await this.validateField(fieldName, rulesArray);
            totalValidationResult = { ...totalValidationResult, ...validationResult.result };
            if (!validationResult.validateNext) {
                validateNext = false;
                break;
            }
        }
        if (validateNext)
            await this.handleConditionalValidation(totalValidationResult);
        this.processValidationMessages(totalValidationResult);
        this.validationResult.failed = Object.keys(this.validationResult.messages).length > 0;
        this.runAfterCallbacks();
    }
    runCustomRule({ ruleName, ruleParams }) {
        return ({ value, key, path }) => {
            return {
                passed: Validator.customRules[ruleName].callback(key, value, ruleParams, this),
                placeholder: {
                    attribute: path.join('.')
                }
            };
        };
    }
    validateRuleParams(ruleName, ruleParams) {
        if (ruleName in RulesConfig.minimumRequiredParamsCount &&
            ruleParams.length < RulesConfig.minimumRequiredParamsCount[ruleName]) {
            const ruleCount = RulesConfig.minimumRequiredParamsCount[ruleName];
            throw new Error(`Validation rule "${ruleName}" requires at least ${ruleCount} parameter${ruleCount > 1 ? 's' : ''}.`);
        }
    }
    runInlineRule(ruleName, fieldValueItem) {
        const result = { passed: true, message: '', placeholder: { attribute: fieldValueItem.key } };
        const fail = (message) => {
            result.passed = false;
            result.message = message;
        };
        ruleName(fieldValueItem.key, fieldValueItem.value, fail);
        return result;
    }
    parseRules(fieldRules) {
        return fieldRules.map(fieldRule => {
            const [fieldRuleName, ruleParams] = typeof fieldRule === 'string' ? fieldRule.split(':') : [fieldRule, ''];
            return {
                name: fieldRuleName,
                params: ruleParams === undefined ? [] : ruleParams.split(',')
            };
        });
    }
    async handleConditionalValidation(totalValidationResult) {
        for (const { field, rules, condition } of this.context.sometimes) {
            const fieldValue = this.context.data.get(field);
            const pathOfItem = (Array.isArray(fieldValue) ? fieldValue[0] : fieldValue).path;
            const item = pathOfItem.length > 1 ? this.context.data.get(pathOfItem.slice(0, -1).join('.')).value : undefined;
            if (!condition(this.context.data.value, item))
                continue;
            const rulesArray = this.parseRules(typeof rules === 'string' ? rules.split('|') : typeof rules === 'function' ? [rules] : rules);
            const validationResult = await this.validateField(field, rulesArray);
            this.mergeValidationResults(totalValidationResult, validationResult);
            if (!validationResult.validateNext)
                break;
        }
    }
    processValidationMessages(totalValidationResult) {
        const messages = this.validationResult.messages;
        Object.entries(totalValidationResult).forEach(([fieldName, validatedRules]) => {
            const fieldErrors = validatedRules.filter(([_, result]) => !result.passed);
            fieldErrors.forEach(([ruleName, result]) => {
                if (!(fieldName in messages))
                    messages[fieldName] = [];
                const errorMessage = !ruleName ? result.message : this.createErrorMessage(ruleName, result.type || null, fieldName, result.placeholder || {});
                if (!messages[fieldName].includes(errorMessage))
                    messages[fieldName].push(errorMessage);
            });
            if (fieldErrors.length) {
                this.validationResult.errors[fieldName] = fieldErrors;
            }
        });
        this.validationResult.failed = Object.keys(messages).length > 0;
    }
    mergeValidationResults(totalValidationResult, validationResult) {
        Object.entries(validationResult.result).forEach(([fieldName, result]) => {
            if (!(fieldName in totalValidationResult))
                totalValidationResult[fieldName] = result;
            else
                totalValidationResult[fieldName] = [...totalValidationResult[fieldName], ...result];
        });
    }
    runAfterCallbacks() {
        this.context.afterCallbacks.forEach(afterCallback => afterCallback(this));
    }
    createErrorMessage(ruleName, ruleValueType = null, fieldName, placeholder) {
        const { customMessages } = this.context;
        const customMessageKeys = Object.keys(customMessages).sort((a, b) => (a.split('*').length - 1) - (b.split('*').length - 1));
        const getCustomMessageKeyRegex = (customMessageKey) => {
            const escapedKey = customMessageKey.replace(/\./g, '\\.').replace(/\*/g, '.+');
            return new RegExp(`^${escapedKey}$`, 'g');
        };
        const findCustomMessageKey = (keys, targets) => {
            let foundKey;
            for (let target of targets) {
                foundKey = keys.find((key) => {
                    return getCustomMessageKeyRegex(key).test(target);
                });
                if (foundKey)
                    break;
            }
            return foundKey;
        };
        const customMessageTargetKeys = [`${fieldName}.${ruleName}`, ruleName, fieldName];
        const foundCustomMessageKey = findCustomMessageKey(customMessageKeys, customMessageTargetKeys);
        const defaultInvalidMessage = `The :attribute is invalid.`;
        const _message = foundCustomMessageKey ? customMessages[foundCustomMessageKey] : validatorDefaultMessages[ruleName];
        const message = _message === undefined
            ? defaultInvalidMessage
            : typeof _message !== 'string'
                ? (ruleValueType && _message[ruleValueType]) || defaultInvalidMessage
                : _message;
        return message.replace(/:(.*?)(\s|$|\.)/g, (match, placeholderKey, group2) => {
            placeholderKey = placeholderKey.trim();
            if (placeholderKey === 'attribute') {
                const attributesKeyList = Object.keys(this.context.attributes).sort((a, b) => (a.split('*').length - 1) - (b.split('*').length - 1));
                const customAttributeKey = attributesKeyList.find(key => new RegExp(`^${key.replace(/\./g, '\\.').replace(/\*/g, '.+')}$`, "g").test(fieldName));
                if (customAttributeKey) {
                    return this.context.attributes[customAttributeKey] + group2;
                }
            }
            return placeholderKey in placeholder ? placeholder[placeholderKey] + group2 : match;
        });
    }
}
Validator.customRules = {};

module.exports = Validator;
