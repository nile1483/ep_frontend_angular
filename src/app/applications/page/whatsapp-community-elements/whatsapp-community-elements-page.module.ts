import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatsappCommunityElementsRoutingModule } from './whatsapp-community-elements-routing.module';
import { WhatsappCommunityElementsComponent } from './whatsapp-community-elements-page/whatsapp-community-elements-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WhatsappCommunityElementsComponent
  ],
  imports: [
    CommonModule,
    WhatsappCommunityElementsRoutingModule,
    SharedModule
  ]
})
export class WhatsappCommunityElementsModule { }
