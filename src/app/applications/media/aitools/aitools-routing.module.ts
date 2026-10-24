import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AitoolsListPageComponent } from './aitools-list-page/aitools-list-page.component';
import { AitoolsDetailPageComponent } from './aitools-detail-page/aitools-detail-page.component';

const routes: Routes = [
  { path: '', component: AitoolsListPageComponent},
  { path: ':alias', component: AitoolsDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AitoolsRoutingModule { }
