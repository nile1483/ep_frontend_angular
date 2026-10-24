import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';

import { SportsRoutingModule } from './sports-routing.module';

import { SportsListPageComponent } from './sports-list-page/sports-list-page.component';
import { SportsDetailPageComponent } from './sports-detail-page/sports-detail-page.component';


@NgModule({
  declarations: [
    SportsListPageComponent,
    SportsDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    SportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class SportsModule { }
