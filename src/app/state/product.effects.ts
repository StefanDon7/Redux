import {ProductApi} from "../api/product.api";
import * as productActions from './product.action';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, switchMap} from "rxjs/operators";
import {of as observableOf} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable()
export class ProductEffects {
  constructor(private api: ProductApi,
              private action$: Actions) {
  }

  addProductEffect$ = createEffect(() => this.action$.pipe(
    //biram koju hocu akciju
    ofType(productActions.addProduct),
    switchMap(action => this.api.addProduct(action.product).pipe(
      switchMap(product => observableOf(
        productActions.addProductSuccess({product}),
      )),
      catchError(error => observableOf(
        productActions.addProductError(error)
      ))
    ))
  ));

  updateProductEffect$ = createEffect(() => this.action$.pipe(
    ofType(productActions.updateProduct),
    switchMap(action => this.api.updateProduct(action.product).pipe(
      switchMap(product => observableOf(
        productActions.updateProductSuccess({product}),
        productActions.getAllProduct()
      )), catchError(error => observableOf(
        productActions.updateProductError(error)
      ))
    ))))

  deleteProductEffect$ = createEffect(() => this.action$.pipe(
    ofType(productActions.deleteProduct),
    switchMap(action => this.api.deleteProduct(action.product).pipe(
      switchMap(product => observableOf(
        productActions.deleteProductSuccess({product}),
        productActions.getAllProduct()
      )), catchError(error => observableOf(
        productActions.deleteProductError(error)
      ))
    ))))

  getAllProductsEffect$ = createEffect(() => this.action$.pipe(
    ofType(productActions.getAllProduct),
    switchMap(action => this.api.getAllProducts().pipe(
      switchMap(products=> observableOf(
        productActions.getAllProductSuccess({products})
      )), catchError(error => observableOf(
        productActions.getAllProductError(error)
      ))
    ))))

  getProductByID$ = createEffect(() => this.action$.pipe(
    ofType(productActions.getProductByID),
    switchMap(action => this.api.getProductByID( action.productID).pipe(
      switchMap(product=> observableOf(
        productActions.getProductByIDSuccess({product}),
      )), catchError(error => observableOf(
        productActions.getProductByIDError(error)
      ))
    )))
  )


}
