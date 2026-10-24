import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesDeckPageComponent } from './sales-deck-page/sales-deck-page.component';

const routes: Routes = [
  { path: '', component: SalesDeckPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesDeckPageRoutingModule { }
