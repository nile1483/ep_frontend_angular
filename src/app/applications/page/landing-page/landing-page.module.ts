import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MediaSharedModule } from '../../media/shared/media-shared.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageListComponent } from './landing-page-list/landing-page-list.component';
import { LandingPageDetailComponent } from './landing-page-detail/landing-page-detail.component';
import { ContentBuilderModule } from '../../content-builder/content-builder.module';

@NgModule({
  declarations: [
    LandingPageListComponent,
    LandingPageDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MediaSharedModule,
    SharedModule,
    ContentBuilderModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }