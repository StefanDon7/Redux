import {State} from "./product.state";
import {createFeatureSelector, MemoizedSelector, createSelector} from "@ngrx/store";
import {Product} from "../models/product";
import {AppState} from "../root-store/state";

export const getProductDataTable = (state: State) => state?.products;
export const getSelectedProduct = (state: State) => state?.selectedProduct;


export const selectFeature = (state: AppState): State => {
  return state.products;
};


export const selectProductsDataTable: MemoizedSelector<AppState, Product[]> = createSelector(selectFeature, s1 => {
  return s1.products;
});
//stavio sam undefined jer kad proveravam da li je stigo necu da pokrecem neku akciju dok mi ne stigne if(product)
//u Coferu stoji any
export const selectProduct: MemoizedSelector<AppState, Product | undefined> = createSelector(selectFeature, s1 => {
  return s1.selectedProduct;
});


