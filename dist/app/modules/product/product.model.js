"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const variantsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        trim: true,
    },
    value: {
        type: String,
        trim: true,
    },
}, {
    _id: false,
});
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    inStock: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    _id: false,
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    variants: [variantsSchema],
    inventory: inventorySchema,
});
exports.ProductModel = (0, mongoose_1.model)("Product", productSchema);
