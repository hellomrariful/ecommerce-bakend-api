"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const route = express_1.default.Router();
//create product api
route.post("/", product_controller_1.createProduct);
//get all product and searching api
route.get("/", product_controller_1.searchProduct);
//specific product api
route.get("/:productId", product_controller_1.specificProduct);
//update product api
route.put("/:productId", product_controller_1.updateProduct);
//delete product api
route.delete("/:productId", product_controller_1.deleteProduct);
exports.productRoute = route;
