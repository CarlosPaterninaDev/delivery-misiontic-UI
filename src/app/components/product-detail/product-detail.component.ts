import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() product;

  constructor(
    private modalController: ModalController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    console.log(this.product);
  }

  onHandleQuantity(count: number) {
    if (this.product.count < 0) {
      this.product.count = 0;
    } else {
      this.product.count = this.product.count + count;
      this.product.calculateTotal();
    }
  }

  async addCart() {
    this.cartService.addProductToCart(this.product);
    this.salir();
  }

  salir() {
    this.modalController.dismiss();
  }

  toggleFavorite() {}

  socialShare() {}
}
