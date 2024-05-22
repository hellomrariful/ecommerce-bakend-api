import { NextFunction, Request, Response } from "express";
import { OrderServices } from "./order.services";
import { ProductServices } from "../product/product.services";
import { errorHandler } from "../../utils/error.handler";

//order controller created
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const orderData = req.body;
  const { productId, quantity } = orderData;
  try {
    //finding product from ordering
    const targetProduct = await ProductServices.searchByIdDB(productId);

    //not found product
    if (!targetProduct)
      return next(errorHandler(404, `${productId} product not found!`));

    const { inventory } = targetProduct;
    const { quantity: productQuantity } = inventory;

    //showing error for product quantity is less then order quantity
    if (productQuantity < quantity) {
      return next(
        errorHandler(400, "Insufficient quantity available in inventory"),
      );
    }

    try {
      //orders creating
      const data = await OrderServices.createOrderDB(orderData);

      //update product quantity
      await ProductServices.updateProductByIdDB(productId, {
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
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    //finding product error
    return next(error);
  }
};

//search orders
export const searchOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.query;
  let data;
  try {
    if (typeof email === "string")
      data = await OrderServices.searchOrderByEmailDB(email);
    else data = await OrderServices.searchOrderByEmailDB();

    //not found order
    if (!data || !data?.length) {
      return res.status(200).json({
        success: true,
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
  } catch (error) {
    //finding error
    return next(error);
  }
};
