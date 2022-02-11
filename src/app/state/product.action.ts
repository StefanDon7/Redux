import {createAction, props, union} from '@ngrx/store';
import {Product} from "../models/product";

export const enum ProductAction{
  AddProduct = '[Product] Add Product',
  AddProductSuccess = '[Product] Add Product Success',
  AddProductError = '[Product] Add Product Error',

  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Success',
  UpdateProductError = '[Product] Update Product Error',

  DeleteProduct = '[Product] Delete Product',
  DeleteProductSuccess = '[Product] Delete Success',
  DeleteProductError = '[Product] Delete Product Error',


  GetAllProduct = '[Product] Get All Product ',
  GetAllProductSuccess = '[Product] Get All Product Success',
  GetAllProductError = '[Product]  Get All Product Error',

  GetProductByID = '[Product] Get Product by ID ',
  GetProductByIDSuccess = '[Product] Get Product by ID Success',
  GetProductByIDError = '[Product] Get Product by ID Error',



}
export const addProduct=createAction(ProductAction.AddProduct,props<{product:Product}>());
export const addProductSuccess=createAction(ProductAction.AddProductSuccess,props<{product:Product}>());
export const addProductError=createAction(ProductAction.AddProductError,props<{error:string}>());

export const updateProduct=createAction(ProductAction.UpdateProduct,props<{product:Product}>());
export const updateProductSuccess=createAction(ProductAction.UpdateProductSuccess,props<{product:Product}>());
export const updateProductError=createAction(ProductAction.UpdateProductError,props<{error:string}>());

export const deleteProduct=createAction(ProductAction.DeleteProduct,props<{product:Product}>());
export const deleteProductSuccess=createAction(ProductAction.DeleteProductSuccess,props<{product:Product}>());
export const deleteProductError=createAction(ProductAction.DeleteProductError,props<{error:string}>());


export const getAllProduct=createAction(ProductAction.GetAllProduct);
export const getAllProductSuccess=createAction(ProductAction.GetAllProductSuccess,props<{products:Product[]}>());
export const getAllProductError=createAction(ProductAction.GetAllProductError,props<{error:string}>());

export const getProductByID=createAction(ProductAction.GetProductByID, props<{productID:number}>());
export const getProductByIDSuccess=createAction(ProductAction.GetProductByIDSuccess,props<{product:Product}>());
export const getProductByIDError=createAction(ProductAction.GetProductByIDError,props<{error:string}>());



const all = union({
  addProduct,
  addProductSuccess,
  addProductError,
  //****************************************************
  getAllProduct,
  getAllProductSuccess,
  getAllProductError,
  //****************************************************
  deleteProduct,
  deleteProductSuccess,
  deleteProductError,
  //****************************************************
  updateProduct,
  updateProductSuccess,
  updateProductError,
  //****************************************************
  getProductByID,
  getProductByIDSuccess,
  getProductByIDError
});

export type Actions = typeof all;
