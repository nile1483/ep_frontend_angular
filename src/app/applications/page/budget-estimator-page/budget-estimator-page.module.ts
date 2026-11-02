import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { BudgetEstimatorPageRoutingModule } from './budget-estimator-page-routing.module';
import { BudgetEstimatorPageComponent } from './budget-estimator-page/budget-estimator-page.component';

@NgModule({
  declarations: [
    BudgetEstimatorPageComponent
  ],
  imports: [
    CommonModule,
    BudgetEstimatorPageRoutingModule,
    SharedModule,
  ]
})
export class BudgetEstimatorPageModule { }