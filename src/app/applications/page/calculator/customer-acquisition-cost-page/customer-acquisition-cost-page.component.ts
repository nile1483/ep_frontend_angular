import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-customer-acquisition-cost-page',
    templateUrl: './customer-acquisition-cost-page.component.html',
    styleUrl: './customer-acquisition-cost-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CustomerAcquisitionCostPageComponent {

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
    const growth = (conversionRevenue / adSpend);
    this.growthResult = growth.toFixed(2);
  }

  faqList = [
    {
      "question": "Can customer acquisition cost be negative?",
      "answer": "No, customer acquisition cost (CAC) cannot be negative. If you haven't spent anything on sales or marketing, the CAC would be zero, but it can't be a negative value."
    },
    {
      "question": "How can I calculate the customer acquisition cost?",
      "answer": "You can calculate CAC by dividing the total sales and marketing costs by the number of new customers acquired. For example, if you spend ₹1,00,000 on sales and marketing and gain 50 new customers, the CAC would be ₹2,000 per customer."
    },
    {
      "question": "What is the customer acquisition cost if the number of new customers is zero?",
      "answer": "If you don’t gain any new customers, the CAC would be undefined since you can’t divide by zero. However, it would indicate that the money spent on sales and marketing did not result in any new customers."
    },
    {
      "question": "How do I analyze the customer acquisition cost?",
      "answer": "To analyze CAC, compare it with the Customer Lifetime Value (CLV). If CAC is lower than CLV, your business is making a profit from each customer. Also, track CAC over time to see if it’s increasing or decreasing and adjust your sales and marketing strategies accordingly."
    }
  ]

  cards = [
    {
      link: '/calculators/week-on-week-calculator',
      image: 'assets/page/calculators/week-on-week/week-on-week-calculator-thumbnail.jpg',
      title: 'Week on Week Calculators',
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
    }
  ]
  
}
