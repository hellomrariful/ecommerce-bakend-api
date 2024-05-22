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
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
//order created
const createOrderDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.OrderModel.create(Object.assign({}, data));
});
//searching order by email and all order
const searchOrderByEmailDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    //email exist check
    if (typeof email !== "undefined")
        return yield order_model_1.OrderModel.find({ email });
    //all orders
    return yield order_model_1.OrderModel.find({});
});
exports.OrderServices = {
    createOrderDB,
    searchOrderByEmailDB,
};
