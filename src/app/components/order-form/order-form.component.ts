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
  product: Product;
  isAvailable: boolean = true;
  // order: Order = {
  //   image: '',
  //   name: '',
  //   shortDescription: '',
  //   price: 0,
  //   quantity: 0
  // };

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
      if (product != null) {
        if (product.quantity > 0) {
          this.isAvailable = true;
        }
      }
      this.product = product;
    });
  }

  onSubmitOrder({ value, valid }: { value: Product; valid: boolean }) {
    if (!valid) {
      // show error flash message
      this.flashMessage.show('Please enter your quantity correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // // add new order
      // this.productService.newOrder(value);
      // // show success message
      // this.flashMessage.show("Your Order has been reserved! We'll contact you soon...", {
      //   cssClass: 'alert-success',
      //   timeout: 6000
      // });
      // redirect to clients order list
      this.router.navigate(['/orders']);
    }
  }
}
