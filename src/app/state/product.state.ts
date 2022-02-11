import {Product} from "../models/product";

export interface State {
  error: string;
  products:Product[];
  selectedProduct:Product | undefined;
}

export const INIT_PRODUCTS_STATE: State={
  error: '',
  products:[],
  selectedProduct: undefined,
};
