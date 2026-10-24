import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { EventsponsorshipListPageComponent } from './eventsponsorship-list-page/eventsponsorship-list-page.component';
import { EventsponsorshipDetailPageComponent } from './eventsponsorship-detail-page/eventsponsorship-detail-page.component';

const routes: Routes = [
  { path: '', component: EventsponsorshipListPageComponent},
  { path: ':alias', component: EventsponsorshipDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsponsorshipRoutingModule { }
