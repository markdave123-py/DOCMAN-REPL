"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.createNewUserSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createNewUserSchema = {
    bodySchema: joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        phoneNumber: joi_1.default.string().required()
    })
};
exports.userLoginSchema = {
    bodySchema: joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    })
};
