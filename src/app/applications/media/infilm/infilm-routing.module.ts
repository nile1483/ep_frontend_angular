import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfilmListPageComponent } from './infilm-list-page/infilm-list-page.component';
import { InfilmDetailPageComponent } from './infilm-detail-page/infilm-detail-page.component';

const routes: Routes = [
  { path: '', component: InfilmListPageComponent},
  { path: ':alias', component: InfilmDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfilmRoutingModule { }
