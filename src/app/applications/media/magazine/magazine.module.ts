import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { MagazineRoutingModule } from './magazine-routing.module';

// Component
import { MagazineListPageComponent } from './magazine-list-page/magazine-list-page.component';
import { MagazineDetailPageComponent } from './magazine-detail-page/magazine-detail-page.component';


@NgModule({
  declarations: [
    MagazineListPageComponent,
    MagazineDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    MagazineRoutingModule
  ]
})
export class MagazineModule { }
