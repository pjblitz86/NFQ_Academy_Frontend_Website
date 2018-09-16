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
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // products properties
  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  product: Observable<Product>;
  private _products: BehaviorSubject<Product[]>;
  latestEntry: any;

  // orders properties
  ordersCollection: AngularFirestoreCollection<Order>;
  orderDoc: AngularFirestoreDocument<Order>;
  orders: Observable<Order[]>;
  order: Observable<Order>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection('products', ref => ref.orderBy('name', 'asc'));
    this.ordersCollection = this.afs.collection('orders', ref => ref.orderBy('clientName', 'asc'));
  }

  // Get all products with id
  getProducts(): Observable<Product[]> {
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

  // get 1 product by id
  getProduct(id: string): Observable<Product> {
    this.productDoc = this.afs.doc<Product>(`products/${id}`);
    this.product = this.productDoc.snapshotChanges().pipe(
      map(actions => {
        if (actions.payload.exists === false) {
          return null;
        } else {
          const data = actions.payload.data() as Product;
          data.id = actions.payload.id;
          return data;
        }
      })
    );
    return this.product;
  }

  // get all orders by id
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

  // add new product to firebase
  newProduct(product: Product) {
    this.productsCollection.add(product);
  }

  newOrder(order: Order) {
    this.ordersCollection.add(order);
  }

  // update product to firebase
  updateProduct(product: Product) {
    // this.productDoc = this.afs.doc(`product/edit/${product.id}`);
    this.productDoc.update(product);
  }

  // delete clicked product
  deleteProduct(id: string) {
    this.productDoc = this.afs.collection('products').doc(id);
    this.productDoc.delete();
  }

  // PAGINATION WITH FIREBASE2 - TRYING TO IMPLEMENT
  first() {
    this._products = new BehaviorSubject([]);
    this.products = this._products.asObservable();

    const productsRef = this.getCollection('products', ref =>
      ref.orderBy('products', 'asc').limit(6)
    ).subscribe(data => {
      this.latestEntry = data[data.length - 1].doc;
      this._products.next(data);
    });
  }

  // get collection for pagination with firebase
  getCollection(ref, queryFn?): Observable<any[]> {
    return this.afs
      .collection(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const doc = a.payload.doc;
            return { id, ...data, doc };
          });
        })
      );
  }

  next() {
    const scoresRef = this.getCollection('products', ref =>
      ref
        .orderBy('products', 'asc')
        // Now you can use the latestEntry to query with startAfter
        .startAfter(this.latestEntry)
        .limit(6)
    ).subscribe(data => {
      if (data.length) {
        // And save it again for more queries
        this.latestEntry = data[data.length - 1].doc;
        this._products.next(data);
      }
    });
  }
}
