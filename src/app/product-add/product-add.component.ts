import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {addProduct, getProductByID, updateProduct} from "../state/product.action";
import {Store} from "@ngrx/store";
import {AppState} from "../root-store/state";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../models/product";
import {Subject} from "rxjs";
import {selectProduct, selectProductsDataTable} from "../state/product.selectors";
import {takeUntil} from "rxjs/operators";
import {cloneDeep} from "lodash-es";
import {DataTableDataSource} from "../data-table/data-table-datasource";

@Component({
  selector: 'app-add-product',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  selectedProduct: Product = {productID: 0, productName: '', price: 0,suppliers:[], editable: false};
  updateForm: boolean = false;

  addProduct = new FormGroup({
    productID: new FormControl(''),
    productName: new FormControl(''),
    price: new FormControl('')
  });

  constructor(private store$: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.addProduct.setValue({
      productID: '',
      productName: '',
      price: ''
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  ngOnInit(): void {
    this.checkIfUpdateForm();
    this.setValuesOnNull();
  }

  actionButton() {
    if (!this.updateForm) {
      this.addProductAction();
    } else if (this.updateForm) {
      this.updateProductAction();
    }
  }

  addProductAction() {
    var product = this.addProduct.value;
    this.store$.dispatch(addProduct({product}));
    this.router.navigate(['/home']);
  }

  updateProductAction() {
    var product = this.addProduct.value;
    this.store$.dispatch(updateProduct({product}));
    this.router.navigate(['/home']);
  }

  setValuesOnNull() {
    this.addProduct.setValue({
      productID: '',
      productName: '',
      price: ''
    });
  }

  setValue(product: Product) {
    this.addProduct.setValue({
      productID: product.productID,
      productName: product.productName,
      price: product.price
    });
  }

  checkIfUpdateForm() {
    const productID = this.activatedRoute.snapshot.paramMap.get('productID');
    if (productID) {
      this.store$.dispatch(getProductByID({productID: +productID}));
      this.updateForm = true;
      this.store$.select(selectProduct)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
            if (response) {
              console.log(response);
              this.setValue(response);
            }
          }
        );
    }
  }


}
