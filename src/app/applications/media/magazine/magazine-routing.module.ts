import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MagazineDetailPageComponent } from './magazine-detail-page/magazine-detail-page.component';
import { MagazineListPageComponent } from './magazine-list-page/magazine-list-page.component';

const routes: Routes = [
  { path: '', component: MagazineListPageComponent},
  { path: ':alias', component: MagazineDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagazineRoutingModule { }
