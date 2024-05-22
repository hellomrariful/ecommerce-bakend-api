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
exports.searchOrders = exports.createOrder = void 0;
const order_services_1 = require("./order.services");
const product_services_1 = require("../product/product.services");
const error_handler_1 = require("../../utils/error.handler");
//order controller created
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    const { productId, quantity } = orderData;
    try {
        //finding product from ordering
        const targetProduct = yield product_services_1.ProductServices.searchByIdDB(productId);
        //not found product
        if (!targetProduct)
            return next((0, error_handler_1.errorHandler)(404, `${productId} product not found!`));
        const { inventory } = targetProduct;
        const { quantity: productQuantity } = inventory;
        //showing error for product quantity is less then order quantity
        if (productQuantity < quantity) {
            return next((0, error_handler_1.errorHandler)(400, "Insufficient quantity available in inventory"));
        }
        try {
            //orders creating
            const data = yield order_services_1.OrderServices.createOrderDB(orderData);
            //update product quantity
            yield product_services_1.ProductServices.updateProductByIdDB(productId, {
                inventory: {
                    quantity: productQuantity - quantity,
                    inStock: productQuantity - quantity ? true : false,
                },
            });
            return res.status(201).json({
                success: true,
                message: "Order created successfully!",
                data,
            });
        }
        catch (error) {
            return next(error);
        }
    }
    catch (error) {
        //finding product error
        return next(error);
    }
});
exports.createOrder = createOrder;
//search orders
const searchOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    let data;
    try {
        if (typeof email === "string")
            data = yield order_services_1.OrderServices.searchOrderByEmailDB(email);
        else
            data = yield order_services_1.OrderServices.searchOrderByEmailDB();
        //not found order
        if (!data || !(data === null || data === void 0 ? void 0 : data.length)) {
            return res.status(200).json({
                success: false,
                message: "Order not found",
            });
        }
        //orders found
        return res.status(200).json({
            success: false,
            message: email
                ? "Orders fetched successfully for user email!"
                : "Orders fetched successfully!",
            data,
        });
    }
    catch (error) {
        //finding error
        return next(error);
    }
});
exports.searchOrders = searchOrders;
