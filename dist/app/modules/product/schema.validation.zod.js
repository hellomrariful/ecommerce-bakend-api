"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchemaValidator = void 0;
const zod_1 = require("zod");
const tagsSchemaValidator = zod_1.z.array(zod_1.z
    .string({
    required_error: "tags are required",
    invalid_type_error: "Tag must be string",
})
    .trim());
const variantsSchemaValidator = zod_1.z.array(zod_1.z.object({
    type: zod_1.z.string({
        required_error: "type are required",
        invalid_type_error: "type must be string",
    }),
    value: zod_1.z.string({
        required_error: "value are required",
        invalid_type_error: "value must be string",
    }),
}));
const inventorySchemaValidator = zod_1.z.object({
    quantity: zod_1.z.number({
        required_error: "quantity are required",
        invalid_type_error: "quantity must be number",
    }),
    inStock: zod_1.z.boolean({
        required_error: "inStock are required",
        invalid_type_error: "inStock must be boolean",
    }),
});
exports.productSchemaValidator = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "tags are required",
        invalid_type_error: "tag must be string",
    })
        .max(20, { message: "name max length is 20" })
        .trim(),
    description: zod_1.z
        .string({
        required_error: "description are required",
        invalid_type_error: "description must be string",
    })
        .trim(),
    price: zod_1.z.number({
        required_error: "price are required",
        invalid_type_error: "price must be number",
    }),
    category: zod_1.z
        .string({
        required_error: "category are required",
        invalid_type_error: "category must be string",
    })
        .trim(),
    tags: tagsSchemaValidator,
    variants: variantsSchemaValidator,
    inventory: inventorySchemaValidator,
});
