import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-google-ads-revenue-page',
    templateUrl: './google-ads-revenue-page.component.html',
    styleUrl: './google-ads-revenue-page.component.css',
    standalone: false
})
export class GoogleAdsRevenuePageComponent {

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
    const growth = (conversionRevenue * adSpend);
    this.growthResult = growth.toFixed(2);
  }

  faqList = [
    {
      "question": "How can I calculate Google Ads revenue?",
      "answer": "To calculate Google Ads revenue, multiply the number of clicks on your ads by the average Cost Per Click (CPC). Conversion rates can be utilized to monitor ad effectiveness further."
    },
    {
      "question": "How do I increase my Google Ad revenue?",
      "answer": "The income you earn from Google Ads can be substantially increased by more accurate targeting, very good ad placement, better content production, and regularly refreshing keyword strategies to produce high CTR and conversion."
    },
    {
      "question": "How to increase Google Ad revenue?",
      "answer": "Revenue from Google Ads increases when you focus on optimizing your ad content, enhancing the user experience, and using the most relevant keywords. By making these adjustments, you can better engage your audience and drive more meaningful interactions with your ads."
    },
    {
      "question": "Why is calculating Google Ads revenue crucial for marketers?",
      "answer": "Calculating Google Ads revenue is crucial for marketers to measure performance, optimize ad strategies, and make data-driven decisions to ensure campaigns are as profitable as possible, eventually maximizing ROI."
    }
  ]

  cards = [
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
    {
      link: '/calculators/facebook-ads-roi-calculator',
      image: 'assets/page/calculators/facebook-ads-roi/facebook-ads-roi-calculator-thumbnail.jpg',
      title: 'Facebook Ads ROI Calculator',
      description: 'Calculate the ROI of your Facebook ads effortlessly with our Facebook Ads ROI Calculator. Discover ad spend effectiveness and optimize strategies for maximum returns.'
    },
    {
      link: '/calculators/week-on-week-calculator',
      image: 'assets/page/calculators/week-on-week/week-on-week-calculator-thumbnail.jpg',
      title: 'Week on Week Calculator',
      description: 'Use our Week-on-Week Growth Calculator to measure your weekly growth rate. Track and analyze your performance accurately over time to make informed business decisions.'
    },
  ]

}
