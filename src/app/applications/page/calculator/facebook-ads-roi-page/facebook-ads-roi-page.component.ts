import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-facebook-ads-roi-page',
  templateUrl: './facebook-ads-roi-page.component.html',
  styleUrl: './facebook-ads-roi-page.component.css'
})
export class FacebookAdsRoiPageComponent {

  growthForm: FormGroup;
  growthResult: string = '';

  app_svg_icon_list = APP_SVG_ICON_LIST;

  constructor(private fb: FormBuilder) {
    this.growthForm = this.fb.group({
      conversionRevenue: ['', [Validators.required, Validators.min(0.01)]],
      adSpend: ['', [Validators.required, Validators.min(0.01)]]
    });
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
