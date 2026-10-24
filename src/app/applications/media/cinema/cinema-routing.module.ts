import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CinemaListPageComponent } from './cinema-list-page/cinema-list-page.component';
import { CinemaDetailPageComponent } from './cinema-detail-page/cinema-detail-page.component';
const routes: Routes = [
  { path: '', component: CinemaListPageComponent},
  { path: ':alias', component: CinemaDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemaRoutingModule { }
