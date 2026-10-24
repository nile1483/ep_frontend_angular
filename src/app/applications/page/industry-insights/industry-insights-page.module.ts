import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { IndustryInsightsPageRoutingModule } from './industry-insights-page-routing.module';

import { IndustryInsightsListPageComponent } from './industry-insights-list-page/industry-insights-list-page.component';
import { JewelleryAdvertisingPageComponent } from './jewellery-advertising-page/jewellery-advertising-page.component';
import { EducationAdvertisingPageComponent } from './education-advertising-page/education-advertising-page.component';
import { RealEstateAdvertisingPageComponent } from './realestate-advertising-page/realestate-advertising-page.component';
import { FmcgAdvertisingPageComponent } from './fmcg-advertising-page/fmcg-advertising-page.component';
import { GamingAdvertisingPageComponent } from './gaming-advertising-page/gaming-advertising-page.component';
import { AutoMobileAdvertisingPageComponent } from './auto-mobile-advertising-page/auto-mobile-advertising-page.component';
import { ECommerceAdvertisingPageComponent } from './e-commerce-advertising-page/e-commerce-advertising-page.component';
import { LifestyleApparelAdvertisingPageComponent } from './lifestyle-apparel-advertising-page/lifestyle-apparel-advertising-page.component';
import { FinancialServicesAdvertisingPageComponent } from './financial-services-advertising-page/financial-services-advertising-page.component';
import { PackagedRicePageComponent } from './packaged-rice-page/packaged-rice-page.component';
import { RenewableEnergyPageComponent } from './renewable-energy-page/renewable-energy-page.component';
import { TravelAndTourismPageComponent } from './travel-and-tourism-page/travel-and-tourism-page.component';
import { HospitalityPageComponent } from './hospitality-page/hospitality-page.component';
import { PersonalCarePageComponent } from './personal-care-page/personal-care-page.component';
import { PersonalHealthCarePageComponent } from './personal-health-care-page/personal-health-care-page.component';
import { PharmaceuticalsAdvertisingPageComponent } from './pharmaceuticals-advertising-page/pharmaceuticals-advertising-page.component';
import { AgricultureFarmingAdvertisingPageComponent } from './agriculture-farming-advertising-page/agriculture-farming-advertising-page.component';
import { FoodSectorPageComponent } from './food-sector-page/food-sector-page.component';
import { PetcareTamPageComponent } from './petcare-tam-page/petcare-tam-page.component';
import { IplAdvertisingPageComponent } from './ipl-advertising-page/ipl-advertising-page.component';

@NgModule({
  declarations: [
    IndustryInsightsListPageComponent,
    JewelleryAdvertisingPageComponent,
    EducationAdvertisingPageComponent,
    RealEstateAdvertisingPageComponent,
    FmcgAdvertisingPageComponent,
    GamingAdvertisingPageComponent,
    AutoMobileAdvertisingPageComponent,
    ECommerceAdvertisingPageComponent,
    LifestyleApparelAdvertisingPageComponent,
    FinancialServicesAdvertisingPageComponent,
    PackagedRicePageComponent,
    RenewableEnergyPageComponent,
    TravelAndTourismPageComponent,
    HospitalityPageComponent,
    PersonalCarePageComponent,
    PersonalHealthCarePageComponent,
    PharmaceuticalsAdvertisingPageComponent,
    AgricultureFarmingAdvertisingPageComponent,
    FoodSectorPageComponent,
    PetcareTamPageComponent,
    IplAdvertisingPageComponent
  ],
  imports: [
    CommonModule,
    IndustryInsightsPageRoutingModule,
    SharedModule
  ]
})
export class IndustryInsightsPageModule { }
