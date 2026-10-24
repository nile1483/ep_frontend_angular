import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutdoorDetailPageComponent } from './outdoor-detail-page/outdoor-detail-page.component';
import { OutdoorListPageComponent } from './outdoor-list-page/outdoor-list-page.component';

const routes: Routes = [
  { path: '', component: OutdoorListPageComponent},  
  { path: ':alias', component: OutdoorDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutdoorRoutingModule { }
