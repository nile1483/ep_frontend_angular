import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelPartnerPageComponent } from './channel-partner-page/channel-partner-page.component';

const routes: Routes = [
  { path: '', component: ChannelPartnerPageComponent},
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelPartnerPageRoutingModule { }
