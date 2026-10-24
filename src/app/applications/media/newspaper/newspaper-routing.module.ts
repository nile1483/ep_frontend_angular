import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewspaperDetailPageComponent } from './newspaper-detail-page/newspaper-detail-page.component';
import { NewspaperListPageComponent } from './newspaper-list-page/newspaper-list-page.component';

const routes: Routes = [
  { path: '', component: NewspaperListPageComponent},
  { path: ':alias', component: NewspaperDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewspaperRoutingModule { }
