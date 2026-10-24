import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvertisingPageListComponent } from './advertising-page-list/advertising-page-list.component';
import { AdvertisingPageDetailComponent } from './advertising-page-detail/advertising-page-detail.component';

const routes: Routes = [
  { path: '', component: AdvertisingPageListComponent},
  { path: ':slug', component: AdvertisingPageDetailComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisingPageRoutingModule { }
