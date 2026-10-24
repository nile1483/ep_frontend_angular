import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GiftingDetailPageComponent } from './gifting-detail-page/gifting-detail-page.component';
import { GiftingListPageComponent } from './gifting-list-page/gifting-list-page.component';

const routes: Routes = [
  { path: '', component: GiftingListPageComponent},
  { path: ':alias', component: GiftingDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateGiftingRoutingModule { }
