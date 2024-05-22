import { z as zod } from "zod";

const tagsSchemaValidator = zod.array(
  zod
    .string({
      required_error: "tags are required",
      invalid_type_error: "Tag must be string",
    })
    .trim(),
);
const variantsSchemaValidator = zod.array(
  zod.object({
    type: zod.string({
      required_error: "type are required",
      invalid_type_error: "type must be string",
    }),
    value: zod.string({
      required_error: "value are required",
      invalid_type_error: "value must be string",
    }),
  }),
);
const inventorySchemaValidator = zod.object({
  quantity: zod.number({
    required_error: "quantity are required",
    invalid_type_error: "quantity must be number",
  }),
  inStock: zod.boolean({
    required_error: "inStock are required",
    invalid_type_error: "inStock must be boolean",
  }),
});

export const productSchemaValidator = zod.object({
  name: zod
    .string({
      required_error: "tags are required",
      invalid_type_error: "tag must be string",
    })
    .max(20, { message: "name max length is 20" })
    .trim(),
  description: zod
    .string({
      required_error: "description are required",
      invalid_type_error: "description must be string",
    })
    .trim(),
  price: zod.number({
    required_error: "price are required",
    invalid_type_error: "price must be number",
  }),
  category: zod
    .string({
      required_error: "category are required",
      invalid_type_error: "category must be string",
    })
    .trim(),
  tags: tagsSchemaValidator,
  variants: variantsSchemaValidator,
  inventory: inventorySchemaValidator,
});