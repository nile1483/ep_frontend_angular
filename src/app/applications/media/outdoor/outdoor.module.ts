import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { OutdoorRoutingModule } from './outdoor-routing.module';

// Component
import { OutdoorListPageComponent } from './outdoor-list-page/outdoor-list-page.component';
import { OutdoorDetailPageComponent } from './outdoor-detail-page/outdoor-detail-page.component';


@NgModule({
  declarations: [
    OutdoorListPageComponent,
    OutdoorDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    OutdoorRoutingModule
  ]
})
export class OutdoorModule { }
