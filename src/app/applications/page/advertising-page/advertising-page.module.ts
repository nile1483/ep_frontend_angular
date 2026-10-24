import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MediaSharedModule } from '../../media/shared/media-shared.module';

import { AdvertisingPageRoutingModule } from './advertising-page-routing.module';
import { AdvertisingPageListComponent } from './advertising-page-list/advertising-page-list.component';
import { ContentBuilderModule } from '../../content-builder/content-builder.module';
import { AdvertisingPageDetailComponent } from './advertising-page-detail/advertising-page-detail.component';

@NgModule({
  declarations: [
    AdvertisingPageListComponent,
    AdvertisingPageDetailComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MediaSharedModule,
    AdvertisingPageRoutingModule,
    ContentBuilderModule
  ]
})
export class AdvertisingPageModule { }
