import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TelevisionListPageComponent } from './television-list-page/television-list-page.component';
import { TelevisionDetailPageComponent } from './television-detail-page/television-detail-page.component';

const routes: Routes = [
  { path: '', component: TelevisionListPageComponent},
  { path: ':alias', component: TelevisionDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelevisionRoutingModule { }
