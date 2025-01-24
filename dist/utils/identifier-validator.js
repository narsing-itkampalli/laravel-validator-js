"use strict";
class IdentifierValidator {
    static isValidUUID(value) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(value);
    }
    static isValidULID(value) {
        const ulidRegex = /^[0-9A-Z]{26}$/;
        return ulidRegex.test(value);
    }
}
