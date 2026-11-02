import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CricketAdvertisingPageComponent } from './cricket-advertising-page/cricket-advertising-page.component';

const routes: Routes = [
  { path: '', component: CricketAdvertisingPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CricketAdvertisingPageRoutingModule { }