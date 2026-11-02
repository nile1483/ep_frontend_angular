import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FreeStartupConsultationPageComponent } from './free-startup-consultation-page/free-startup-consultation-page.component';

const routes: Routes = [
  { path: '', component: FreeStartupConsultationPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeStartupConsultationPageRoutingModule { }