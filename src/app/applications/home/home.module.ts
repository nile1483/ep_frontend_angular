import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent, HomePageNoteDialog } from './home-page/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HomePageNoteDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }