import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { FreeStartupConsultationPageRoutingModule } from './free-startup-consultation-page-routing.module';
import { FreeStartupConsultationPageComponent } from './free-startup-consultation-page/free-startup-consultation-page.component';

@NgModule({
  declarations: [
    FreeStartupConsultationPageComponent
  ],
  imports: [
    CommonModule,
    FreeStartupConsultationPageRoutingModule,
    SharedModule
  ]
})
export class FreeStartupConsultationPageModule { }