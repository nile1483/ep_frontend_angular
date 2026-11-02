import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudgetEstimatorPageComponent } from './budget-estimator-page/budget-estimator-page.component';

const routes: Routes = [
  { path: '', component: BudgetEstimatorPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetEstimatorPageRoutingModule { }