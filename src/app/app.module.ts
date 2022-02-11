import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {SplitButtonModule} from 'primeng/splitbutton';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {ProductEffects} from "./state/product.effects";
import {ProductApi} from "./api/product.api";
import {reducers} from "./root-store/reducers";
import {MatInputModule} from "@angular/material/input";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    ProductAddComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ProductEffects]),
    MatInputModule,
    TableModule,
    RippleModule,
    ButtonModule,
    SplitButtonModule,
    ToastModule,
    // StoreModule.forFeature('products', productReducers),
    // EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [ProductApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
