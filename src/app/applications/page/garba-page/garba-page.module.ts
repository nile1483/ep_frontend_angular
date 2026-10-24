import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { GarbaPageRoutingModule } from './garba-page-routing.module';
import { GarbaPageComponent } from './garba-page/garba-page.component';


@NgModule({
  declarations: [
    GarbaPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GarbaPageRoutingModule
  ]
})
export class GarbaPageModule { }
