import { FlashMessagesService } from 'angular2-flash-messages';
import { Product } from './../../models/Product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { PagerService } from './../../services/pager.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  id: string;
  products: Product[];
  product: Product;
  searchTerm: string;
  totalPossibleRevenue: number;
  pager: any = {};
  // array of all items to be paged
  private allItems: Product[];
  // paged items
  pagedItems: any[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    // render all products from firebase
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.getTotalPossibleRevenue();
      this.allItems = this.products;
      // initialize pagination to page 1
      this.setPage(1);
    });
  }

  getTotalPossibleRevenue() {
    this.totalPossibleRevenue = this.products.reduce((total, product) => {
      const revenue = product.price * product.quantity;
      return total + revenue;
    }, 0);
  }

  onDeleteClick(id: string) {
    if (confirm('Are you sure you want to delete this?')) {
      this.productService.deleteProduct(id);
      this.flashMessage.show('Product removed', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

  // pagination
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}

// search filter
@Pipe({
  name: 'productFilter'
})
export class ProductFilter implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm) {
      return products;
    }

    return products.filter(
      product => product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
