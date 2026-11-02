import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

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
    NontraditionalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class NontraditionalModule { }
