import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

//order created
const createOrderDB = async (data: TOrder) => {
  return await OrderModel.create({ ...data });
};

//searching order by email and all order
const searchOrderByEmailDB = async (email?: string) => {
  //email exist check
  if (typeof email !== "undefined") return await OrderModel.find({ email });
  //all orders
  return await OrderModel.find({});
};

export const OrderServices = {
  createOrderDB,
  searchOrderByEmailDB,
};
