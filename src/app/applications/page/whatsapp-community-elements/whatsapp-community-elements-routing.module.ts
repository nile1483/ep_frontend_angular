import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatsappCommunityElementsComponent } from './whatsapp-community-elements-page/whatsapp-community-elements-page.component';

const routes: Routes = [
  { path: '', component: WhatsappCommunityElementsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsappCommunityElementsRoutingModule { }
