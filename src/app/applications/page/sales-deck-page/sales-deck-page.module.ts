import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesDeckPageRoutingModule } from './sales-deck-page-routing.module';
import { SalesDeckPageComponent } from './sales-deck-page/sales-deck-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SalesDeckPageComponent
  ],
  imports: [
    CommonModule,
    SalesDeckPageRoutingModule,
    SharedModule
  ]
})
export class SalesDeckPageModule { }
