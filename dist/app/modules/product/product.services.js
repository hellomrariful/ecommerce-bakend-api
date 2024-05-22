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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
//create product
const createProductDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.ProductModel.create(Object.assign({}, productData));
});
//search product and all product
const searchProductDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    //if searchTerm exist on name or description
    if (typeof searchTerm !== "undefined") {
        const regex = new RegExp(searchTerm, "i");
        return yield product_model_1.ProductModel.find({
            $or: [{ name: regex }, { description: regex }],
        });
    }
    //for all products
    return yield product_model_1.ProductModel.find({});
});
//search in single product
const searchByIdDB = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield product_model_1.ProductModel.findById(id); });
//updating product by id
const updateProductByIdDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.ProductModel.findByIdAndUpdate(id, Object.assign({}, data), { new: true });
});
//deleting product by id
const deleteProductByIdDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.ProductModel.findByIdAndDelete(id);
});
exports.ProductServices = {
    createProductDB,
    searchProductDB,
    searchByIdDB,
    updateProductByIdDB,
    deleteProductByIdDB,
};
