import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GarbaSponsorshipsPageComponent } from './garba-sponsorships-page/garba-sponsorships-page.component';

const routes: Routes = [
  { path: '', component: GarbaSponsorshipsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GarbaSponsorshipsPageRoutingModule { }