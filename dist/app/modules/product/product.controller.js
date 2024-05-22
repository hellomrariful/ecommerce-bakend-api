"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.specificProduct = exports.searchProduct = exports.createProduct = void 0;
const schema_validation_zod_1 = require("./schema.validation.zod");
const product_services_1 = require("./product.services");
//product controller here
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    try {
        //using zod to validate
        const product = schema_validation_zod_1.productSchemaValidator.parse(productData);
        //new product created
        const createdProduct = yield product_services_1.ProductServices.createProductDB(product);
        //product created successfully
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: createdProduct,
        });
    }
    catch (error) {
        //product creation failed
        return next(error);
    }
});
exports.createProduct = createProduct;
//search product
const searchProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    let data;
    try {
        if (typeof searchTerm === "string")
            data = yield product_services_1.ProductServices.searchProductDB(searchTerm);
        else
            data = yield product_services_1.ProductServices.searchProductDB();
        return res.status(200).json({
            success: true,
            message: searchTerm
                ? `Products matching search term '${searchTerm}' fetched successfully!`
                : "Products fetched successfully!",
            data,
        });
    }
    catch (error) {
        //searching error
        return next(error);
    }
});
exports.searchProduct = searchProduct;
//single product
const specificProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const data = yield product_services_1.ProductServices.searchByIdDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data,
        });
    }
    catch (error) {
        //searching error by productId
        if (error instanceof Error && error.name === "CastError") {
            res.status(200).json({
                success: false,
                message: "Product Not Found!",
            });
        }
        else {
            return next(error);
        }
    }
});
exports.specificProduct = specificProduct;
//update product
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const dataToUpdate = req.body;
    try {
        //product updated
        const data = yield product_services_1.ProductServices.updateProductByIdDB(productId, dataToUpdate);
        return res.status(201).json({
            success: true,
            message: "Product updated successfully!",
            data,
        });
    }
    catch (error) {
        //product updating error
        return next(error);
    }
});
exports.updateProduct = updateProduct;
//delete product
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        /* deleting product  */
        yield product_services_1.ProductServices.deleteProductByIdDB(productId);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        //product deleting error
        return next(error);
    }
});
exports.deleteProduct = deleteProduct;
