import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { DigitalRoutingModule } from './digital-routing.module';

// Component
import { DigitalListPageComponent } from './digital-list-page/digital-list-page.component';
import { DigitalDetailPageComponent } from './digital-detail-page/digital-detail-page.component';


@NgModule({
  declarations: [
    DigitalListPageComponent,
    DigitalDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    DigitalRoutingModule
  ]
})
export class DigitalModule { }
