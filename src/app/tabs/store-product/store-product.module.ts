import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreProductPageRoutingModule } from './store-product-routing.module';

import { StoreProductPage } from './store-product.page';
import { FilterPipe } from '../../pipe/filter.pipe';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreProductPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [StoreProductPage, FilterPipe],
})
export class StoreProductPageModule {}
