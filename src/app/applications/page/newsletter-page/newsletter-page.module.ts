import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { NewsletterPageRoutingModule } from './newsletter-page-routing.module';
import { NewsletterPageComponent } from './newsletter-page/newsletter-page.component';

@NgModule({
  declarations: [
    NewsletterPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    NewsletterPageRoutingModule
  ]
})
export class NewsletterPageModule { }
