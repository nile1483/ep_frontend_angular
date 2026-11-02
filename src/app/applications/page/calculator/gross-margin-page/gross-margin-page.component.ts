import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-gross-margin-page',
  templateUrl: './gross-margin-page.component.html',
  styleUrl: './gross-margin-page.component.css'
})
export class GrossMarginPageComponent {

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
    const growth = ((conversionRevenue - adSpend) / conversionRevenue) * 100;
    this.growthResult = growth.toFixed(2) + '%';
  }

  faqList = [
    {
      "question": "What's the difference between gross and net profit margin?",
      "answer": "Gross profit shows the profit of the organization after subtracting the cost of goods sold from the revenue. Whereas, net profit margin gives the complete picture of the profitability by considering all costs such as taxes, interest, and administrative costs."
    },
    {
      "question": "Can the profit margin be too high?",
      "answer": "Yes, it is possible to reach your profit margin too high, and the reason behind it can be overpriced products, reduced customer demand, and competitiveness. Indeed, profitability is increased by a high margin, but charging a high price may loss of clients and lead them to other businesses."
    },
    {
      "question": "What is a good margin?",
      "answer": "A good margin can be categorized by industry, but generally: Gross margin: 20–40% for manufacturing; 50–70% is a good one for retail. A profit margin of 10–20% is the norm for most industries. 5–10% is typical net margin; 15 %+ is optimum. Profitability is indicated by increased margins, but sustainability depends on costs and competition."
    },
    {
      "question": "How is margin different to markup?",
      "answer": "The difference is that the margin shows the percentage of revenue that we consider as profit; on the other hand, markup is the percentage that is added from the cost to determine the selling price."
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
