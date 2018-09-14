import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from './../../models/Product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  id: string;
  products: Product[];
  product: Product;
  totalPossibleRevenue: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
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
}
