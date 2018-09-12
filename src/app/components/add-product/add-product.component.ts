import { Product } from './../../models/Product';
import { Component, OnInit } from '@angular/core';

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

  disablePriceOnAdd: boolean = false;
  disableQuantityOnAdd: boolean = false;

  constructor() {}

  ngOnInit() {}
}
