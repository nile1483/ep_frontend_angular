import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfilmOutfilmRoutingModule } from './infilm-outfilm-routing.module';
import { InfilmOutfilmComponent, InfilmOutfilmInquiryDialog } from './infilm-outfilm/infilm-outfilm.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    InfilmOutfilmComponent,
    InfilmOutfilmInquiryDialog
  ],
  imports: [
    CommonModule,
    InfilmOutfilmRoutingModule,
    SharedModule,
    MatDividerModule
  ]
})
export class InfilmOutfilmModule { }
