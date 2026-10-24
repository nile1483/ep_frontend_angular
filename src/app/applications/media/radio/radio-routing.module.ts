import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadioListPageComponent } from './radio-list-page/radio-list-page.component';
import { RadioDetailPageComponent } from './radio-detail-page/radio-detail-page.component';

const routes: Routes = [
  { path: '', component: RadioListPageComponent},
  { path: ':alias', component: RadioDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioRoutingModule { }
