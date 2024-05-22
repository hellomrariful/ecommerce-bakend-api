import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";


 //create product
const createProductDB = async (productData: TProduct) => {
  return await ProductModel.create({
    ...productData,
  });
};

 //search product and all product
const searchProductDB = async (searchTerm?: string) => {
  //if searchTerm exist on name or description
  if (typeof searchTerm !== "undefined") {
    const regex = new RegExp(searchTerm, "i");
    return await ProductModel.find({
      $or: [{ name: regex }, { description: regex }],
    });
  }
  //for all products
  return await ProductModel.find({});
};


 //search in single product
const searchByIdDB = async (id: string) => await ProductModel.findById(id);


//updating product by id
const updateProductByIdDB = async (id: string, data: Partial<TProduct>) => {
  return await ProductModel.findByIdAndUpdate(id, { ...data }, { new: true });
};


//deleting product by id
const deleteProductByIdDB = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};

export const ProductServices = {
  createProductDB,
  searchProductDB,
  searchByIdDB,
  updateProductByIdDB,
  deleteProductByIdDB,
};