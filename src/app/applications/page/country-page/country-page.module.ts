import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ContentBuilderModule } from '../../content-builder/content-builder.module';
import { MediaSharedModule } from '../../media/shared/media-shared.module';

import { CountryPageRoutingModule } from './country-page-routing.module';
import { CountryPageDetailComponent } from './country-page-detail/country-page-detail.component';

@NgModule({
  declarations: [
    CountryPageDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MediaSharedModule,
    ContentBuilderModule,
    CountryPageRoutingModule
  ]
})
export class CountryPageModule { }