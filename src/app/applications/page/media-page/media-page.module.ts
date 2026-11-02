import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { MediaPageRoutingModule } from './media-page-routing.module';
import { MediaPageComponent } from './media-page/media-page.component';

@NgModule({
  declarations: [
    MediaPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MediaPageRoutingModule
  ]
})
export class MediaPageModule { }