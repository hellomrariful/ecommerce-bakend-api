import { NextFunction, Request, Response } from "express";
import { productSchemaValidator } from "./schema.validation.zod";
import { ProductServices } from "./product.services";

//product controller here
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productData = req.body;

  try {
    //using zod to validate
    const product = productSchemaValidator.parse(productData);

    //new product created
    const createdProduct = await ProductServices.createProductDB(product);

    //product created successfully
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: createdProduct,
    });
  } catch (error) {
    //product creation failed
    return next(error);
  }
};

//search product
export const searchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { searchTerm } = req.query;
  let data;
  try {
    if (typeof searchTerm === "string")
      data = await ProductServices.searchProductDB(searchTerm);
    else data = await ProductServices.searchProductDB();

    return res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : "Products fetched successfully!",
      data,
    });
  } catch (error) {
    //searching error
    return next(error);
  }
};

//single product
export const specificProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;

  try {
    const data = await ProductServices.searchByIdDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data,
    });
  } catch (error) {
    //searching error by productId
    if (error instanceof Error && error.name === "CastError") {
      res.status(200).json({
        success: false,
        message: "Product Not Found!",
      });
    } else {
      return next(error);
    }
  }
};

//update product
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;
  const dataToUpdate = req.body;
  try {
    //product updated
    const data = await ProductServices.updateProductByIdDB(
      productId,
      dataToUpdate,
    );

    return res.status(201).json({
      success: true,
      message: "Product updated successfully!",
      data,
    });
  } catch (error) {
    //product updating error
    return next(error);
  }
};

//delete product
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;

  try {
    /* deleting product  */
    await ProductServices.deleteProductByIdDB(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    //product deleting error
    return next(error);
  }
};
