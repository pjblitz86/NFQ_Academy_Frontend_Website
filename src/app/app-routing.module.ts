import { OrderListComponent } from './components/order-list/order-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrderProductComponent } from './components/order-product/order-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/:id', component: ProductComponent }, // optional - seperate product page with more details
  { path: 'product/edit/:id', component: EditProductComponent },
  { path: 'product/order/:id', component: OrderProductComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderComponent }, // optional - seperate order page
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
