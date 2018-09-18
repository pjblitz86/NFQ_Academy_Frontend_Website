import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from './../../models/Product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  id: string;
  product: Product = {
    image: '',
    name: '',
    shortDescription: '',
    price: 0,
    quantity: 0
  };

  order: Order = {
    productName: '',
    clientName: '',
    clientContact: '',
    unitPrice: 0,
    quantityOrdered: 0,
    totalPrice: 0
  };

  @ViewChild('orderForm')
  form: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // get id from url
    this.id = this.route.snapshot.params['id'];
    // get product
    this.productService.getProduct(this.id).subscribe(product => {
      this.product = product;
      this.order.productName = product.name;
      this.order.unitPrice = product.price;
    });
  }

  checkAvailability() {
    if (this.order.quantityOrdered > this.product.quantity) {
      this.order.quantityOrdered = this.product.quantity;
    }
    // calculate total price
    this.order.totalPrice = this.order.quantityOrdered * this.product.price;
  }

  onSubmitOrder({ valid }: { valid: boolean }) {
    if (!valid) {
      // show error flash message
      this.flashMessage.show('Please fill out the order form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // add new order
      this.productService.newOrder(this.order);
      // update available product quantity
      this.product.quantity -= this.order.quantityOrdered;
      this.productService.updateProduct(this.product);
      // show success message
      this.flashMessage.show('Order Added Successfully!', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // redirect to clients order list
      this.router.navigate(['/orders']);
    }
  }
}
