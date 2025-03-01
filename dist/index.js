import validatorDefaultMessages from "./locale/messages";
import ValidatorData from "./core/validator-data";
import ValidationHandler from "./core/validation-handler";
import RulesConfig from "./config/rules-config";
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
                return ((_a = Object.values(this.validationResult.messages)[0]) === null || _a === void 0 ? void 0 : _a[0]) || '';
            },
            get: async (fieldName) => {
                var _a;
                await this.executeValidation();
                const fieldMessages = Object.entries(this.validationResult.messages).filter(([messageFieldName]) => {
                    let fieldNameRegexString = fieldName.replace(/\./g, '\\.').replace(/\*/g, '.+');
                    return new RegExp(`^${fieldNameRegexString}$`, 'g').test(messageFieldName);
                });
                return fieldName.includes('*') ? Object.fromEntries(fieldMessages) : ((_a = fieldMessages[0]) === null || _a === void 0 ? void 0 : _a[1]) || '';
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
export default Validator;
