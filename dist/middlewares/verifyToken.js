"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.userEmail = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const Errors_1 = require("../commonErrors/Errors/Errors");
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ "message": "pls provide access token" });
        throw new Errors_1.UNAUTHORIZED_ERROR("User Unauthorized");
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, decoded) => {
        if (err) {
            res.json({ 'message': 'Could not verify token try again later!!!' });
            throw new Errors_1.ForbiddenError("Could not verify token try again later!!!");
        }
        ;
        exports.userEmail = decoded.username;
        console.log(decoded);
        console.log(exports.userEmail);
        next();
    });
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=verifyToken.js.map