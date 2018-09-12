import { Product } from './../../models/Product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  totalPossibleRevenue: number;

  constructor(private productService: ProductService) {}

  ngOnInit() {
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
}
