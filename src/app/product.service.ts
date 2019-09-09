import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from './models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list('/products').snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => ({ key: action.key, value: action.payload.val() }) as Product);
      }));
  }

  getProduct(productId: string): Observable<Product> {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId: string, product: Product) {
    return this.db.object<Product>('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object<Product>('/products/' + productId).remove()
  }
}

