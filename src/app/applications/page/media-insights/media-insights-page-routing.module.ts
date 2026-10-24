import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaInsightsListPageComponent } from './media-insights-list-page/media-insights-list-page.component';
import { DigitalAdvertisingPageComponent } from './digital-advertising-page/digital-advertising-page.component';
import { RadioAdvertisingPageComponent } from './radio-advertising-page/radio-advertising-page.component';
import { TelevisionAdvertisingPageComponent } from './television-advertising-page/television-advertising-page.component';
import { PrintAdvertisingPageComponent } from './print-advertising-page/print-advertising-page.component';
import { OutdoorAdvertisingPageComponent } from './outdoor-advertising-page/outdoor-advertising-page.component';
import { ImsReportPageComponent } from './ims-report-page/ims-report-page.component';

const routes: Routes = [
  {
    path: '', component: MediaInsightsListPageComponent
  },
  {
    path: 'print-advertising-report', component: PrintAdvertisingPageComponent
  },
  {
    path: 'digital-advertising-report', component: DigitalAdvertisingPageComponent
  },
  {
    path: 'radio-advertising-report', component: RadioAdvertisingPageComponent
  },
  {
    path: 'television-advertising-report', component: TelevisionAdvertisingPageComponent
  },
  {
    path: 'ims-report', component: ImsReportPageComponent
  },
  
  // {
  //   path: 'outdoor-advertising', component: OutdoorAdvertisingPageComponent
  // },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaInsightsPageRoutingModule { }
