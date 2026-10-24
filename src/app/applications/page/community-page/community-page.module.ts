import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { CommunityPageRoutingModule } from './community-page-routing.module';
import { CommunityPageComponent } from './community-page/community-page.component';


@NgModule({
  declarations: [
    CommunityPageComponent
  ],
  imports: [
    CommonModule,
    CommunityPageRoutingModule,
    SharedModule
  ]
})
export class CommunityPageModule { }
