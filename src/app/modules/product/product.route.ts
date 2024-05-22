import express from "express";
import {
  createProduct,
  searchProduct,
  specificProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller";
const route = express.Router();

//create product api
route.post("/", createProduct);

//get all product and searching api
route.get("/", searchProduct);

//specific product api
route.get("/:productId", specificProduct);

//update product api
route.put("/:productId", updateProduct);

//delete product api
route.delete("/:productId", deleteProduct);

export const productRoute = route;
