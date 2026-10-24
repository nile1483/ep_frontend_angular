import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProBonoPageComponent } from './pro-bono-page/pro-bono-page.component';

const routes: Routes = [
  { path: '', component: ProBonoPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProBonoPageRoutingModule { }
