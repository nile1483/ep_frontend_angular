import { Component } from '@angular/core';
import { AppURL } from 'src/app/app-url';
import { MetaInformation } from '@app-shared-model';
import { META_DATA } from '@app-shared-constants';
import { CommonService } from '@app-shared-services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-calculator-list-page',
    templateUrl: './calculator-list-page.component.html',
    styleUrl: './calculator-list-page.component.css',
    standalone: false
})
export class CalculatorListPageComponent {

  webURL: string = AppURL.webURL;

  metaData: any = META_DATA['calculators'];

  cards = [
    {
      link: '/calculators/week-on-week-calculator',
      image: 'assets/page/calculators/week-on-week/week-on-week-calculator-thumbnail.jpg',
      title: 'Week on Week Calculator',
      description: 'Use our Week-on-Week Growth Calculator to measure your weekly growth rate. Track and analyze your performance accurately over time to make informed business decisions.'
    },
    {
      link: '/calculators/ecpm-calculator',
      image: 'assets/page/calculators/ecpm/ecpm-calculator-thumbnail.jpg',
      title: 'ECPM Calculator',
      description: 'Maximize your advertising revenue with our ECPM Calculator. Input ad impressions and earnings to generate accurate ECPM insights, aiding in effective ad strategy and revenue optimization.'
    },
    {
      link: '/calculators/net-profit-margin-calculator',
      image: 'assets/page/calculators/net-profit-margin/net-profit-margin-calculator-thumbnail.jpg',
      title: 'Net Profit Margin Calculator',
      description: 'Determine your business profitability with our Net Profit Margin Calculator. Input revenue and net profit to generate accurate margin insights, aiding in financial analysis and strategic planning.'
    },
    {
      link: '/calculators/profitability-index-calculator',
      image: 'assets/page/calculators/profitability-index/profitability-index-calculator-thumbnail.jpg',
      title: 'Profitability Index Calculator',
      description: 'Assess investment opportunities with our Profitability Index Calculator. Input cash flows and initial investment to determine project viability, aiding in informed decision-making for business investments.'
    },
    {
      link: '/calculators/sustainable-growth-rate-calculator',
      image: 'assets/page/calculators/sustainable-growth-rate/sustainable-growth-rate-calculator-thumbnail.jpg',
      title: 'Sustainable Growth Rate Calculator',
      description: 'Calculate your business sustainable growth rate with our SGR Calculator. Input financial data to generate accurate growth projections, aiding in long-term strategic planning and financial stability.'
    },
    {
      link: '/calculators/month-on-month-growth-calculator',
      image: 'assets/page/calculators/month-on-month-growth/month-on-month-growth-calculator-thumbnail.jpg',
      title: 'Month on Month Growth Calculator',
      description: 'Use our Month-on-Month Growth Calculator to measure your business monthly growth rate. Accurately track and analyze your performance over time to make informed decisions.'
    },
    {
      link: '/calculators/year-on-year-growth-calculator',
      image: 'assets/page/calculators/year-on-year-growth/year-on-year-growth-calculator-thumbnail.jpg',
      title: 'Year on Year Growth Calculator',
      description: 'Use our Year-on-Year Growth Calculator to measure your business annual growth rate. Accurately track and analyze your performance over time to make informed decisions.'
    },
    {
      link: '/calculators/influencer-marketing-roi-calculator',
      image: 'assets/page/calculators/influencer-marketing-roi/influencer-marketing-roi-calculator-thumbnail.jpg',
      title: 'Influencer Marketing ROI Calculator',
      description: 'Measure the success of your influencer campaigns with our Influencer Marketing ROI Calculator. Input campaign costs and returns to generate accurate ROI insights, aiding in strategic marketing decisions.'
    },
    {
      link: '/calculators/lead-to-customer-conversion-rate-calculator',
      image: 'assets/page/calculators/lead-to-customer-conversion-rate/lead-to-customer-conversion-rate-calculator-thumbnail.jpg',
      title: 'Lead-to-Customer Conversion Rate Calculator',
      description: 'Calculate your lead-to-customer conversion rate to evaluate your sales performance. Use our Lead-to-Customer Conversion Rate Calculator to optimize your sales funnel and improve conversion efficiency. Try it now!'
    },
    {
      link: '/calculators/bounce-rate-calculator',
      image: 'assets/page/calculators/bounce-rate/bounce-rate-calculator-thumbnail.jpg',
      title: 'Bounce Rate Calculator',
      description: 'Understand your website bounce rate with our Bounce Rate Calculator. Input relevant metrics to generate insights, aiding in optimizing website performance and enhancing user experience.'
    },
    {
      link: '/calculators/adsense-rpm-calculator',
      image: 'assets/page/calculators/adsense-rpm/adsense-rpm-calculator-thumbnail.jpg',
      title: 'Adsense RPM Calculator',
      description: 'Determine your website ad revenue potential with our Google AdSense RPM Calculator. Get accurate estimates of revenue per thousand impressions to optimize your monetization strategy. Try it now!'
    },
    {
      link: '/calculators/sales-forecast-calculator',
      image: 'assets/page/calculators/sales-forecast/sales-forecast-calculator-thumbnail.jpg',
      title: 'Sales Forecast Calculator',
      description: 'Estimate future sales performance with our Sales Forecast Calculator. Input historical data and market trends to generate accurate projections, aiding in informed decision-making and strategic planning for your business.'
    },
    {
      link: '/calculators/email-open-rate-calculator',
      image: 'assets/page/calculators/email-open-rate/email-open-rate-calculator-thumbnail.jpg',
      title: 'Email Open Rate Calculator',
      description: 'Maximize your email marketing effectiveness with our Email Open Rate Calculator. Easily track engagement, optimize campaigns, and improve ROI by measuring how many recipients open your emails.'
    },
    {
      link: '/calculators/customer-acquisition-cost-calculator',
      image: 'assets/page/calculators/customer-acquisition-cost/customer-acquisition-cost-calculator-thumbnail.jpg',
      title: 'Customer Acquisition Cost Calculator',
      description: 'Estimate your average cost per customer acquisition with our simple CAC Calculator. Input your sales and marketing expenses along with the number of new customers gained to gain valuable insights into your acquisition costs.'
    },
    {
      link: '/calculators/google-ads-revenue-calculator',
      image: 'assets/page/calculators/google-ads-revenue/google-ads-revenue-calculator-thumbnail.jpg',
      title: 'Google Ads Revenue Calculator',
      description: 'Estimate your Google Ads revenue potential with our simple calculator. Input your campaign details like budget, CPC, and conversion rate to get quick insights into potential earnings.'
    },
    {
      link: '/calculators/gross-margin-calculator',
      image: 'assets/page/calculators/gross-margin/gross-margin-calculator-thumbnail.jpg',
      title: 'Gross Margin Calculator',
      description: 'Determine your business profitability with our Gross Margin Calculator. Accurately calculate your gross margin to make informed financial decisions and optimize your operations. Calculate now!'
    },
    {
      link: '/calculators/radio-ad-cost-calculator',
      image: 'assets/page/calculators/radio-ad-cost/radio-ad-cost-calculator-thumbnail.jpg',
      title: 'Radio Ad Cost Calculator',
      description: 'Estimate radio ad costs accurately. Plan budget effectively for maximum ROI. Calculate Radio Ad Cost Now!'
    },
    {
      link: '/calculators/facebook-ads-roi-calculator',
      image: 'assets/page/calculators/facebook-ads-roi/facebook-ads-roi-calculator-thumbnail.jpg',
      title: 'Facebook Ads ROI Calculator',
      description: 'Calculate the ROI of your Facebook ads effortlessly with our Facebook Ads ROI Calculator. Discover ad spend effectiveness and optimize strategies for maximum returns.'
    },
    {
      link: '/calculators/ctor-calculator',
      image: 'assets/page/calculators/ctor/ctor-calculator-thumbnail.jpg',
      title: 'CTOR Calculator',
      description: 'open rate ctor calculator, engagement and conversion rates, Click-to-Open Rate Calculator'
    },
  ];


  constructor(
    private router: Router,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `${this.router.url}`;
    //og data          
    metaInfo.og_url = `${this.webURL}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Calculator');
  }
}
