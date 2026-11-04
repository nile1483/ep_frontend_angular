import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-adsense-rpm-page',
    templateUrl: './adsense-rpm-page.component.html',
    styleUrl: './adsense-rpm-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdsenseRpmPageComponent {

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
    const growth = ((conversionRevenue * 100) / adSpend);
    this.growthResult = growth.toFixed(2);
  }

  faqList = [
    {
      "question": "What does RPM stand for?",
      "answer": "RPM stands for Revenue Per Thousand Impressions. It shows how much you earn for every 1,000 ad impressions. It helps measure how effectively your ads are performing. A higher RPM means better ad revenue and performance."
    },
    {
      "question": "How to calculate RPM on AdSense?",
      "answer": "RPM = (Estimated earnings × 1000) ÷ Number of impressions For example, if you earn ₹500 from 10,000 impressions, your RPM would be ₹50. This helps you understand how much you are making per 1,000 views."
    },
    {
      "question": "What is a good RPM for AdSense?",
      "answer": "A good RPM depends on the niche and location, but generally, ₹100 to ₹600 for Indian traffic is considered good. High-paying niches like finance and technology often have higher RPMs. Lower RPMs are common in entertainment and general content. "
    },
    {
      "question": "How can I increase AdSense RPM?",
      "answer": "Improve ad placement, target high-paying keywords, increase traffic quality, and optimize for mobile users. Focus on creating high-quality content and increasing user engagement to boost RPM. Testing different ad formats can also help improve results."
    }
  ]

  cards = [
    {
      link: '/calculators/sales-forecast-calculator',
      image: 'assets/page/calculators/sales-forecast/sales-forecast-calculator-thumbnail.jpg',
      title: 'Sales Forecast Calculator',
      description: 'Estimate future sales performance with our Sales Forecast Calculator. Input historical data and market trends to generate accurate projections, aiding in informed decision-making and strategic planning for your business.'
    },
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
  ]
  
}
