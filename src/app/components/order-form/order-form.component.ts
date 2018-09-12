import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from './../../models/Product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  id: string;
  product: Product;
  isAvailable: boolean = true;

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
}
