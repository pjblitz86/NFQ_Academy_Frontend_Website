import { AuthGuard } from './guards/auth.guard';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductsListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/add', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'product/edit/:id', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersListComponent, canActivate: [AuthGuard] },
  { path: 'order/:id', component: OrderFormComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
