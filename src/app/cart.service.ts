import { take } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/app-product';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  private createNewCart() {
    return this.db.list('/carts').push({ createdAt: Date.now() });
  }

  private getCartRef(id) {
    return this.db.object('/carts/' + id);
  }

  public async getCart() {
    const cartId = await this.getOrCreateCart();
    return this.db.object('/carts/' + cartId).valueChanges();
  }

  private async getItem(itemId) {
    const cartId = await this.getOrCreateCart();
    return this.db.object('/carts/' + cartId + '/items/' + itemId);
  }

  public increaseQuantity(itemId) {
    const item = this.getItem(itemId).then(observable => {
      observable.valueChanges().pipe(take(1)).subscribe((i: any) => {
        console.log('get back item before increase: ', i);
        observable.update({ quantity: i.quantity + 1 }).then(success => console.log('success increase', success));
      });
    });
  }

  public decreaseQuantity(itemId) {
    const item = this.getItem(itemId).then(observable => {
      observable.valueChanges().pipe(take(1)).subscribe((i: any) => {
        console.log('get back item before decrease: ', i);
        if (i.quantity === 1) {
          console.log('delete item');
          return observable.remove().then(success => console.log('success delete', success));
        } else {
          observable.update({ quantity: i.quantity - 1 }).then(success => console.log('success decrease', success));
        }
      });
    });
  }

  private async getOrCreateCart() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      console.log('creating a new cart');
      // create a new one
      const returnedCart = await this.createNewCart();
      // save this cart to local
      localStorage.setItem('cartId', returnedCart.key);
      // get data from db and return ref
      return returnedCart.key;
    }
    console.log('cart existing in local');
    return cartId;
  }

  async addItemToCart(product: Product) {
    const cartId = await this.getOrCreateCart();
    const itemRef$ = this.db.object('/carts/' + cartId + '/items/' + product.key);
    itemRef$.valueChanges().pipe(take(1)).subscribe((result: any) => {
      if (result) {
        console.log('exist -> update quantity', result);
        itemRef$.update({ quantity: result.quantity + 1 });
      } else {
        console.log('not exist -> add new item', result);
        itemRef$.set({ product: product, quantity: 1 });
      }
    }, (err) => {
      console.log('reach here');
    });
  }
}
