import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductAddComponent} from "./product-add/product-add.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ProductListComponent},
  {path: 'add', component: ProductAddComponent},
  {path: 'edit/:productID', component: ProductAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
