import Validator from "../index";
import ValidatorData from "../core/validator-data";

export type ValidatorInput = FormData | HTMLFormElement | Record<string, any> | any[];

export type InlineValidatorRuleMethod = (attribute:string, value:any, fail:(message:string)=>void) => void;

export interface ValidatorRules {
    [key: string]: string|InlineValidatorRuleMethod|(string|InlineValidatorRuleMethod)[];
}

export interface ValidatorContextRules {
    [key: string]: (string|InlineValidatorRuleMethod)[]
}

export interface ValidatorCustomMessages {
    [key: string]: string;
}

export interface ValidatorAttributes {
    [key: string]: string;
}

interface ValidatorContext {
    data: ValidatorData;
    rules: ValidatorContextRules;
    customMessages: ValidatorCustomMessages;
    attributes: ValidatorAttributes;
    errors: { [key: string]: string[] };
    sometimes: {
        field: string;
        rules: ValidatorRules[string];
        condition: (input: any, item: undefined | Record<string, any> | any[]) => boolean;
    }[];
    afterCallbacks: ((validator: Validator) => void)[];
    stopOnFirstFailure: boolean;
}

export default ValidatorContext;