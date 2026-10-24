import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ScheduleACallComponent } from './../../shared/components/schedule-a-call/schedule-a-call.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'schedule-a-call', component: ScheduleACallComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
