import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CALCULATOR_META_DATA } from '@app-shared-constants';
import { MetaInformation } from '@app-shared-model';
import { CommonService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';

@Component({
  selector: 'app-ecpm-page',
  templateUrl: './ecpm-page.component.html',
  styleUrl: './ecpm-page.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class EcpmPageComponent {

  growthForm: FormGroup;
  growthResult: string = '';

  webURL: string = AppURL.webURL;
  metaData: any = CALCULATOR_META_DATA['ecpm-calculator'];

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

    this.commonService.gtmPageEvents('Company', 'ECPM Calculator');
  }

  get conversionRevenue() {
    return this.growthForm.get('conversionRevenue');
  }

  get adSpend() {
    return this.growthForm.get('adSpend');
  }

  calculateWOWGrowth() {
    const { conversionRevenue, adSpend } = this.growthForm.value;
    const growth = (conversionRevenue / adSpend) * 1000;
    this.growthResult = growth.toFixed(2);
  }

  faqList = [
    {
      "question": "How is eCPM calculated?",
      "answer": "eCPM = Total earning/ Total impressions * 100"
    },
    {
      "question": "Why is my eCPM so high?",
      "answer": "Your eCPM is high because advertisers are bidding more for your audience, your ad placements are performing well, or you have high engagement rates."
    },
    {
      "question": "How Does eCPM Help in Marketing Strategies?",
      "answer": "eCPM helps measure ad revenue efficiency, compare different ad formats, and optimize ad placements for better earnings."
    },
    {
      "question": "What is an eCPM Floor?",
      "answer": "An eCPM floor is the minimum price you set for advertisers to bid on your ad inventory."
    }
  ]

  cards = [
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
  ]
}
