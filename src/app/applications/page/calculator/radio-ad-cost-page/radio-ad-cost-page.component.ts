import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-radio-ad-cost-page',
    templateUrl: './radio-ad-cost-page.component.html',
    styleUrl: './radio-ad-cost-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RadioAdCostPageComponent {

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
      "question": "What is a Radio Ad Calculator?",
      "answer": "A Radio Ad Calculator is a tool that helps you estimate the cost of running a radio ad. It considers factors like station, time slot, ad duration, and location to give you an idea of the pricing."
    },
    {
      "question": "Are radio ads cheaper than TV ads?",
      "answer": "Yes! Radio ads are much cheaper than TV ads because TV ads need high production costs and expensive airtime. Radio ads are more affordable and still reach a large audience."
    },
    {
      "question": "How much does a radio ad cost?",
      "answer": "The cost of a radio ad depends on factors like city, radio station, time slot, and ad length. On average, prices can range from ₹50 to ₹2,500 per second, but it varies by station and location."
    },
    {
      "question": "How do you calculate the cost per 1000 reach?",
      "answer": "To find the cost per 1000 reach (CPM), use this formula: CPM = (Total Ad Cost ÷ Total Listeners) × 1000 For example, if a radio ad costs ₹5,000 and reaches 50,000 people, the CPM would be: (5000 ÷ 50000) × 1000 = ₹100 per 1000 listeners."
    }
  ]

  cards = [
    {
      link: '/calculators/facebook-ads-roi-calculator',
      image: 'assets/page/calculators/facebook-ads-roi/facebook-ads-roi-calculator-thumbnail.jpg',
      title: 'Facebook Ads ROI Calculator',
      description: 'Calculate the ROI of your Facebook ads effortlessly with our Facebook Ads ROI Calculator. Discover ad spend effectiveness and optimize strategies for maximum returns.'
    },
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
  ]

}
