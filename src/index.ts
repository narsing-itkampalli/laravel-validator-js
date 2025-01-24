import validatorDefaultMessages from "./locale/messages.js";
import ValidatorContext, { ValidatorAttributes, ValidatorInput, ValidatorCustomMessages, ValidatorRules, InlineValidatorRuleMethod, ValidatorContextRules } from "./types/validator-context.js";
import { ValidatorCustomRule } from "./types/validator-custom-rule.js";
import { ValidationHandlerArguments, ValidatorHandlersReturnType } from "./types/validator-handlers.js";
import { ValidationRuleNames } from "./types/validator-rule-names.js";
import ValidatorData, { ValidatorDataParsedValue } from "./core/validator-data.js";
import { FieldValidationResult, ValidationInfo, ValidationResult } from "./types/validation-info.js";
import ValidationHandler from "./core/validation-handler.js";
import RulesConfig from "./config/rules-config.js";

export default class Validator {
    private context:ValidatorContext;
    private validationHandler:ValidationHandler;
    private static customRules:ValidatorCustomRule = {};
    private validationResult:ValidationInfo = {
        isValidated: false,
        validated: {},
        failed: null,
        errors: {},
        messages: {}
    };

    // $input, $rules, $messages, $attributes
    constructor(input: ValidatorInput, rules:ValidatorRules, messages:ValidatorCustomMessages = {}, attributes:ValidatorAttributes = {}) {
        const mappedRules = Object.fromEntries(Object.entries(rules).map(([fieldName, fieldRules]) => {
            return [fieldName, (typeof fieldRules === 'string' ? fieldRules.split('|') : typeof fieldRules === 'function' ? [fieldRules] : fieldRules)]
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
        }

        this.validationHandler = new ValidationHandler(this.context);
    }

    // Create a new validator instance.
    public static make(input: ValidatorInput, rules:ValidatorRules, messages:ValidatorCustomMessages, attributes:ValidatorAttributes) {
        return new Validator(input, rules, messages, attributes);
    }

    // Check if validation failed.
    public async fails() {
        await this.executeValidation();
        return this.validationResult.failed;
    }

    // Check if validation passed.
    public async passes() {
        await this.executeValidation();
        return !this.validationResult.failed;
    }

    // Get the validation errors.
    public readonly errors = {
        first: async (fieldName?:string) => {
            await this.executeValidation();
            if(fieldName) {
                const fieldMessageKey = Object.keys(this.validationResult.messages).find((messageFieldName) => {
                    let fieldNameRegexString = fieldName.replace(/\./g, '\\.').replace(/\*/g, '.+');

                    return new RegExp(`^${fieldNameRegexString}$`, 'g').test(messageFieldName);
                });
                return fieldMessageKey ? this.validationResult.messages[fieldMessageKey][0] : '';
            }

            return Object.values(this.validationResult.messages)[0]?.[0] || '';
        },
        get: async (fieldName:string) => {
            await this.executeValidation();
            const fieldMessages = Object.entries(this.validationResult.messages).filter(([messageFieldName]) => {
                let fieldNameRegexString = fieldName.replace(/\./g, '\\.').replace(/\*/g, '.+');
                return new RegExp(`^${fieldNameRegexString}$`, 'g').test(messageFieldName);
            });

            return fieldName.includes('*') ? Object.fromEntries(fieldMessages) : fieldMessages[0]?.[1] || '';
        },
        all: async () => {
            await this.executeValidation();
            return this.validationResult.messages;
        },
        add: async (key:string, value:string) => {
            await this.executeValidation();
            if(!(key in this.validationResult.messages)) {
                this.validationResult.messages[key] = [value];
            }else {
                this.validationResult.messages[key].push(value);
            }
            return this.validationResult.messages;
        },
        merge: async (messages:{[key:string]:string[]}) => {
            await this.executeValidation();
            Object.entries(messages).forEach(([key, value]) => {
                if(!(key in this.validationResult.messages)) {
                    this.validationResult.messages[key] = typeof value === 'string' ? [value] : value;
                }else {
                    this.validationResult.messages[key] = [...this.validationResult.messages[key], ...(typeof value === 'string' ? [value] : value)];
                }
            });
            return this.validationResult.messages;
        }
    }

    // Retrieve the validated data.
    // public async validated() {

    // }

    // Retrieve the original data under validation.
    public getData() {
        return this.context.data.value;
    }

    // Retrieve the rules applied during validation.
    public getRules() {
        return this.context.rules;
    }

    // Apply rules conditionally.
    public sometimes(field: ValidatorContext['sometimes'][number]['field'], rules:ValidatorContext['sometimes'][number]['rules'], condition:ValidatorContext['sometimes'][number]['condition']) {
        this.context.sometimes.push({field, rules, condition});
    }

    // Register a callback to be executed after validation.
    public after(callback:ValidatorContext['afterCallbacks'][number]) {
        this.context.afterCallbacks.push(callback);
    }

    // Retrieve all error messages.
    public async messages() {
        await this.executeValidation();
        return this.validationResult.messages;
    }

    // Set the validation rules after initialization.
    public setRules(rules:ValidatorRules) {
        const rulesArray = Object.entries(rules);

        this.context.rules = Object.fromEntries(rulesArray.map(([fieldName, fieldRules]) => {
            return [fieldName, typeof fieldRules === 'string' ? fieldRules.split('|') : typeof fieldRules === 'function' ? [fieldRules] : fieldRules];
        }));
    }

    // Add additional rules to the existing set.
    public addRules(rules:ValidatorRules) {
        const rulesArray = Object.entries(rules);

        for(const rulesArrayItem of rulesArray) {
            const [fieldName, fieldRules] = [rulesArrayItem[0], typeof rulesArrayItem[1] === 'string' ? rulesArrayItem[1].split('|') : typeof rulesArrayItem[1] === 'function' ? [rulesArrayItem[1]] : rulesArrayItem[1]];

            if(!(fieldName in this.context.rules)) {
                this.context.rules[fieldName] = (fieldRules);
            }else {
                this.context.rules[fieldName] = Array.from(new Set([...this.context.rules[fieldName], ...fieldRules]));
            }
        }
    }

    public addCustomAttributes(attributes:ValidatorAttributes) {
        this.context.attributes = {...this.context.attributes, ...attributes};
    }

    // Dynamically set custom validation messages.
    public setCustomMessages(messages:ValidatorCustomMessages) {
        this.context.customMessages = {...this.context.customMessages, ...messages};
    }

    public static addCustomRule(name:string, callback:ValidatorCustomRule[string]['callback'], message?:ValidatorCustomRule[string]['message']) {
        this.customRules[name] = {
            callback,
            message
        };
        if(message) validatorDefaultMessages[name] = message;
    }

    // ================= Debugging =================

    public stopOnFirstFailure() {
        this.context.stopOnFirstFailure = true;
    }

    // ================= Private methods =================
    private async validateField(
        fieldName: string,
        fieldRules: { name: string | InlineValidatorRuleMethod ; params: string[] }[]
    ) {
        // Retrieve the field value from the context
        const fieldValue = this.context.data.get(fieldName);
        const fieldValueArray = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
        const hasBailRule = fieldRules.some((rule) => rule.name === 'bail');
        const isNullable = fieldRules.some((rule) => rule.name === 'nullable');

        const validationResultResponse:FieldValidationResult = {
            result: {},
            validateNext: true
        };

        for(const fieldValueItem of fieldValueArray) {
            const fieldValidationResult:[string, ValidatorHandlersReturnType][] = [];

            for(const { name: ruleName, params: ruleParams } of fieldRules) {
                if(isNullable && fieldValueItem.value === null) {
                    if(isNullable && fieldValueItem.value === null) {
                        fieldValidationResult.push([typeof ruleName == 'string' ? ruleName : '', {passed: true}]);
                        continue;
                    }
                }

                if(typeof ruleName !== 'function') {
                    if(!this.shouldRunValidation(fieldValueItem.value, ruleName)) {
                        fieldValidationResult.push([ruleName, {passed: true}]);
                        continue;
                    }

                    this.validateRuleParams(ruleName, ruleParams);

                    const validationHandlerArguments: ValidationHandlerArguments = {
                        fieldName,
                        fieldValue,
                        fieldRulesArray: fieldRules.filter(({name}) => typeof name !== 'function') as ValidationHandlerArguments['fieldRulesArray'],
                        ruleName,
                        ruleParams,
                    };

                    const validatorMethod = ruleName in Validator.customRules ? this.runCustomRule(validationHandlerArguments) : this.validationHandler.handlers[ruleName as ValidationRuleNames[number]]!(validationHandlerArguments);
                    const result = await validatorMethod(fieldValueItem);

                    fieldValidationResult.push([ruleName, result]);

                    if(!result.passed && hasBailRule) break;
                }else {
                    fieldValidationResult.push(['', this.runInlineRule(ruleName, fieldValueItem)]);
                }
            }

            validationResultResponse.result[fieldValueItem.path.join('.')] = fieldValidationResult;

            if(this.context.stopOnFirstFailure && Object.values(fieldValidationResult).some(item => !item[1].passed)) {
                validationResultResponse.validateNext = false;
                break;
            }
        }
    
        return validationResultResponse;
    }

    private async executeValidation() {
        if(this.validationResult.isValidated) return;
        this.validationResult.isValidated = true;

        let totalValidationResult:ValidationResult = {};

        const fieldRuleArray = Object.entries(this.context.rules);
        let validateNext = true;

        for(const [fieldName, fieldRules] of fieldRuleArray) {
            const rulesArray = this.parseRules(fieldRules);
            const validationResult = await this.validateField(fieldName, rulesArray);

            totalValidationResult = {...totalValidationResult, ...validationResult.result};
            if(!validationResult.validateNext) {
                validateNext = false; break;
            }
        }

        if(validateNext) await this.handleConditionalValidation(totalValidationResult);

        this.processValidationMessages(totalValidationResult);

        this.validationResult.failed = Object.keys(this.validationResult.messages).length > 0;
        this.runAfterCallbacks();
    }


    // ============ Helper functions ============
    private readonly shouldRunValidation = (value: any, ruleName: string): boolean => {
        return (
            ruleName in Validator.customRules || 
            (
                ruleName in this.validationHandler.handlers && (
                    RulesConfig.validateEvenDataIsEmpty.includes(ruleName) ||
                    (
                        value !== undefined &&
                        (typeof value !== 'string' || value.trim() !== '')
                    )
                )
            )
        );
    }

    private runCustomRule({ruleName, ruleParams}: ValidationHandlerArguments) {
        return ({value, key, path}: ValidatorDataParsedValue) => {
            return {
                passed: Validator.customRules[ruleName].callback(key, value, ruleParams, this),
                placeholder: {
                    attribute: path.join('.')
                }
            }
        }
    }

    private validateRuleParams(ruleName:string, ruleParams:string[]) {
        if (
            ruleName in RulesConfig.minimumRequiredParamsCount &&
            ruleParams.length < RulesConfig.minimumRequiredParamsCount[ruleName]
        ) {
            const ruleCount = RulesConfig.minimumRequiredParamsCount[ruleName];

            throw new Error(`Validation rule "${ruleName}" requires at least ${ruleCount} parameter${ruleCount > 1 ? 's' : ''}.`);
        }
    }

    private runInlineRule(ruleName:InlineValidatorRuleMethod, fieldValueItem:ValidatorDataParsedValue) {
        const result = { passed: true, message: '', placeholder: { attribute: fieldValueItem.key } };
        const fail = (message:string) => {
            result.passed = false;
            result.message = message;
        };
        ruleName(fieldValueItem.key, fieldValueItem.value, fail);
        return result;
    }

    private parseRules(fieldRules:ValidatorContextRules[string]) {
        return fieldRules.map(fieldRule => {
            const [fieldRuleName, ruleParams] = typeof fieldRule === 'string' ? fieldRule.split(':') : [fieldRule, ''];
            return {
                name: fieldRuleName,
                params: ruleParams === undefined ? [] : ruleParams.split(',')
            };
        });
    }

    private async handleConditionalValidation(totalValidationResult:ValidationResult) {
        for (const { field, rules, condition } of this.context.sometimes) {
            const fieldValue = this.context.data.get(field);
            const pathOfItem = (Array.isArray(fieldValue) ? fieldValue[0] : fieldValue).path;
            const item = pathOfItem.length > 1 ? (this.context.data.get(pathOfItem.slice(0, -1).join('.')) as ValidatorDataParsedValue).value : undefined;
    
            if (!condition(this.context.data.value, item)) continue;
    
            const rulesArray = this.parseRules(typeof rules === 'string' ? rules.split('|') : typeof rules === 'function' ? [rules] : rules);
            const validationResult = await this.validateField(field, rulesArray);

            this.mergeValidationResults(totalValidationResult, validationResult);
            if(!validationResult.validateNext) break;
        }
    }

    private processValidationMessages(totalValidationResult:ValidationResult) {
        const messages = this.validationResult.messages;
        Object.entries(totalValidationResult).forEach(([fieldName, validatedRules]) => {
            const fieldErrors = validatedRules.filter(([_, result]) => !result.passed);
            fieldErrors.forEach(([ruleName, result]) => {
                if (!(fieldName in messages)) messages[fieldName] = [];
                const errorMessage = !ruleName ? result.message! : this.createErrorMessage(ruleName, result.type||null, fieldName, result.placeholder || {});
                if (!messages[fieldName].includes(errorMessage)) messages[fieldName].push(errorMessage);
            });
            if (fieldErrors.length) {
                this.validationResult.errors[fieldName] = fieldErrors;
            }
        });
        this.validationResult.failed = Object.keys(messages).length > 0;
    }

    private mergeValidationResults(totalValidationResult:ValidationResult, validationResult:FieldValidationResult) {
        Object.entries(validationResult.result).forEach(([fieldName, result]) => {
            if (!(fieldName in totalValidationResult)) totalValidationResult[fieldName] = result;
            else totalValidationResult[fieldName] = [...totalValidationResult[fieldName], ...result];
        });
    }

    private runAfterCallbacks() {
        this.context.afterCallbacks.forEach(afterCallback => afterCallback(this));
    }

    private createErrorMessage(ruleName:string, ruleValueType:string|null = null, fieldName:string, placeholder:Record<string, string>) {
        const { customMessages } = this.context;
        const customMessageKeys = Object.keys(customMessages).sort((a, b) => (a.split('*').length - 1) - (b.split('*').length - 1));

        // Helper to create regex for custom message keys
        const getCustomMessageKeyRegex = (customMessageKey: string): RegExp => {
            const escapedKey = customMessageKey.replace(/\./g, '\\.').replace(/\*/g, '.+');
            return new RegExp(`^${escapedKey}$`, 'g');
        };

        // Helper to find a matching custom message key
        const findCustomMessageKey = (keys: string[], targets: string[]): string | undefined => {
            let foundKey:string|undefined;

            for(let target of targets) {
                foundKey = keys.find((key) => {
                    return getCustomMessageKeyRegex(key).test(target);
                });
                if(foundKey) break;
            }

            return foundKey;
        };

        // Search in the prioritized order
        const customMessageTargetKeys = [`${fieldName}.${ruleName}`, ruleName, fieldName];
        const foundCustomMessageKey = findCustomMessageKey(customMessageKeys, customMessageTargetKeys);

        // Default invalid message
        const defaultInvalidMessage = `The :attribute is invalid.`;

        const _message = foundCustomMessageKey ? customMessages[foundCustomMessageKey] : validatorDefaultMessages[ruleName];
        const message = _message === undefined
            ? defaultInvalidMessage
            : typeof _message !== 'string'
            ? (ruleValueType && _message[ruleValueType]) || defaultInvalidMessage
            : _message;

        return message.replace(/:(.*?)(\s|$|\.)/g, (match, placeholderKey, group2) => {
            placeholderKey = placeholderKey.trim();

            if(placeholderKey === 'attribute') {
                const attributesKeyList = Object.keys(this.context.attributes).sort((a, b) => (a.split('*').length - 1) - (b.split('*').length - 1));

                const customAttributeKey = attributesKeyList.find(key => new RegExp(`^${key.replace(/\./g, '\\.').replace(/\*/g, '.+')}$`, "g").test(fieldName));

                if(customAttributeKey) {
                    return this.context.attributes[customAttributeKey] + group2;
                }
            }

            return placeholderKey in  placeholder ? placeholder[placeholderKey] + group2 : match;
        });
    }
}