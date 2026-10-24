import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { CalculatorPageRoutingModule } from './calculator-page-routing.module';

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


@NgModule({
  declarations: [
    CalculatorListPageComponent,
    WeekOnWeekPageComponent,
    EcpmPageComponent,
    NetProfitMarginPageComponent,
    ProfitabilityIndexPageComponent,
    SustainableGrowthRatePageComponent,
    MonthOnMonthGrowthPageComponent,
    YearOnYearGrowthPageComponent,
    InfluencerMarketingRoiPageComponent,
    LeadToCustomerConversionRatePageComponent,
    BounceRatePageComponent,
    AdsenseRpmPageComponent,
    SalesForecastPageComponent,
    EmailOpenRatePageComponent,
    CustomerAcquisitionCostPageComponent,
    GoogleAdsRevenuePageComponent,
    GrossMarginPageComponent,
    RadioAdCostPageComponent,
    FacebookAdsRoiPageComponent,
    CtorPageComponent
  ],
  imports: [
    CommonModule,
    CalculatorPageRoutingModule,
    SharedModule
  ]
})
export class CalculatorPageModule { }
