import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-sales-forecast-page',
  templateUrl: './sales-forecast-page.component.html',
  styleUrl: './sales-forecast-page.component.css'
})
export class SalesForecastPageComponent {

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
      "question": "How do you calculate sales forecast?",
      "answer": "Forecasting sales means estimating the predictions of sales based on historical sales, market trends, and conversion rates. The forecast can be improved by using tools like a sales forecast calculator to make all the necessary predictions accurate."
    },
    {
      "question": "How can using a Sales Forecast Calculator benefit my business?",
      "answer": "Using a sales forecast calculator gives precise predictions that enable your business to structure itself accordingly, allocate its resources efficiently, and minimize possible risks while preparing sales targets that can be realized."
    },
    {
      "question": "What are the key sales forecasting metrics?",
      "answer": "Critical metrics include the number of leads, conversion rate, average deal size, sales cycle time, and historical sales data. These combine to help predict future revenue much better."
    },
    {
      "question": "What is a good sales forecasting growth rate?",
      "answer": "A fairly good growth rate varies across industries but is generally considered anywhere between 5% and 20%. Steady growth rates guarantee the sustainable expansion of business while maintaining realistic targets."
    }
  ]

  cards = [
    {
      link: '/calculators/email-open-rate-calculator',
      image: 'assets/page/calculators/email-open-rate/email-open-rate-calculator-thumbnail.jpg',
      title: 'Email Open Rate Calculator',
      description: 'Maximize your email marketing effectiveness with our Email Open Rate Calculator. Easily track engagement, optimize campaigns, and improve ROI by measuring how many recipients open your emails.'
    },
    {
      link: '/calculators/customer-acquisition-cost-calculator',
      image: 'assets/page/calculators/customer-acquisition-cost/customer-acquisition-cost-calculator-thumbnail.jpg',
      title: 'Customer Acquisition Cost Calculator',
      description: 'Estimate your average cost per customer acquisition with our simple CAC Calculator. Input your sales and marketing expenses along with the number of new customers gained to gain valuable insights into your acquisition costs.'
    },
    {
      link: '/calculators/google-ads-revenue-calculator',
      image: 'assets/page/calculators/google-ads-revenue/google-ads-revenue-calculator-thumbnail.jpg',
      title: 'Google Ads Revenue Calculator',
      description: 'Estimate your Google Ads revenue potential with our simple calculator. Input your campaign details like budget, CPC, and conversion rate to get quick insights into potential earnings.'
    },
    {
      link: '/calculators/gross-margin-calculator',
      image: 'assets/page/calculators/gross-margin/gross-margin-calculator-thumbnail.jpg',
      title: 'Gross Margin Calculator',
      description: 'Determine your business profitability with our Gross Margin Calculator. Accurately calculate your gross margin to make informed financial decisions and optimize your operations. Calculate now!'
    },
  ]

}
