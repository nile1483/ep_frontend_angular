import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { AitoolsRoutingModule } from './aitools-routing.module';

// Component
import { AitoolsListPageComponent } from './aitools-list-page/aitools-list-page.component';
import { AitoolsDetailPageComponent } from './aitools-detail-page/aitools-detail-page.component';


@NgModule({
  declarations: [
    AitoolsListPageComponent,
    AitoolsDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    AitoolsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class AitoolsModule { }
