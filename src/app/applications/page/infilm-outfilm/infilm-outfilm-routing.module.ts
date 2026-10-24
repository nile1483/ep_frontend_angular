import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfilmOutfilmComponent } from './infilm-outfilm/infilm-outfilm.component';

const routes: Routes = [
  { path: '', component: InfilmOutfilmComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfilmOutfilmRoutingModule { }
