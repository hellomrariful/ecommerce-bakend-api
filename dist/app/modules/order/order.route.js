"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const route = express_1.default.Router();
//order api created
route.post("/", order_controller_1.createOrder);
//all of order and search order though email
route.get("/", order_controller_1.searchOrders);
exports.orderRoute = route;
