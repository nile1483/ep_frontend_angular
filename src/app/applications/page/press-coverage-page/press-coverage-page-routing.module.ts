import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PressCoveragePageComponent } from './press-coverage-page/press-coverage-page.component';

const routes: Routes = [
  { path: '', component: PressCoveragePageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressCoveragePageRoutingModule { }