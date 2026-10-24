import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IPLPageComponent } from './ipl-page/ipl-page.component';

const routes: Routes = [
  { path: '', component: IPLPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IPLRoutingModule { }
