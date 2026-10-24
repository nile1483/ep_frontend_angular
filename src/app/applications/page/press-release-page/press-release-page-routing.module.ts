import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PressReleasePageComponent } from './press-release-page/press-release-page.component';

const routes: Routes = [
  { path: '', component: PressReleasePageComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressReleasePageRoutingModule { }
