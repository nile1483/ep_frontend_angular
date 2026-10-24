import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { MediaPlanningComponent } from './media-planning/media-planning.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MediaPlanningComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule { }
