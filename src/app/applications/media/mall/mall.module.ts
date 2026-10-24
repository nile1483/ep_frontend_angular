import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { MallRoutingModule } from './mall-routing.module';

// Component
import { MallListPageComponent } from './mall-list-page/mall-list-page.component';
import { MallDetailPageComponent } from './mall-detail-page/mall-detail-page.component';


@NgModule({
  declarations: [
    MallListPageComponent,
    MallDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    MallRoutingModule
  ]
})
export class MallModule { }
