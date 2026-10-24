import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { InflightRoutingModule } from './inflight-routing.module';

// Component
import { InflightListPageComponent } from './inflight-list-page/inflight-list-page.component';
import { InflightDetailPageComponent } from './inflight-detail-page/inflight-detail-page.component';


@NgModule({
  declarations: [
    InflightListPageComponent,
    InflightDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    InflightRoutingModule
  ]
})
export class InflightModule { }
