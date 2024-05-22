import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { productRoute } from "./app/modules/product/product.route";
import { orderRoute } from "./app/modules/order/order.route";

// parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//products and orders API
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

//Main route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the E-Commerce API Server!",
  });
});

//not found route
app.get("*", (req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: "Route not found",
  });
});

//middleware with next
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

export default app;
