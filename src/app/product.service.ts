import { Product } from './models/app-product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  save(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getSingleProduct(id: string) {
    return this.db.object('/products/' + id).valueChanges();
  }

  updateProduct(id: string, product: Product) {
    return this.db.object('/products/' + id).update(product);
  }

  deleteProduct(id: string) {
    return this.db.object('/products/' + id).remove();
  }

}
