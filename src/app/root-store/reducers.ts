import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "./state";
import {reducers as productReducers} from '../state/product.reducer';

export const reducers: ActionReducerMap<AppState> = {
  products: productReducers,
}
