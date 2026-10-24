import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NontraditionalDetailPageComponent } from './nontraditional-detail-page/nontraditional-detail-page.component';
import { NontraditionalListPageComponent } from './nontraditional-list-page/nontraditional-list-page.component';

const routes: Routes = [
  { path: '', component: NontraditionalListPageComponent},
  { path: ':alias', component: NontraditionalDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NontraditionalRoutingModule { }
