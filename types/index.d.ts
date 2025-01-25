/**
 * Represents the possible input types for validation.
 * It can be:
 * - FormData object
 * - HTMLFormElement
 * - A plain object with key-value pairs
 * - An array of values
 */
type ValidatorInput = FormData | HTMLFormElement | Record<string, any> | any[];

/**
 * Function signature for inline validation rule methods.
 * 
 * @param {string} attribute - The name of the attribute being validated.
 * @param {any} value - The value of the attribute.
 * @param {(message: string) => void} fail - A callback to trigger validation failure with a message.
 */
type InlineValidatorRuleMethod = (attribute: string, value: any, fail: (message: string) => void) => void;

/**
 * Defines the structure for validation rules.
 * Rules can be a string, an inline validation method, or an array of both.
 */
interface ValidatorRules {
    [key: string]: string | InlineValidatorRuleMethod | (string | InlineValidatorRuleMethod)[];
}

/**
 * Custom error messages for validation fields.
 */
interface ValidatorCustomMessages {
    [key: string]: string;
}

/**
 * Custom attribute names for validation fields.
 */
interface ValidatorAttributes {
    [key: string]: string;
}

/**
 * Defines the internal structure of parsed validation rules.
 */
interface ValidatorContextRules {
    [key: string]: (string | InlineValidatorRuleMethod)[];
}

declare class Validator {
    /**
     * Creates a new validator instance.
     * 
     * @param {ValidatorInput} input - The input data to be validated.
     * @param {ValidatorRules} rules - The validation rules to apply.
     * @param {ValidatorCustomMessages} [messages] - Custom error messages.
     * @param {ValidatorAttributes} [attributes] - Custom attribute names.
     */
    constructor(
        input: ValidatorInput, 
        rules: ValidatorRules, 
        messages?: ValidatorCustomMessages, 
        attributes?: ValidatorAttributes
    );

    /**
     * Factory method to create a new validator instance.
     * 
     * @param {ValidatorInput} input - The input data to be validated.
     * @param {ValidatorRules} rules - The validation rules to apply.
     * @param {ValidatorCustomMessages} [messages] - Custom error messages.
     * @param {ValidatorAttributes} [attributes] - Custom attribute names.
     * @returns {Validator} - A new Validator instance.
     */
    static make(
        input: ValidatorInput, 
        rules: ValidatorRules, 
        messages?: ValidatorCustomMessages, 
        attributes?: ValidatorAttributes
    ): Validator;

    /**
     * Checks if validation has failed.
     * @returns {Promise<boolean>}
     */
    fails(): Promise<boolean>;

    /**
     * Checks if validation has passed.
     * @returns {Promise<boolean>}
     */
    passes(): Promise<boolean>;

    /**
     * Handles error messages related to validation.
     */
    errors: {
        /**
         * Get the first validation error message for a given field.
         * 
         * @param {string} [fieldName] - The name of the field.
         * @returns {Promise<string>}
         */
        first(fieldName?: string): Promise<string>;

        /**
         * Get all validation error messages for a given field.
         * 
         * @param {string} fieldName - The name of the field.
         * @returns {Promise<string | Record<string, string[]>>}
         */
        get(fieldName: string): Promise<string | Record<string, string[]>>;

        /**
         * Get all validation error messages.
         * 
         * @returns {Promise<Record<string, string[]>>}
         */
        all(): Promise<Record<string, string[]>>;

        /**
         * Add a custom validation error message.
         * 
         * @param {string} key - The field name.
         * @param {string} value - The error message.
         * @returns {Promise<Record<string, string[]>>}
         */
        add(key: string, value: string): Promise<Record<string, string[]>>;

        /**
         * Merge additional validation messages.
         * 
         * @param {Record<string, string[]>} messages - The messages to merge.
         * @returns {Promise<Record<string, string[]>>}
         */
        merge(messages: Record<string, string[]>): Promise<Record<string, string[]>>;
    };

    /**
     * Retrieve validated data.
     * @returns {Record<string, any>}
     */
    getData(): Record<string, any>;

    /**
     * Retrieve validation rules applied.
     * @returns {ValidatorContextRules}
     */
    getRules(): ValidatorContextRules;

    /**
     * Apply conditional validation rules.
     * 
     * @param {string} field - The field name.
     * @param {ValidatorRules} rules - The rules to apply.
     * @param {(input: any, item: undefined | Record<string, any> | any[]) => boolean} condition - The condition to check.
     */
    sometimes(
        field: string, 
        rules: ValidatorRules, 
        condition: (input: any, item: undefined | Record<string, any> | any[]) => boolean
    ): void;

    /**
     * Register a callback to be called after validation completes.
     * 
     * @param {(validator: Validator) => void} callback - The callback function.
     */
    after(callback: (validator: Validator) => void): void;

    /**
     * Retrieve all validation messages.
     * @returns {Promise<Record<string, string[]>>}
     */
    messages(): Promise<Record<string, string[]>>;

    /**
     * Set new validation rules.
     * @param {ValidatorRules} rules - The new validation rules.
     */
    setRules(rules: ValidatorRules): void;

    /**
     * Add additional validation rules.
     * @param {ValidatorRules} rules - The new validation rules to add.
     */
    addRules(rules: ValidatorRules): void;

    /**
     * Add custom attribute names for validation fields.
     * @param {ValidatorAttributes} attributes - The custom attributes to add.
     */
    addCustomAttributes(attributes: ValidatorAttributes): void;

    /**
     * Set custom error messages.
     * @param {ValidatorCustomMessages} messages - The custom messages to set.
     */
    setCustomMessages(messages: ValidatorCustomMessages): void;

    /**
     * Stop validation after the first failure occurs.
     */
    stopOnFirstFailure(): void;

    /**
     * Add a custom validation rule.
     * 
     * @param {string} name - The rule name.
     * @param {(attribute: string, value: any, parameters: string[], validator: Validator) => boolean} callback - The validation function.
     * @param {string} [message] - The custom error message.
     */
    static addCustomRule(
        name: string, 
        callback: (attribute: string, value: any, parameters: string[], validator: Validator) => boolean, 
        message?: string
    ): void;
}

export default Validator;
