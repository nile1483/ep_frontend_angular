import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringtoolsListPageComponent } from './monitoringtools-list-page/monitoringtools-list-page.component';
import { MonitoringtoolsDetailPageComponent } from './monitoringtools-detail-page/monitoringtools-detail-page.component';

const routes: Routes = [
  { path: '', component: MonitoringtoolsListPageComponent},
  { path: ':alias', component: MonitoringtoolsDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringtoolsRoutingModule { }
