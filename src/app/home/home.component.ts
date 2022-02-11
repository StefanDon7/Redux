import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../root-store/state";
import {Product} from "../models/product";
import {
  deleteProduct,
  deleteProductSuccess,
  getAllProduct,
  getProductByID,
  updateProduct
} from "../state/product.action";
import {selectProductsDataTable} from "../state/product.selectors";
import {takeUntil} from "rxjs/operators";
import {cloneDeep} from "lodash-es";
import {Subject} from "rxjs";
import {MenuItem, MessageService} from "primeng/api";
import {Actions, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit, OnDestroy {

  selectedProduct: Product = {productID: 0, productName: '', price: 0, suppliers:[],editable: false};

  constructor(private store$: Store<AppState>, private messageService: MessageService, private actions$: Actions, private router: Router) {
    this.actions$.pipe(takeUntil(this.ngUnsubscribe))
      .pipe(ofType(deleteProductSuccess))
      .subscribe(action => {
        this.deleteMessage();
      });
  }



  items: MenuItem[] = [];

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  products: Product[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  updateMessage() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Updated'});
  }

  deleteMessage() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Deleted'});
  }

  deleteButton(product: Product) {
    this.delete(product);
  }

  updateButton(product:Product) {
    console.log("Product",product)
    this.router.navigate(
      ['edit/' + product.productID],
    );
  }

  ngOnInit(): void {
    this.items = [
      // {label: 'Update', icon: 'pi pi-refresh', command: () => {
      //     this.updateButton();
      //   }},
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          this.updateButton(this.selectedProduct)
        }
      },
      // {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      // {separator: true},
      // {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
    ];
    this.getAll();
    this.store$.select(selectProductsDataTable)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
          if (response.length) {
            console.log(response);
            this.products = cloneDeep(response);
          }
        }
      );
  }

  getAll() {
    this.store$.dispatch(getAllProduct());
  }

  delete(product: Product) {
    this.store$.dispatch(deleteProduct({product}))
  }

  // update(product: Product) {
  //   this.store$.dispatch(updateProduct({product}))
  // }

  changeEditable(product: Product) {
    product.editable = !product.editable;
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
  }

  action() {

  }
}
