import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { PageRoutingModule } from './page-routing.module';
import { TestingPageComponent } from './testing-page/testing-page.component';

@NgModule({
  declarations: [
    TestingPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
