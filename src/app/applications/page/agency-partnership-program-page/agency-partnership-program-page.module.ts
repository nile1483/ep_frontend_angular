import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { AgencyPartnershipProgramPageRoutingModule } from './agency-partnership-program-page-routing.module';
import { AgencyPartnershipProgramPageComponent } from './agency-partnership-program-page/agency-partnership-program-page.component';

@NgModule({
  declarations: [
    AgencyPartnershipProgramPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AgencyPartnershipProgramPageRoutingModule
  ]
})
export class AgencyPartnershipProgramPageModule { }