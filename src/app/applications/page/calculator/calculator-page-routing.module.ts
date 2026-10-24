import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalculatorListPageComponent } from './calculator-list-page/calculator-list-page.component';
import { WeekOnWeekPageComponent } from './week-on-week-page/week-on-week-page.component';
import { EcpmPageComponent } from './ecpm-page/ecpm-page.component';
import { NetProfitMarginPageComponent } from './net-profit-margin-page/net-profit-margin-page.component';
import { ProfitabilityIndexPageComponent } from './profitability-index-page/profitability-index-page.component';
import { SustainableGrowthRatePageComponent } from './sustainable-growth-rate-page/sustainable-growth-rate-page.component';
import { MonthOnMonthGrowthPageComponent } from './month-on-month-growth-page/month-on-month-growth-page.component';
import { YearOnYearGrowthPageComponent } from './year-on-year-growth-page/year-on-year-growth-page.component';
import { InfluencerMarketingRoiPageComponent } from './influencer-marketing-roi-page/influencer-marketing-roi-page.component';
import { LeadToCustomerConversionRatePageComponent } from './lead-to-customer-conversion-rate-page/lead-to-customer-conversion-rate-page.component';
import { BounceRatePageComponent } from './bounce-rate-page/bounce-rate-page.component';
import { AdsenseRpmPageComponent } from './adsense-rpm-page/adsense-rpm-page.component';
import { SalesForecastPageComponent } from './sales-forecast-page/sales-forecast-page.component';
import { EmailOpenRatePageComponent } from './email-open-rate-page/email-open-rate-page.component';
import { CustomerAcquisitionCostPageComponent } from './customer-acquisition-cost-page/customer-acquisition-cost-page.component';
import { GoogleAdsRevenuePageComponent } from './google-ads-revenue-page/google-ads-revenue-page.component';
import { GrossMarginPageComponent } from './gross-margin-page/gross-margin-page.component';
import { RadioAdCostPageComponent } from './radio-ad-cost-page/radio-ad-cost-page.component';
import { FacebookAdsRoiPageComponent } from './facebook-ads-roi-page/facebook-ads-roi-page.component';
import { CtorPageComponent } from './ctor-page/ctor-page.component';

const routes: Routes = [
  {
    path: '', component: CalculatorListPageComponent
  },
  {
    path: 'week-on-week-calculator', component: WeekOnWeekPageComponent
  },
  {
    path: 'ecpm-calculator', component: EcpmPageComponent
  },
  {
    path: 'net-profit-margin-calculator', component: NetProfitMarginPageComponent
  },
  {
    path: 'profitability-index-calculator', component: ProfitabilityIndexPageComponent
  },
  {
    path: 'sustainable-growth-rate-calculator', component: SustainableGrowthRatePageComponent
  },
  {
    path: 'month-on-month-growth-calculator', component: MonthOnMonthGrowthPageComponent
  },
  {
    path: 'year-on-year-growth-calculator', component: YearOnYearGrowthPageComponent
  },
  {
    path: 'influencer-marketing-roi-calculator', component: InfluencerMarketingRoiPageComponent
  },
  {
    path: 'lead-to-customer-conversion-rate-calculator', component: LeadToCustomerConversionRatePageComponent
  },
  {
    path: 'bounce-rate-calculator', component: BounceRatePageComponent
  },
  {
    path: 'adsense-rpm-calculator', component: AdsenseRpmPageComponent
  },
  {
    path: 'sales-forecast-calculator', component: SalesForecastPageComponent
  },
  {
    path: 'email-open-rate-calculator', component: EmailOpenRatePageComponent
  },
  {
    path: 'customer-acquisition-cost-calculator', component: CustomerAcquisitionCostPageComponent
  },
  {
    path: 'google-ads-revenue-calculator', component: GoogleAdsRevenuePageComponent
  },
  {
    path: 'gross-margin-calculator', component: GrossMarginPageComponent
  },
  {
    path: 'radio-ad-cost-calculator', component: RadioAdCostPageComponent
  },
  {
    path: 'facebook-ads-roi-calculator', component: FacebookAdsRoiPageComponent
  },
  {
    path: 'ctor-calculator', component: CtorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorPageRoutingModule { }
