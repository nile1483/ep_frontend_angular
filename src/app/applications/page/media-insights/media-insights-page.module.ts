import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { MediaInsightsPageRoutingModule } from './media-insights-page-routing.module';

import { MediaInsightsListPageComponent } from './media-insights-list-page/media-insights-list-page.component';
import { DigitalAdvertisingPageComponent } from './digital-advertising-page/digital-advertising-page.component';
import { RadioAdvertisingPageComponent } from './radio-advertising-page/radio-advertising-page.component';
import { TelevisionAdvertisingPageComponent } from './television-advertising-page/television-advertising-page.component';
import { PrintAdvertisingPageComponent } from './print-advertising-page/print-advertising-page.component';
import { OutdoorAdvertisingPageComponent } from './outdoor-advertising-page/outdoor-advertising-page.component';
import { ImsReportPageComponent } from './ims-report-page/ims-report-page.component';


@NgModule({
  declarations: [
    MediaInsightsListPageComponent,
    DigitalAdvertisingPageComponent,
    RadioAdvertisingPageComponent,
    TelevisionAdvertisingPageComponent,
    PrintAdvertisingPageComponent,
    OutdoorAdvertisingPageComponent,
    ImsReportPageComponent
  ],
  imports: [
    CommonModule,
    MediaInsightsPageRoutingModule,
    SharedModule
  ]
})
export class MediaInsightsPageModule { }
