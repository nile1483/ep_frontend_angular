import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { NontraditionalRoutingModule } from './nontraditional-routing.module';

// Component
import { NontraditionalListPageComponent } from './nontraditional-list-page/nontraditional-list-page.component';
import { NontraditionalDetailPageComponent } from './nontraditional-detail-page/nontraditional-detail-page.component';


@NgModule({
  declarations: [
    NontraditionalDetailPageComponent,
    NontraditionalListPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    NontraditionalRoutingModule
  ]
})
export class NontraditionalModule { }
