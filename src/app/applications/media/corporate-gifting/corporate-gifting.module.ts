import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { CorporateGiftingRoutingModule } from './corporate-gifting-routing.module';

// Component
import { GiftingDetailPageComponent } from './gifting-detail-page/gifting-detail-page.component';
import { GiftingListPageComponent } from './gifting-list-page/gifting-list-page.component';


@NgModule({
  declarations: [
    GiftingDetailPageComponent,
    GiftingListPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    CorporateGiftingRoutingModule
  ]
})
export class CorporateGiftingModule { }
