import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { TelevisionRoutingModule } from './television-routing.module';

// Component
import { TelevisionListPageComponent } from './television-list-page/television-list-page.component';
import { TelevisionDetailPageComponent } from './television-detail-page/television-detail-page.component';


@NgModule({
  declarations: [
    TelevisionListPageComponent,
    TelevisionDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    TelevisionRoutingModule
  ]
})
export class TelevisionModule { }
