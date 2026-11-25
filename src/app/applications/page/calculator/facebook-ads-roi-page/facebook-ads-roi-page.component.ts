import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CALCULATOR_META_DATA } from '@app-shared-constants';
import { MetaInformation } from '@app-shared-model';
import { CommonService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';

@Component({
  selector: 'app-facebook-ads-roi-page',
  templateUrl: './facebook-ads-roi-page.component.html',
  styleUrl: './facebook-ads-roi-page.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class FacebookAdsRoiPageComponent {

  growthForm: FormGroup;
  growthResult: string = '';

  webURL: string = AppURL.webURL;
  metaData: any = CALCULATOR_META_DATA['facebook-ads-roi-calculator'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
  ) {
    this.growthForm = this.fb.group({
      conversionRevenue: ['', [Validators.required, Validators.min(0.01)]],
      adSpend: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

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

    this.commonService.gtmPageEvents('Company', 'Facebook Ads ROI Calculator');
  }

  get conversionRevenue() {
    return this.growthForm.get('conversionRevenue');
  }

  get adSpend() {
    return this.growthForm.get('adSpend');
  }

  calculateWOWGrowth() {
    const { conversionRevenue, adSpend } = this.growthForm.value;
    const growth = ((conversionRevenue - adSpend) / adSpend) * 100;
    this.growthResult = growth.toFixed(2) + '%';
  }

  faqList = [
    {
      "question": "What is Facebook Ads ROI Calculator?",
      "answer": "Purpose of the ROI Calculator for Facebook Ads: The tool is meant to derive the return on investment for the Facebook ad campaign.by measuring revenues against the costs of ads."
    },
    {
      "question": "How much does it cost to put an ad on Facebook?",
      "answer": "The advertising costs on Facebook depend on several factors, such as targeting, ad duration, and bidding strategy. It is estimated that, on average, in India, businesses incur costs of any value between ₹30 and ₹150 per click."
    },
    {
      "question": "How do I track my ROI on Facebook?",
      "answer": "ROI on Facebook can be measured by putting the revenue generated from the ad in comparison with the money spent on that ad campaign, using a Facebook Ads ROI calculator to make the task easier."
    },
    {
      "question": "Can I Use This Tool for Other Types of Ads?",
      "answer": "This tool is tailored for Facebook Ads; different ROI calculators would be required for other platforms, like Google Ads."
    }
  ]

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
  ]

}
