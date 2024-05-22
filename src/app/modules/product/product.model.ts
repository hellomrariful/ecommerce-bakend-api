import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";


const variantsSchema = new Schema<TVariant>(
  {
    type: {
      type: String,
      trim: true,
    },
    value: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);


const inventorySchema = new Schema<TInventory>(
  {
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
  },
  {
    _id: false,
  },
);


const productSchema = new Schema<TProduct>({
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

export const ProductModel = model<TProduct>("Product", productSchema);
