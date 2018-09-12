import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/Product';
import { Order } from './../models/Order';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // products properties
  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  product: Observable<Product>;

  // orders properties
  ordersCollection: AngularFirestoreCollection<Order>;
  orderDoc: AngularFirestoreDocument<Order>;
  orders: Observable<Order[]>;
  order: Observable<Order>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    this.ordersCollection = this.afs.collection('orders', ref => ref.orderBy('productName', 'asc'));
  }

  getProducts(): Observable<Product[]> {
    // Get clients with id
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Product;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.products;
  }

  getOrders(): Observable<Order[]> {
    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Product;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.orders;
  }

  newProduct(product: Product) {
    this.productsCollection.add(product);
  }
}
