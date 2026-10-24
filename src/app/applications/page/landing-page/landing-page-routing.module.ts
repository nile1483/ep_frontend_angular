import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageListComponent } from './landing-page-list/landing-page-list.component';
import { LandingPageDetailComponent } from './landing-page-detail/landing-page-detail.component';

const routes: Routes = [
  { path: '', component: LandingPageListComponent},
  { path: ':media', component: LandingPageListComponent},
  { path: ':media/:segment', component: LandingPageListComponent},
  { path: ':media/:segment/:alias', component: LandingPageDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
