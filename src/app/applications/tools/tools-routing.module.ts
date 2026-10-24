import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaPlanningComponent } from './media-planning/media-planning.component';


const routes: Routes = [
  { path: 'media-planning', component: MediaPlanningComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
