import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApigatewayService } from '../../service/apigateway.service';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductOrder } from '../../models/product.class';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.page.html',
  styleUrls: ['./store-product.page.scss'],
})
export class StoreProductPage implements OnInit {
  cartCounter = 0;
  products;
  filterProduct = '';

  constructor(
    private api: ApigatewayService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      ({ id }) => (this.products = this.api.getProductsByStore(id))
    );
  }

  random() {
    return Math.floor(Math.random() * 6) + 1;
  }

  async presentModal(product) {
    console.log(product);

    const modal = await this.modalController.create({
      component: ProductDetailComponent,
      mode: 'ios',
      componentProps: { product: new ProductOrder(product) },
      swipeToClose: true,
    });

    await modal.present();

    await modal.onWillDismiss();

    this.cartCounter = this.cartService.cart.length;
  }
}
