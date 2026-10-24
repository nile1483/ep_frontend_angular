import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetEstimatorPageRoutingModule } from './budget-estimator-page-routing.module';
import { BudgetEstimatorPageComponent } from './budget-estimator-page/budget-estimator-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
