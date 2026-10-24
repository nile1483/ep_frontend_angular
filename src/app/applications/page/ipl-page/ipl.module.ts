import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IPLRoutingModule } from './ipl-routing.module';
import { IPLPageComponent } from './ipl-page/ipl-page.component';
import { IPLInquiryDialogComponent } from './ipl-inquiry-dialog/ipl-inquiry-dialogcomponent';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IPLPageComponent,
    IPLInquiryDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IPLRoutingModule
  ]
})
export class IPLModule { }
