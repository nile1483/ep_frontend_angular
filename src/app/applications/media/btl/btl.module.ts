import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { BtlRoutingModule } from './btl-routing.module';

// Component
import { BtlListPageComponent } from './btl-list-page/btl-list-page.component';
import { BtlDetailPageComponent } from './btl-detail-page/btl-detail-page.component';


@NgModule({
  declarations: [
    BtlListPageComponent,
    BtlDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    BtlRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class BtlModule { }
