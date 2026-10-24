import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DigitalprDetailPageComponent } from './digitalpr-detail-page/digitalpr-detail-page.component';
import { DigitalprListPageComponent } from './digitalpr-list-page/digitalpr-list-page.component';

const routes: Routes = [
  { path: '', component: DigitalprListPageComponent},
  { path: ':alias', component: DigitalprDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalprRoutingModule { }
