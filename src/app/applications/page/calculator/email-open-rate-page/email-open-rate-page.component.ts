import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-email-open-rate-page',
    templateUrl: './email-open-rate-page.component.html',
    styleUrl: './email-open-rate-page.component.css',
    standalone: false
})
export class EmailOpenRatePageComponent {

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
      "question": "Why Is Email Open Rate Important?",
      "answer": "Calculating the Email Open Rate is a significant component of the evaluation and optimization of your email marketing campaigns. It tracks audience connection and engagement. Monitoring it can enhance campaign performance and ROI in email marketing."
    },
    {
      "question": "What Factors Can Affect My Email Open Rate?",
      "answer": "There are several factors affecting your Email Open Rate, such as the timing of sending emails, Sender Authentication, subject lines, Successful Email Delivery, and Relevant and audience-centric content."
    },
    {
      "question": "Can The Email Open Rate Calculator Help Me With Other Metrics?",
      "answer": "Of course! Along with tracking open rates, the Email Open Rate Calculator helps in the optimization of other metrics like bounce rate, click-through rate (CTR),  and conversion rates. It can help you improve the future campaign strategy for Email Marketing."
    },
    {
      "question": "What Is The Difference Between Unique Opens And Total Opens?",
      "answer": "Unique Opens: It presents the data of mail recipients who open your mail at least once. Total Opens: It shows the frequency of mail openings in total, be it multiple openings by the same recipient."
    }
  ]

  cards = [
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
    {
      link: '/calculators/radio-ad-cost-calculator',
      image: 'assets/page/calculators/radio-ad-cost/radio-ad-cost-calculator-thumbnail.jpg',
      title: 'Radio Ad Cost Calculator',
      description: 'Estimate radio ad costs accurately. Plan budget effectively for maximum ROI. Calculate Radio Ad Cost Now!'
    },
  ]

}
