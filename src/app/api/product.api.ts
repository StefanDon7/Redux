import {environment} from "../../environments/environment";
import {Product} from "../models/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ProductApi {
  readonly API = environment.baseUrl;
  readonly API_PRODUCT = this.API + 'product/';

  constructor(private httpClient: HttpClient) {
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.API_PRODUCT + 'get/all');
  }

  updateProduct(product: Product) {
    return this.httpClient.put<Product>(
      this.API_PRODUCT + 'update',
      product);
  }

  deleteProduct(product: Product) {
    return this.httpClient.delete<Product>(`${
      this.API_PRODUCT}delete/${product.productID}`);
  }

  addProduct(product: Product) {
    return this.httpClient.post<Product>(
      this.API_PRODUCT + 'add', product);
  }

  getProductByID(productID: number) {
    return this.httpClient.post<Product>(
      this.API_PRODUCT + 'getbyid',
      {"productID": + productID});
  }

}
