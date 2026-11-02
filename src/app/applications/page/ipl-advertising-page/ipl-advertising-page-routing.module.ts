import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IPLAdvertisingPageComponent } from './ipl-advertising-page/ipl-advertising-page.component';

const routes: Routes = [
  { path: '', component: IPLAdvertisingPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IplAdvertisingPageRoutingModule { }