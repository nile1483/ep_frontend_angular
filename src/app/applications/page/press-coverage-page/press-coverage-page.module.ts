import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { PressCoveragePageRoutingModule } from './press-coverage-page-routing.module';
import { PressCoveragePageComponent } from './press-coverage-page/press-coverage-page.component';

@NgModule({
  declarations: [
    PressCoveragePageComponent
  ],
  imports: [
    CommonModule,
    PressCoveragePageRoutingModule,
    SharedModule,
  ]
})
export class PressCoveragePageModule { }