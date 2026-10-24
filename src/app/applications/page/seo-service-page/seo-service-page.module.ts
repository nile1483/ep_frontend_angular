import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeoServicePageRoutingModule } from './seo-service-page-routing.module';
import { SeoServicePageComponent } from './seo-service-page/seo-service-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SeoServicePageDetailComponent } from './seo-service-page-detail/seo-service-page-detail.component';
import { SeoServiceDialogComponent } from './seo-service-dialog/seo-service-dialogcomponent';

@NgModule({
  declarations: [
    SeoServicePageComponent,
    SeoServicePageDetailComponent,
    SeoServiceDialogComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    SeoServicePageRoutingModule
  ]
})
export class SeoServicePageModule { }
