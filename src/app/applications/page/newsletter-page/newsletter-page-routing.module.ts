import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsletterPageComponent } from './newsletter-page/newsletter-page.component';

const routes: Routes = [
  { path: '', component: NewsletterPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterPageRoutingModule { }