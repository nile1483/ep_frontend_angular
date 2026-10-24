import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { TransitRoutingModule } from './transit-routing.module';

// Component
import { TransitListPageComponent } from './transit-list-page/transit-list-page.component';
import { TransitDetailPageComponent } from './transit-detail-page/transit-detail-page.component';


@NgModule({
  declarations: [
    TransitListPageComponent,
    TransitDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    TransitRoutingModule
  ]
})
export class TransitModule { }
