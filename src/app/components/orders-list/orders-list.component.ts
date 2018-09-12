import { ProductService } from './../../services/product.service';
import { Order } from './../../models/Order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[];
  totalOrderRevenue: number;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.getTotalOrderRevenue();
    });
  }

  getTotalOrderRevenue() {
    this.totalOrderRevenue = this.orders.reduce((total, order) => {
      const revenue = order.price * order.quantityOrdered;
      return total + revenue;
    }, 0);
  }
}
