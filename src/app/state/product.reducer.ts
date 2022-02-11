import {Action, createReducer, on} from "@ngrx/store";

import {cloneDeep} from 'lodash-es';
import {INIT_PRODUCTS_STATE, State} from "./product.state";
import {
  addProductSuccess,
  deleteProductSuccess,
  getAllProductSuccess,
  getProductByIDSuccess,
  updateProductSuccess
} from "./product.action";

const reducer = createReducer(
  cloneDeep(INIT_PRODUCTS_STATE),
  on(getAllProductSuccess, (state: State, {products}) => {
    return ({
      ...state,
      products
    });
  }),
  on(updateProductSuccess, (state: State, {product}) => ({
    ...state,
    selectedProduct: product
  })),
  on(deleteProductSuccess, (state: State, {product}) => ({
    ...state,
    selectedProduct: product
  })),
  on(addProductSuccess, (state: State, {product}) => ({
    ...state,
    selectedProduct: product
  })),
  on(getProductByIDSuccess, (state: State, {product}) => ({
    ...state,
    selectedProduct: product
  })),
)

export function reducers(state: State | undefined, action: Action) {
  return reducer(state, action);
}
