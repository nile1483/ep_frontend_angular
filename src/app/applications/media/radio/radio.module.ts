import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { RadioRoutingModule } from './radio-routing.module';

// Component
import { RadioListPageComponent } from './radio-list-page/radio-list-page.component';
import { RadioDetailPageComponent } from './radio-detail-page/radio-detail-page.component';


@NgModule({
  declarations: [
    RadioListPageComponent,
    RadioDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    RadioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class RadioModule { }
