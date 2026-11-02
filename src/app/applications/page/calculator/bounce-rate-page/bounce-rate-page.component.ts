import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-bounce-rate-page',
  templateUrl: './bounce-rate-page.component.html',
  styleUrl: './bounce-rate-page.component.css'
})
export class BounceRatePageComponent {

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
    const growth = ((conversionRevenue / adSpend)) * 100;
    this.growthResult = growth.toFixed(2) + '%';
  }

  faqList = [
    {
      "question": "What is the average bounce rate?",
      "answer": "What type of website your traffic arrives on, from where it originates, and what your industry is all play a part. According to research, the average bounce rate for most websites is anywhere from 26 to 70 percent. Also, the average bounce rate for a B2C website is 45%, while that for a B2B website is 56%."
    },
    {
      "question": "How do I calculate the bounce rate?",
      "answer": "If you want to calculate the bounce rate of your website, here’s the formula: Bounce Rate = (Total Number of Emails SentNumber of Bounced Emails)×100"
    },
    {
      "question": "Is bounce rate used to measure website performance?",
      "answer": "Yes, Bounce rate is useful in measuring website performance. It presents the percentage of visitors who visited the initial website page and left without interacting with further pages. It gives insights that can make your website a top-ranking site."
    },
    {
      "question": "How to reduce your website bounce rate?",
      "answer": "There are possibilities to reduce the website bounce rate if you focus on some strategic pointers such as Page speed optimization, making sure it’s mobile-friendly, Content Clarity improvement, using smart Internal linking, enhancing strong CTAs, Testing & Regular Analysis, etc."
    }
  ]

  cards = [
    {
      link: '/calculators/adsense-rpm-calculator',
      image: 'assets/page/calculators/adsense-rpm/adsense-rpm-calculator-thumbnail.jpg',
      title: 'Adsense RPM Calculator',
      description: 'Determine your website ad revenue potential with our Google AdSense RPM Calculator. Get accurate estimates of revenue per thousand impressions to optimize your monetization strategy. Try it now!'
    },
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
  ]

}
