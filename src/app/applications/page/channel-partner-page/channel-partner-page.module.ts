import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChannelPartnerPageRoutingModule } from './channel-partner-page-routing.module';
import { ChannelPartnerPageComponent } from './channel-partner-page/channel-partner-page.component';

@NgModule({
  declarations: [
    ChannelPartnerPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ChannelPartnerPageRoutingModule
  ]
})
export class ChannelPartnerPageModule { }
