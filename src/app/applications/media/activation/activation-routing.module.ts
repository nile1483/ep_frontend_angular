import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivationListPageComponent } from './activation-list-page/activation-list-page.component';
import { ActivationDetailPageComponent } from './activation-detail-page/activation-detail-page.component';

const routes: Routes = [
  { path: '', component: ActivationListPageComponent},
  { path: ':alias', component: ActivationDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
