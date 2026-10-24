import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CricketAdvertisingComponent } from './cricket-advertising/cricket-advertising.component';

const routes: Routes = [
  { path: '', component: CricketAdvertisingComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CricketAdvertisingRoutingModule { }
