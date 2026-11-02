import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeoServicePageComponent } from './seo-service-page/seo-service-page.component';
import { SeoServicePageDetailComponent } from './seo-service-page-detail/seo-service-page-detail.component';

const routes: Routes = [
  { path: '', component: SeoServicePageComponent },
  { path: ':type', component: SeoServicePageDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeoServicePageRoutingModule { }