"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var genToken = function (userEmail) {
    var accessToken = (0, jsonwebtoken_1.sign)({ "username": userEmail }, "".concat(process.env.ACCESS_TOKEN_SECRET), { "expiresIn": "6000000s" });
    return accessToken;
};
exports.genToken = genToken;
