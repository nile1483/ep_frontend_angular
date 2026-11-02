import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent, ClienteleComponent, CareerComponent, CareerDetailComponent, CareerQuestionsFormComponent } from '@app-company-components';
import { TeamComponent, ContactComponent, HireAPlannerComponent } from '@app-company-components';
import { TermsConditionsComponent, RefundPolicyComponent } from '@app-company-components';
import { TestimonialsComponent, ServicesComponent, SitemapComponent} from '@app-company-components';
import { SearchComponent, LifeAtExcellentComponent} from '@app-company-components';

import { AboutNewComponent } from './about-new/about-new.component';
import { LifeAtExcellentNewComponent } from './life-at-excellent-new/life-at-excellent-new.component';

import { ClientRateMyServiceComponent } from '../../applications/client-rate-my-service/client-rate-my-service.component';
import { VendorRateMyServiceComponent } from '../../applications/vendor-rate-my-service/vendor-rate-my-service.component';

import { CourierConfirmationReceivedComponent } from '../../applications/courier-confirmation-received/courier-confirmation-received.component';
import { CourierConfirmationNotReceivedComponent } from '../../applications/courier-confirmation-not-received/courier-confirmation-not-received.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: 'about-new', component: AboutNewComponent},
  { path: 'clientele', component: ClienteleComponent},
  { path: 'team', component: TeamComponent},
  { path: 'life-at-excellent', component: LifeAtExcellentComponent},
  { path: 'life-at-excellent-new', component: LifeAtExcellentNewComponent},

  { path: 'career', component: CareerComponent},
  { path: 'career/:slug', component: CareerDetailComponent},
  { path: 'career/:slug/:uuid/questions', component: CareerQuestionsFormComponent},

  { path: 'contact', component: ContactComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'sitemap', component: SitemapComponent},
  { path: 'search', component: SearchComponent},
  { path: 'hire-a-planner', component: HireAPlannerComponent},
  { path: 'testimonials', component: TestimonialsComponent},
  // { path: 'refund-policy', component: RefundPolicyComponent},
  { path: 'terms-conditions', component: TermsConditionsComponent},
  
  { path: 'review/client', component: ClientRateMyServiceComponent},
  { path: 'review/vendor', component: VendorRateMyServiceComponent},

  { path: 'courierconfirmation/received', component: CourierConfirmationReceivedComponent},
  { path: 'courierconfirmation/notreceived', component: CourierConfirmationNotReceivedComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }