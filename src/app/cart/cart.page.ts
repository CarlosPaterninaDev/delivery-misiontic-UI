import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { CartService } from '../service/cart.service';
import { UiService } from '../service/ui.service';
import { ApigatewayService } from '../service/apigateway.service';
import {
  CONFIRM_DELETE,
  CONFIRM_DELETE_SUB,
  CONFIRM_PAY,
  CONFIRM_PAY_SUB,
  PAY_LOADING,
  PAY_SUCCESFUL,
} from '../constant/ui.message';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  @ViewChild('list') ionList: IonList;
  productsCart = this.cartService.cart;
  order;
  showButtonPay = true;
  noOrder: number;
  cantidadProductos = 0;
  totalCompra = 0;
  productos = [];

  constructor(
    private cartService: CartService,
    private uiService: UiService,
    private api: ApigatewayService
  ) {}

  ionViewDidEnter() {
    console.log(this.productsCart);
    console.log(this.api.currentUser);

    this.productsCart.forEach((e) => {
      console.log(e);

      this.productos.push({
        idProduct: e.idProduct,
        count: e.count,
      });

      this.cantidadProductos += e.count;
      this.totalCompra += e.total;
    });

    console.log(this.cantidadProductos);
    console.log(this.totalCompra);

    // this.order = new CartOrder(this.productsCart);
    // this.order.calculateTotal();
  }

  async removeProduct(index: number) {
    const resp = await this.uiService.alertConfirm(
      CONFIRM_DELETE,
      CONFIRM_DELETE_SUB
    );

    if (resp) {
      this.productsCart.splice(index, 1);
      this.ionList.closeSlidingItems().then((e) => {
        this.order.recalculateTotal(this.productsCart);

        this.cartService.productToCart.emit();
      });
    }
  }

  async pay() {
    const resp = await this.uiService.alertConfirm(
      CONFIRM_PAY,
      CONFIRM_PAY_SUB
    );

    if (resp) {
      const newOrder = {
        idUser: this.api.currentUser.userId,
        products: this.productos,
        total: this.totalCompra,
      };

      this.api.currentUser.balance - this.totalCompra;

      this.api.newOrder(newOrder).subscribe((e) => {
        console.log(e);
      });

      // await this.uiService.presentLoading(PAY_LOADING).then((e) => {
      //   setTimeout(() => {
      //     this.uiService.presentToast(PAY_SUCCESFUL, 'success', 2000);
      //     this.showButtonPay = false;
      //     this.uiService.loading.dismiss();
      //   }, 1500);
      // });
    }
  }

  crearProductos() {}

  ionViewDidLeave() {
    if (this.noOrder) {
      this.cartService.cart = [];
      this.cartService.productToCart.emit();
    }
  }
}
