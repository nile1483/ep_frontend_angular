import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { InfilmRoutingModule } from './infilm-routing.module';

import { InfilmListPageComponent } from './infilm-list-page/infilm-list-page.component';
import { InfilmDetailPageComponent } from './infilm-detail-page/infilm-detail-page.component';


@NgModule({
  declarations: [
    InfilmListPageComponent,
    InfilmDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    InfilmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class InfilmModule { }
