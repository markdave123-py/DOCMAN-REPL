"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIncomingRequest = void 0;
var validateIncomingRequest = function (schema, data) {
    var _a = schema.validate(data), error = _a.error, value = _a.value;
    if (error)
        throw error;
    return value;
};
exports.validateIncomingRequest = validateIncomingRequest;
