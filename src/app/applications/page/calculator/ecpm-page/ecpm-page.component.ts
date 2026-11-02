import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-ecpm-page',
  templateUrl: './ecpm-page.component.html',
  styleUrl: './ecpm-page.component.css'
})
export class EcpmPageComponent {
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
