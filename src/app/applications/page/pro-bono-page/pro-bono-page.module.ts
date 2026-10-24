import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProBonoPageRoutingModule } from './pro-bono-page-routing.module';
import { ProBonoPageComponent } from './pro-bono-page/pro-bono-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProBonoPageComponent
  ],
  imports: [
    CommonModule,
    ProBonoPageRoutingModule,
    SharedModule
  ]
})
export class ProBonoPageModule { }
