import {Supplier} from "./supplier";

export interface Product {
  productID: number;
  productName: string;
  price: number;
  suppliers: Supplier[];
  editable: boolean;

}
