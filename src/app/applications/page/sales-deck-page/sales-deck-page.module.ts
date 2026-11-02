import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { SalesDeckPageRoutingModule } from './sales-deck-page-routing.module';
import { SalesDeckPageComponent } from './sales-deck-page/sales-deck-page.component';

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