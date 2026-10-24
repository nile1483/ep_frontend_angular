import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryPageDetailComponent } from './country-page-detail/country-page-detail.component';

const routes: Routes = [
  { path: '', component: CountryPageDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryPageRoutingModule { }
