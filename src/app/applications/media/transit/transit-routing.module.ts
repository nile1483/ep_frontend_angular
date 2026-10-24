import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransitDetailPageComponent } from './transit-detail-page/transit-detail-page.component';
import { TransitListPageComponent } from './transit-list-page/transit-list-page.component';

const routes: Routes = [
  { path: '', component: TransitListPageComponent},
  { path: ':alias', component: TransitDetailPageComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransitRoutingModule { }
