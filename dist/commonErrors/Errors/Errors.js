"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_FOUND = exports.SERVER_ERROR = exports.UNAUTHORIZED_ERROR = exports.ForbiddenError = exports.ConflictError = void 0;
var httpCode_1 = require("../httpCode");
var apiErrors_1 = require("./apiErrors");
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(msg) {
        var _this = _super.call(this, msg) || this;
        _this._name = "CONFLICT_ERROR";
        _this._message = msg;
        _this._statusCode = httpCode_1.HttpStatusCodes.CONFLICT;
        Object.setPrototypeOf(_this, ConflictError.prototype);
        return _this;
    }
    return ConflictError;
}(apiErrors_1.ApiError));
exports.ConflictError = ConflictError;
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(msg) {
        var _this = _super.call(this, msg) || this;
        _this._name = "Forbidden_ERROR";
        _this._message = msg;
        _this._statusCode = httpCode_1.HttpStatusCodes.FORBIDDEN;
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        return _this;
    }
    return ForbiddenError;
}(apiErrors_1.ApiError));
exports.ForbiddenError = ForbiddenError;
var UNAUTHORIZED_ERROR = /** @class */ (function (_super) {
    __extends(UNAUTHORIZED_ERROR, _super);
    function UNAUTHORIZED_ERROR(msg) {
        var _this = _super.call(this, msg) || this;
        _this._name = "Unauthorized";
        _this._message = msg;
        _this._statusCode = httpCode_1.HttpStatusCodes.UNAUTHORIZED;
        Object.setPrototypeOf(_this, UNAUTHORIZED_ERROR.prototype);
        return _this;
    }
    return UNAUTHORIZED_ERROR;
}(apiErrors_1.ApiError));
exports.UNAUTHORIZED_ERROR = UNAUTHORIZED_ERROR;
var SERVER_ERROR = /** @class */ (function (_super) {
    __extends(SERVER_ERROR, _super);
    function SERVER_ERROR(msg) {
        var _this = _super.call(this, msg) || this;
        _this._name = "SERVER_ERROR";
        _this._message = msg;
        _this._statusCode = httpCode_1.HttpStatusCodes.SERVER_ERROR;
        Object.setPrototypeOf(_this, SERVER_ERROR.prototype);
        return _this;
    }
    return SERVER_ERROR;
}(apiErrors_1.ApiError));
exports.SERVER_ERROR = SERVER_ERROR;
var NOT_FOUND = /** @class */ (function (_super) {
    __extends(NOT_FOUND, _super);
    function NOT_FOUND(msg) {
        var _this = _super.call(this, msg) || this;
        _this._name = "NOT FOUND";
        _this._message = msg;
        _this._statusCode = httpCode_1.HttpStatusCodes.NOT_FOUND;
        Object.setPrototypeOf(_this, NOT_FOUND.prototype);
        return _this;
    }
    return NOT_FOUND;
}(apiErrors_1.ApiError));
exports.NOT_FOUND = NOT_FOUND;
