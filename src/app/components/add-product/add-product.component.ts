import { ProductService } from './../../services/product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from './../../models/Product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = {
    image: '',
    name: '',
    shortDescription: '',
    price: 0,
    quantity: 0
  };

  @ViewChild('productForm')
  form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Product; valid: boolean }) {
    if (!valid) {
      // show error flash message
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // add new product
      this.productService.newProduct(value);
      // show success message
      this.flashMessage.show('New Product Added!', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}
