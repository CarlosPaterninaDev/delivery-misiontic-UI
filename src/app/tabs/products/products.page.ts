import { Component, OnInit } from '@angular/core';
import { MiscellaneousService } from '../../service/miscellaneous.service';
import { ApigatewayService } from '../../service/apigateway.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  offers = this.misc.getOffersData();
  stores;

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 800,
    spaceBetween: 8,
    slidesPerView: 1.5,
    freeMode: true,
    loop: true,
  };

  constructor(
    private misc: MiscellaneousService,
    private api: ApigatewayService
  ) {}

  ngOnInit() {
    this.stores = this.api.getStores();
  }
}
