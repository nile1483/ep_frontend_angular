import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InflightListPageComponent } from './inflight-list-page/inflight-list-page.component';
import { InflightDetailPageComponent } from './inflight-detail-page/inflight-detail-page.component';

const routes: Routes = [
  { path: '', component: InflightListPageComponent},
  { path: ':alias', component: InflightDetailPageComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InflightRoutingModule { }
