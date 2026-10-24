import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { CinemaRoutingModule } from './cinema-routing.module';

// Component
import { CinemaListPageComponent } from './cinema-list-page/cinema-list-page.component';
import { CinemaDetailPageComponent } from './cinema-detail-page/cinema-detail-page.component';


@NgModule({
  declarations: [
    CinemaListPageComponent,
    CinemaDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    CinemaRoutingModule
  ]
})
export class CinemaModule { }
