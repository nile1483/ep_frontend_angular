import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DigitalListPageComponent } from './digital-list-page/digital-list-page.component';
import { DigitalDetailPageComponent } from './digital-detail-page/digital-detail-page.component';

const routes: Routes = [
  { path: '', component: DigitalListPageComponent},
  { path: ':alias', component: DigitalDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalRoutingModule { }
