import { OrderFormComponent } from './components/order-form/order-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/edit/:id', component: EditProductComponent },
  { path: 'orders', component: OrdersListComponent },
  { path: 'order/:id', component: OrderFormComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
