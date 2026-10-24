import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module
import { MediaSharedModule } from '../shared/media-shared.module';
import { NewspaperRoutingModule } from './newspaper-routing.module';

import { NewspaperDetailPageComponent } from './newspaper-detail-page/newspaper-detail-page.component';
import { NewspaperListPageComponent } from './newspaper-list-page/newspaper-list-page.component';


@NgModule({
  declarations: [
    NewspaperDetailPageComponent,
    NewspaperListPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    NewspaperRoutingModule
  ]
})
export class NewspaperModule { }
