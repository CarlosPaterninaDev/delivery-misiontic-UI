import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProductDetailComponent],
})
export class ComponentsModule {}
