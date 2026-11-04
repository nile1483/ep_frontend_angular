import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-sustainable-growth-rate-page',
    templateUrl: './sustainable-growth-rate-page.component.html',
    styleUrl: './sustainable-growth-rate-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SustainableGrowthRatePageComponent {

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
    const growth = (conversionRevenue / 100) * (adSpend / 100) * 100;
    this.growthResult = growth.toFixed(2) + '%';
  }

  faqList = [
    {
      "question": "How can I calculate sustainable growth rate?",
      "answer": "Sustainable Growth Rate (SGR) can be calculated using the formula: SGR = Return on Equity (ROE) × (1 – Dividend Payout Ratio)."
    },
    {
      "question": "What is a good sustainable growth rate?",
      "answer": "A good sustainable growth rate is usually between 5% to 15%, but it depends on the industry and business type."
    },
    {
      "question": "How can I improve sustainable growth rate?",
      "answer": "You can improve the sustainable growth rate by increasing profits, reducing costs, and retaining more earnings instead of paying dividends."
    },
    {
      "question": "What is the main limitation of the sustainable growth rate?",
      "answer": "The main limitation of the sustainable growth rate is that it assumes profit margins, dividend payout, and financial structure will stay the same, which may not always happen."
    }
  ]

  cards = [
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
  ]

}
