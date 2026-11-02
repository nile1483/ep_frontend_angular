import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-ctor-page',
  templateUrl: './ctor-page.component.html',
  styleUrl: './ctor-page.component.css'
})
export class CtorPageComponent {

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
    const growth = (conversionRevenue / adSpend) * 100;
    this.growthResult = growth.toFixed(2) + '%';
  }

  faqList = [
    {
      "question": "What Is A Good CTOR?",
      "answer": "A good CTOR typically ranges from 10% to 30%, though it can vary based on industry. A higher CTOR suggests engaging content and successful email campaigns."
    },
    {
      "question": "What Factors Can Affect My Click-To-Open Rate?",
      "answer": "Factors like subject lines, email design, content relevance, and the strength of your call-to-action can all impact your CTOR. Testing and optimization are key."
    },
    {
      "question": "What Other Metrics Should I Consider Alongside CTOR?",
      "answer": "Alongside CTOR, you should consider open rate, conversion rates, and click-through rate (CTR) to fully understand the performance of your email campaigns."
    },
    {
      "question": "What is click rate vs CTR vs CTOR?",
      "answer": "Click rate measures total clicks, CTR tracks clicks per email delivered, while CTOR focuses on clicks per email opened, offering deeper insights into engagement with the content."
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
