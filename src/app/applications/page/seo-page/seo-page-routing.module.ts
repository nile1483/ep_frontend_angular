import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeoPageDetailComponent } from './seo-page-detail/seo-page-detail.component';

const routes: Routes = [
  { path: ':alias', component: SeoPageDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeoPageRoutingModule { }
