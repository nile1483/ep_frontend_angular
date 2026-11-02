import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CricketAdvertisingPageRoutingModule } from './cricket-advertising-page-routing.module';
import { CricketAdvertisingPageComponent } from './cricket-advertising-page/cricket-advertising-page.component';

@NgModule({
  declarations: [
    CricketAdvertisingPageComponent
  ],
  imports: [
    CommonModule,
    CricketAdvertisingPageRoutingModule,
    SharedModule
  ]
})
export class CricketAdvertisingPageModule { }