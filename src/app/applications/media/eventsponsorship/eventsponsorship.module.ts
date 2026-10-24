import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

// Module
import { MediaSharedModule } from '../shared/media-shared.module';

import { EventsponsorshipRoutingModule } from './eventsponsorship-routing.module';

import { EventsponsorshipListPageComponent } from './eventsponsorship-list-page/eventsponsorship-list-page.component';
import { EventsponsorshipDetailPageComponent } from './eventsponsorship-detail-page/eventsponsorship-detail-page.component';


@NgModule({
  declarations: [
    EventsponsorshipListPageComponent,
    EventsponsorshipDetailPageComponent
  ],
  imports: [
    CommonModule,
    MediaSharedModule,
    EventsponsorshipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class EventsponsorshipModule { }
