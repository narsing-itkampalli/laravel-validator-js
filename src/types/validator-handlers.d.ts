import type ValidatorData from "../core/validator-data";
import { ValidatorDataParsedValue } from "../core/validator-data";
import { InlineValidatorRuleMethod } from "./validator-context";
import { ValidationRuleNames } from "./validator-rule-names";

type ValidatorRulesArray = {
    name: string;
    params: string[];
}[];

export interface ValidationHandlerArguments {
    fieldName: string;
    fieldValue: ReturnType<ValidatorData['get']>;
    // fieldNameBeforeParsed: string;
    ruleName: string;
    ruleParams: string[];
    fieldRulesArray: ValidatorRulesArray;
};

// type ValidatorMessagePlaceholderType = 'attribute' | 'other' | 'values' | 'value' | 'date' | 'max';

export interface ValidatorHandlersReturnType {
    passed: boolean;
    type?: 'numeric' | 'array' | 'string' | 'file',
    message?: string,
    passwordChecks?: {
        letters: boolean,
        mixed: boolean,
        numbers: boolean,
        symbols: boolean
    },
    placeholder?: Record<string, string>
}

type ValidationHandlers = {
    [ruleName in ValidationRuleNames[number]]: (params: ValidationHandlerArguments) => (
        (params:ValidatorDataParsedValue) => ValidatorHandlersReturnType | Promise<ValidatorHandlersReturnType>
    );
};

export default ValidationHandlers;