import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MallListPageComponent } from './mall-list-page/mall-list-page.component';
import { MallDetailPageComponent } from './mall-detail-page/mall-detail-page.component';

const routes: Routes = [
  { path: '', component: MallListPageComponent},
  { path: ':alias', component: MallDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MallRoutingModule { }
