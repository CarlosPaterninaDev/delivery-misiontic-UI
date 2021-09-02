import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreProductPage } from './store-product.page';

const routes: Routes = [
  {
    path: '',
    component: StoreProductPage,
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../../cart/cart.module').then((m) => m.CartPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreProductPageRoutingModule {}
