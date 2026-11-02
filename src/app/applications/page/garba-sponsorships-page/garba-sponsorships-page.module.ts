import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { GarbaSponsorshipsPageRoutingModule } from './garba-sponsorships-page-routing.module';
import { GarbaSponsorshipsPageComponent } from './garba-sponsorships-page/garba-sponsorships-page.component';

@NgModule({
  declarations: [
    GarbaSponsorshipsPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GarbaSponsorshipsPageRoutingModule
  ]
})
export class GarbaSponsorshipsPageModule { }