"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaDataSchema = void 0;
var mongoose_1 = require("mongoose");
exports.metaDataSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    writerAccess: [
        { type: String,
            required: true
        }
    ],
    readAccess: [
        { type: String,
            required: true
        }
    ],
    deleteAccess: [
        { type: String,
            required: true
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});
var metaDataModel = (0, mongoose_1.model)('MetaData', exports.metaDataSchema);
