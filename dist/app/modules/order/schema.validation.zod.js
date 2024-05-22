"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchemaValidator = void 0;
const zod_1 = require("zod");
exports.orderSchemaValidator = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "email are required",
        invalid_type_error: "email must be string",
    })
        .email({ message: "Invalid email address" })
        .trim(),
    productId: zod_1.z
        .string({
        required_error: "productId are required",
        invalid_type_error: "productId must be string",
    })
        .trim(),
    price: zod_1.z.number({
        required_error: "price are required",
        invalid_type_error: "price must be number",
    }),
    quantity: zod_1.z.number({
        required_error: "quantity are required",
        invalid_type_error: "quantity must be number",
    }),
});
