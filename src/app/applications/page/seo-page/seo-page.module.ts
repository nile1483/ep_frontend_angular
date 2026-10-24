import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeoPageRoutingModule } from './seo-page-routing.module';
import { SeoPageDetailComponent } from './seo-page-detail/seo-page-detail.component';
import { ContentBuilderModule } from '../../content-builder/content-builder.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SeoPageDetailComponent
  ],
  imports: [
    CommonModule,
    SeoPageRoutingModule,
    ContentBuilderModule,
    SharedModule
  ]
})
export class SeoPageModule { }
