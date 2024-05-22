import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { productRoute } from "./app/modules/product/product.route";
import { orderRoute } from "./app/modules/order/order.route";

// parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 *
 * core api routes
 *
 */
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

/**
 * Health route
 */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Health route",
  });
});

/**
 *
 * Rest of the route that return an error
 *
 */
app.get("*", (req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: "Route not found",
  });
});

/**
 *
 * error middleware when any route will call next
 * then this error will work
 *
 */
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

export default app;
