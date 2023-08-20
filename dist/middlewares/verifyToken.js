"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.userEmail = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Errors_1 = require("../commonErrors/Errors/Errors");
var verifyJwt = function (req, res, next) {
    // console.log(req.headers)
    var authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ "message": "pls provide access token" });
        throw new Errors_1.UNAUTHORIZED_ERROR("User Unauthorized");
    }
    var token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, "".concat(process.env.ACCESS_TOKEN_SECRET), function (err, decoded) {
        if (err) {
            res.json({ 'message': 'Could not verify token try again later!!!' });
            throw new Errors_1.ForbiddenError("Could not verify token try again later!!!");
        }
        ;
        exports.userEmail = decoded.username;
        console.log(decoded);
        next();
    });
};
exports.verifyJwt = verifyJwt;
