import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldCupPageComponent } from './world-cup-page/world-cup-page.component';

const routes: Routes = [
  { path: '', component: WorldCupPageComponent},
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldCupPageRoutingModule { }
