import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = [];
  order;
  orders = [];

  @Output() productToCart: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  addProductToCart(product) {
    this.cart.push(product);
    console.log(this.cart);
    this.productToCart.emit(product);
  }
}
