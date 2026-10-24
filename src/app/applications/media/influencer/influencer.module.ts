import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { InfluencerRoutingModule } from './influencer-routing.module';

// Component
import { InfluencerListPageComponent } from './influencer-list-page/influencer-list-page.component';
import { InfluencerDetailPageComponent } from './influencer-detail-page/influencer-detail-page.component';


@NgModule({
  declarations: [
    InfluencerDetailPageComponent,
    InfluencerListPageComponent, 
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    InfluencerRoutingModule
  ]
})
export class InfluencerModule { }
