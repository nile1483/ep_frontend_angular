import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { DigitalprRoutingModule } from './digitalpr-routing.module';

// Component
import { DigitalprListPageComponent } from './digitalpr-list-page/digitalpr-list-page.component';
import { DigitalprDetailPageComponent } from './digitalpr-detail-page/digitalpr-detail-page.component';


@NgModule({
  declarations: [
    DigitalprDetailPageComponent,
    DigitalprListPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    DigitalprRoutingModule
  ]
})
export class DigitalprModule { }
