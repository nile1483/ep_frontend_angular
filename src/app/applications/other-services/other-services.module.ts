import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { OtherServicesRoutingModule } from './other-services-routing.module';
import { OtherServicesPageComponent } from './other-services-page/other-services-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    OtherServicesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OtherServicesRoutingModule
  ]
})
export class OtherServicesModule { }
