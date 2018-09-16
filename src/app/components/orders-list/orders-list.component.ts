import { ProductService } from './../../services/product.service';
import { Order } from './../../models/Order';
import { Product } from './../../models/Product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[];
  products: Product[];
  totalOrderRevenue: number;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // render all products from firebase
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
    // render all orders from firebase
    this.productService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.getTotalOrderRevenue();
    });
  }

  getTotalOrderRevenue() {
    this.totalOrderRevenue = this.orders.reduce((total, order) => {
      return total + order.totalPrice;
    }, 0);
  }
}
