import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';

import { ActivationRoutingModule } from './activation-routing.module';
import { ActivationListPageComponent } from './activation-list-page/activation-list-page.component';
import { ActivationDetailPageComponent } from './activation-detail-page/activation-detail-page.component';


@NgModule({
  declarations: [
    ActivationListPageComponent,
    ActivationDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    ActivationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class ActivationModule { }
