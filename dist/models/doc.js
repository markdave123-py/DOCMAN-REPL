"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocModel = exports.docSchema = void 0;
const mongoose_1 = require("mongoose");
const metaData_1 = require("./metaData");
exports.docSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cloudinaryId: {
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
    metaData: {
        type: metaData_1.metaDataSchema,
        required: true
    },
});
exports.DocModel = (0, mongoose_1.model)('Doc', exports.docSchema);
//# sourceMappingURL=doc.js.map