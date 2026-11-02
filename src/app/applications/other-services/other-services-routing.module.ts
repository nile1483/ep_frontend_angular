import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OtherServicesPageComponent } from './other-services-page/other-services-page.component';

const routes: Routes = [
  { path: 'design-solutions', component: OtherServicesPageComponent },
  { path: 'interactive-meets', component: OtherServicesPageComponent },
  { path: '404', component: PageNotFoundComponent }, 
  { path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherServicesRoutingModule { }