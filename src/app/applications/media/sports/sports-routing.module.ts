import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SportsListPageComponent } from './sports-list-page/sports-list-page.component';
import { SportsDetailPageComponent } from './sports-detail-page/sports-detail-page.component';

const routes: Routes = [
  { path: '', component: SportsListPageComponent},
  { path: ':alias', component: SportsDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }
