import IPValidator from "../utils/ip-validator.js";
import isPlainObject from "../utils/is-plain-object.js";
import isSame from "../utils/is-same.js";
import isMacAddress from "../utils/mac-address-validator.js";
import { isValidUrl } from "../utils/url-validator.js";
import validateHexColor from "../utils/validate-hex-color.js";
import EmailValidator from "../utils/email-validator.js";
export default class ValidationHandler {
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
                        ;
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
                    ;
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
                        const decimalPlaces = ((_a = String(value).split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
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
