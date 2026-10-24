import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateGiftingStaticComponent } from './corporate-gifting-static/corporate-gifting-static.component';
import { CorporateGiftingDetailComponent } from './corporate-gifting-detail/corporate-gifting-detail.component';

const routes: Routes = [
  { path: '', component: CorporateGiftingStaticComponent},
  { path: ':downloadType', component: CorporateGiftingDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateGiftingStaticRoutingModule { }
