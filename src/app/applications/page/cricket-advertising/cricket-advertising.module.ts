import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { CricketAdvertisingRoutingModule } from './cricket-advertising-routing.module';
import { CricketAdvertisingComponent } from './cricket-advertising/cricket-advertising.component';


@NgModule({
  declarations: [
    CricketAdvertisingComponent
  ],
  imports: [
    CommonModule,
    CricketAdvertisingRoutingModule,
    SharedModule
  ]
})
export class CricketAdvertisingModule { }
