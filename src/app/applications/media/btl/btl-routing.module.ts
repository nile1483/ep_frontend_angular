import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BtlListPageComponent } from './btl-list-page/btl-list-page.component';
import { BtlDetailPageComponent } from './btl-detail-page/btl-detail-page.component';

const routes: Routes = [
  { path: '', component: BtlListPageComponent},
  { path: ':alias', component: BtlDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BtlRoutingModule { }
