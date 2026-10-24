import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { AirportRoutingModule } from './airport-routing.module';

// Component
import { AirportListPageComponent } from './airport-list-page/airport-list-page.component';
import { AirportDetailPageComponent } from './airport-detail-page/airport-detail-page.component';


@NgModule({
  declarations: [
    AirportListPageComponent,
    AirportDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    AirportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class AirportModule { }
