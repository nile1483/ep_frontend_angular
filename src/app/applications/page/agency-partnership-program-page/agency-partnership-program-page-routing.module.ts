import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgencyPartnershipProgramPageComponent } from './agency-partnership-program-page/agency-partnership-program-page.component';

const routes: Routes = [
  { path: '', component: AgencyPartnershipProgramPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyPartnershipProgramPageRoutingModule { }