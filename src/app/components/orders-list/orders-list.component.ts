import { ProductService } from './../../services/product.service';
import { Order } from './../../models/Order';
import { Product } from './../../models/Product';
import { Component, OnInit } from '@angular/core';
import { PipeTransform, Pipe } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[];
  products: Product[];
  totalOrderRevenue: number;
  searchTerm: string;

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

@Pipe({
  name: 'orderFilter'
})
export class OrderFilter implements PipeTransform {
  transform(orders: Order[], searchTerm: string): Order[] {
    if (!orders || !searchTerm) {
      return orders;
    }

    return orders.filter(
      order => order.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
