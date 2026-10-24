import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirportListPageComponent } from './airport-list-page/airport-list-page.component';
import { AirportDetailPageComponent } from './airport-detail-page/airport-detail-page.component';

const routes: Routes = [
  { path: '', component: AirportListPageComponent},
  { path: ':alias', component: AirportDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirportRoutingModule { }
