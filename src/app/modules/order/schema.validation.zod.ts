import { z as zod } from "zod";

export const orderSchemaValidator = zod.object({
  email: zod
    .string({
      required_error: "email are required",
      invalid_type_error: "email must be string",
    })
    .email({ message: "Invalid email address" })
    .trim(),
  productId: zod
    .string({
      required_error: "productId are required",
      invalid_type_error: "productId must be string",
    })
    .trim(),
  price: zod.number({
    required_error: "price are required",
    invalid_type_error: "price must be number",
  }),
  quantity: zod.number({
    required_error: "quantity are required",
    invalid_type_error: "quantity must be number",
  }),
});
