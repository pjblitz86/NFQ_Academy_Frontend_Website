import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsComponent } from './components/products/products.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsListComponent,
    ProductsComponent,
    SidebarComponent,
    AddProductComponent,
    EditProductComponent,
    OrderListComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
