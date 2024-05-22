import express from "express";
import { searchOrders, createOrder } from "./order.controller";

const route = express.Router();

//order api created
route.post("/", createOrder);

//all of order and search order though email
route.get("/", searchOrders);

export const orderRoute = route;
