import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from './../../models/Product';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: string;
  product: Product = {
    image: '',
    name: '',
    shortDescription: '',
    price: 0,
    quantity: 0
  };

  disablePriceOnEdit: boolean = false;

  @ViewChild('productEditForm')
  form: any;

  constructor(
    private productService: ProductService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get id
    this.id = this.route.snapshot.params['id'];
    // get product
    this.productService.getProduct(this.id).subscribe(product => (this.product = product));
  }

  onSubmitEdit({ value, valid }: { value: Product; valid: boolean }) {
    if (!valid) {
      // show error flash message
      this.flashMessage.show('Please fill out the edit form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add id to product
      value.id = this.id;
      // update product
      this.productService.updateProduct(value);
      // show success message
      this.flashMessage.show('Product Updated Successfully!', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}
