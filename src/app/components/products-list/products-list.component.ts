import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from './../../models/Product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  id: string;
  products: Product[];
  product: Product;
  searchTerm: string;
  totalProducts = 10;
  productsPerPage = 2;
  pageSizeOptions = [1, 2, 4];
  totalPossibleRevenue: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // render all products from firebase
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.getTotalPossibleRevenue();
    });
  }

  getTotalPossibleRevenue() {
    this.totalPossibleRevenue = this.products.reduce((total, product) => {
      const revenue = product.price * product.quantity;
      return total + revenue;
    }, 0);
  }

  onDeleteClick(id: string) {
    if (confirm('Are you sure you want to delete this?')) {
      this.productService.deleteProduct(id);
      this.flashMessage.show('Product removed', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

  onChangedPage(pageData: PageEvent) {}
}

@Pipe({
  name: 'productFilter'
})
export class ProductFilter implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm) {
      return products;
    }

    return products.filter(
      product => product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
