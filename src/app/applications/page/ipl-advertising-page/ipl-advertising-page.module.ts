import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { IplAdvertisingPageRoutingModule } from './ipl-advertising-page-routing.module';
import { IPLAdvertisingPageComponent } from './ipl-advertising-page/ipl-advertising-page.component';
import { IPLAdvertisingPageInquiryDialogComponent } from './ipl-advertising-page-inquiry-dialog/ipl-advertising-page-inquiry-dialogcomponent';

@NgModule({
  declarations: [
    IPLAdvertisingPageComponent,
    IPLAdvertisingPageInquiryDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IplAdvertisingPageRoutingModule
  ]
})
export class IplAdvertisingPageModule { }