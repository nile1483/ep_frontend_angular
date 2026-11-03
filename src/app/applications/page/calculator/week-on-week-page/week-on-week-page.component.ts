import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-week-on-week-page',
    templateUrl: './week-on-week-page.component.html',
    styleUrl: './week-on-week-page.component.css',
    standalone: false
})
export class WeekOnWeekPageComponent {

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
      "question": "How do you calculate week-over-week growth?",
      "answer": "Week-over-week (WoW) growth is calculated using the formula: <br><br><strong>WoW Growth = ((Current Week’s Value - Previous Week’s Value) / Previous Week’s Value) * 100</strong><br><br>This formula helps track the percentage change in performance from one week to the next, offering insights into short-term trends and business momentum."
    },
    {
      "question": "Why is tracking WoW growth important?",
      "answer": "Tracking Week-over-Week (WoW) growth is important because it provides a real-time, short-term analysis of business performance, marketing campaigns, and seasonal fluctuations. It enables businesses to quickly identify trends and refine their strategies for sustainable progress."
    },
    {
      "question": "Who are Week-on-Week comparisons useful for?",
      "answer": "Week-on-Week comparisons are especially useful for industries such as retail, media, advertising, and finance. These insights help businesses understand changing consumer behavior and respond effectively to evolving market conditions."
    },
    {
      "question": "What if my WoW growth is negative?",
      "answer": "A negative WoW growth rate indicates a drop in performance compared to the previous week. However, regularly monitoring these trends allows you to take timely, proactive measures and develop strategies that can steer your business toward recovery and growth."
    }
  ]

  cards = [
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
  ]

}
