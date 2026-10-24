import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InfluencerDetailPageComponent } from './influencer-detail-page/influencer-detail-page.component';
import { InfluencerListPageComponent } from './influencer-list-page/influencer-list-page.component'; 

const routes: Routes = [
  { path: '', component: InfluencerListPageComponent},
  { path: ':alias', component: InfluencerDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfluencerRoutingModule { }
