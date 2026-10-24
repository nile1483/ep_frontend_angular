import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { MonitoringtoolsRoutingModule } from './monitoringtools-routing.module';

// Component
import { MonitoringtoolsListPageComponent } from './monitoringtools-list-page/monitoringtools-list-page.component';
import { MonitoringtoolsDetailPageComponent } from './monitoringtools-detail-page/monitoringtools-detail-page.component';


@NgModule({
  declarations: [
    MonitoringtoolsListPageComponent,
    MonitoringtoolsDetailPageComponent
  ],
  imports: [
    CommonModule,
    MonitoringtoolsRoutingModule,
    MediaSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class MonitoringtoolsModule { }
