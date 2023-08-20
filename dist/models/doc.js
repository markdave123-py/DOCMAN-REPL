"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docModel = void 0;
var mongoose_1 = require("mongoose");
var metaData_1 = require("./metaData");
var docSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    metaData: metaData_1.metaDataSchema, // Embed MetaData schema
});
var docModel = (0, mongoose_1.model)('Doc', docSchema);
exports.docModel = docModel;
