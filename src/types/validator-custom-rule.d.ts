import Validator from "../index";

export interface ValidatorCustomRule {
    [ruleName: string]: {
        callback: (attribute:string, value:any, parameters:string[], validator:Validator) => boolean;
        message?: string;
    }
}