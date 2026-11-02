import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { WorldCupPageRoutingModule } from './world-cup-page-routing.module';
import { WorldCupPageComponent } from './world-cup-page/world-cup-page.component';
import { WorldCupInquiryDialogComponent } from './world-cup-inquiry-dialog/world-cup-inquiry-dialogcomponent';

@NgModule({
  declarations: [
    WorldCupPageComponent,
    WorldCupInquiryDialogComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    WorldCupPageRoutingModule
  ]
})
export class WorldCupPageModule { }