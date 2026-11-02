import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/app/shared/shared.module';

import { CompanyRoutingModule } from './company-routing.module';

import { AboutComponent, ClienteleComponent, CareerComponent, CareerDetailComponent} from '@app-company-components';
import { TeamComponent, ContactComponent, HireAPlannerComponent} from '@app-company-components';
import { TermsConditionsComponent, RefundPolicyComponent} from '@app-company-components';
import { TestimonialsComponent, ServicesComponent, SitemapComponent } from '@app-company-components';
import { SearchComponent, LifeAtExcellentComponent} from '@app-company-components';

import { AboutNewComponent } from './about-new/about-new.component';
import { LifeAtExcellentNewComponent } from './life-at-excellent-new/life-at-excellent-new.component';
import { CareerQuestionsFormComponent } from './career-questions-form/career-questions-form.component';

@NgModule({
  declarations: [ 
    AboutComponent,
    ClienteleComponent,
    TeamComponent,
    ContactComponent,
    HireAPlannerComponent,
    TermsConditionsComponent,
    RefundPolicyComponent,
    TestimonialsComponent,
    ServicesComponent,
    SitemapComponent,
    SearchComponent,
    LifeAtExcellentComponent,
    CareerComponent,
    CareerDetailComponent,
    AboutNewComponent,
    LifeAtExcellentNewComponent,
    CareerQuestionsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CompanyRoutingModule,
    MatTooltipModule,
    MatIconModule
  ]
})

export class CompanyModule { }
