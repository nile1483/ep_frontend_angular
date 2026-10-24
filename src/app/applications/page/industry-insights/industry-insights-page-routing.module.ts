import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  {
    path: '', component: IndustryInsightsListPageComponent
  },
  {
    path: 'jewellery-advertising', component: JewelleryAdvertisingPageComponent
  },
  {
    path: 'education-advertising', component: EducationAdvertisingPageComponent
  },
  {
    path: 'real-estate-advertising', component: RealEstateAdvertisingPageComponent
  },
  {
    path: 'fmcg-advertising', component: FmcgAdvertisingPageComponent
  },
  {
    path: 'gaming-advertising', component: GamingAdvertisingPageComponent
  },
  {
    path: 'automobile-advertising-report', component: AutoMobileAdvertisingPageComponent
  },
  {
    path: 'e-commerce-advertising', component: ECommerceAdvertisingPageComponent
  },
  {
    path: 'lifestyle-and-apparel-advertising-report', component: LifestyleApparelAdvertisingPageComponent
  },
  {
    path: 'financial-services-advertising-report', component: FinancialServicesAdvertisingPageComponent
  },
  {
    path: 'packaged-rice-advertising-report', component: PackagedRicePageComponent
  },
  {
    path: 'renewable-energy-sector', component: RenewableEnergyPageComponent
  },
  {
    path: 'tourism-industry', component: TravelAndTourismPageComponent
  },
  {
    path: 'hospitality-sector', component: HospitalityPageComponent
  },
  {
    path: 'personal-care', component: PersonalCarePageComponent
  },
  {
    path: 'personal-healthcare', component: PersonalHealthCarePageComponent
  },
  {
    path: 'pharmaceuticals-industry', component: PharmaceuticalsAdvertisingPageComponent
  },
  {
    path: 'agriculture-farming-industry', component: AgricultureFarmingAdvertisingPageComponent
  },
  {
    path: 'food-sector', component: FoodSectorPageComponent
  },
  {
    path: 'petcare-tam-report', component: PetcareTamPageComponent
  },
  {
    path: 'ipl-tam-report', component: IplAdvertisingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryInsightsPageRoutingModule { }
