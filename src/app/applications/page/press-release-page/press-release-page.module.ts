import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { PressReleasePageRoutingModule } from './press-release-page-routing.module';
import { PressReleasePageComponent } from './press-release-page/press-release-page.component';


@NgModule({
  declarations: [
    PressReleasePageComponent
  ],
  imports: [
    CommonModule,
    PressReleasePageRoutingModule,
    SharedModule,
  ]
})
export class PressReleasePageModule { }
