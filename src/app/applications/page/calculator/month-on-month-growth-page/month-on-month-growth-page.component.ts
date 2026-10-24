import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-month-on-month-growth-page',
  templateUrl: './month-on-month-growth-page.component.html',
  styleUrl: './month-on-month-growth-page.component.css'
})
export class MonthOnMonthGrowthPageComponent {

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
    this.growthResult = growth.toFixed(2);
  }

  faqList = [
    {
      "question": "How do you calculate Month-on-Month growth?",
      "answer": "MoM growth is the current month's value minus the previous month's value, divided by the previous month's value. Multiply by 100% to achieve the percentage."
    },
    {
      "question": "Why is tracking Month-on-Month important?",
      "answer": "Measuring MoM is particularly important to identify short term trends, assess performance, and subsequently modify strategies for growth. It provides almost immediate feedback that aids timely decision making."
    },
    {
      "question": "Who are Month-on-Month comparisons useful for?",
      "answer": "Such references prove useful to businesses, marketers, analysts, and product managers who assess performance retrospectively to understand growth trends and optimize their strategies according to up-to-date data."
    },
    {
      "question": "What if my Month-on-Month growth is negative?",
      "answer": "Negative MoM growth means that something is in decline, and that calls for an adjustment somewhere in the strategy. It can point to problems like customer churn or marketing initiatives not working, both of which need to be examined more closely."
    }
  ]

  cards = [
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
  ]

}
