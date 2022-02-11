import {
  AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {Product} from '../models/product';
import {DataTableDataSource} from './data-table-datasource';
import {Store} from "@ngrx/store";
import {deleteProduct, getAllProduct, ProductAction, updateProduct} from "../state/product.action";
import {selectFeature, selectProductsDataTable} from "../state/product.selectors";
import {filter, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {AppState} from "../root-store/state";
import {cloneDeep} from 'lodash-es';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnDestroy, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: DataTableDataSource;
  products: Product[] = [];
  isNameEditable: boolean = false;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['productID', 'productName', 'price', 'edit','update', 'delete'];

  constructor(private store$: Store<AppState>) {
    console.log("kreiran DTComponent");
    this.getAll();
    this.dataSource = new DataTableDataSource([]);
    this.store$.select(selectProductsDataTable)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
          if (response.length) {
            console.log(response);
            this.products = cloneDeep(response);
            this.dataSource = new DataTableDataSource(this.products);
            console.log('DataSource',this.dataSource);
            if(this.table && this.dataSource){
              this.initializeTable();
            }
          }
        }
      );
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    if(this.table && this.dataSource){
        this.initializeTable();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getAll() {
    this.store$.dispatch(getAllProduct());
  }

  delete(product: Product) {
    this.store$.dispatch(deleteProduct({product}))
  }

  update(product: Product) {
    this.store$.dispatch(updateProduct({product}))
  }

  changeEditable(product: Product) {
    product.editable = !product.editable;
  }

  initializeTable(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
