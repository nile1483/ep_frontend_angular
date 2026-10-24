import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarbaPageComponent } from './garba-page/garba-page.component';

const routes: Routes = [
  { path: '', component: GarbaPageComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GarbaPageRoutingModule { }
