export interface ValidationInfo<T extends boolean = boolean> {
    isValidated: T;
    validated: ValidatorData['value'],
    failed: T extends false ? null : boolean;
    errors: {
        [fieldName: string]: [string, ValidatorHandlersReturnType][];
    },
    messages: {
        [fieldName:string]: string[]
    }
}

export interface ValidationResult {
    [fieldName: string]: [string, ValidatorHandlersReturnType][];
}

export interface FieldValidationResult {
    result: {
        [fieldName:string]:[string, ValidatorHandlersReturnType][]
    },
    validateNext: boolean
}