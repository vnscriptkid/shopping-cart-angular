import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems = [];
  totalPrice = 0;
  constructor(private cartService: CartService) {
    this.cartService.getCart().then(observable => {
      observable.subscribe((result: any) => {
        const itemsObj = result.items;
        this.totalPrice = 0;
        this.cartItems = Object.keys(itemsObj).map(key => {
          const product = itemsObj[key].product;
          this.totalPrice += (product.price * itemsObj[key].quantity);
          return {key, quantity: itemsObj[key].quantity, ...product};
        });
        console.log('cart array: ', this.cartItems);
      });
    });
  }

  ngOnInit() {
  }

  increaseQuantity(product) {
    console.log('increase quantity: ', product.title);
    this.cartService.increaseQuantity(product.key);
  }

  decreaseQuantity(product) {
    console.log('decrease quantity: ', product.title);
    this.cartService.decreaseQuantity(product.key);
  }

}
