import { NextFunction, Request, Response } from "express";
import { productSchemaValidator } from "./schema.validation.zod";
import { ProductServices } from "./product.services";

/**
 * create product controller
 */
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productData = req.body;

  try {
    /* verifing product schema using zod */
    const product = productSchemaValidator.parse(productData);

    /* creating new product */
    const createdProduct = await ProductServices.createProductDB(product);

    /* if product created */
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: createdProduct,
    });
  } catch (error) {
    /* if product creation failed */
    return next(error);
  }
};

/**
 * search product controller
 */
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
    /* if any error while searching product */
    return next(error);
  }
};

/**
 * specific product controller
 */
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
    /* if any error while searching by productId */
    return next(error);
  }
};

/**
 * update product controller
 */
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;
  const dataToUpdate = req.body;
  try {
    /* updating product  */
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
    /* if any error while updating product  */
    return next(error);
  }
};

/**
 * delete product controller
 */
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
    /* if any error while deleting product  */
    return next(error);
  }
};
