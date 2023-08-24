"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaDataModel = exports.metaDataSchema = void 0;
const mongoose_1 = require("mongoose");
exports.metaDataSchema = new mongoose_1.Schema({
    writerAccess: [
        { type: String,
        }
    ],
    readAccess: [
        { type: String,
        }
    ],
    deleteAccess: [
        { type: String,
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
    timestamps: true,
});
const metaDataModel = (0, mongoose_1.model)('MetaData', exports.metaDataSchema);
exports.metaDataModel = metaDataModel;
//# sourceMappingURL=metaData.js.map