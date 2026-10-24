import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-year-on-year-growth-page',
  templateUrl: './year-on-year-growth-page.component.html',
  styleUrl: './year-on-year-growth-page.component.css'
})
export class YearOnYearGrowthPageComponent {

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
      "question": "How do you calculate year-over-year growth?",
      "answer": "To calculate the year-over-year growth rate, there are certain comparisons of metrics you need to take into account, such as revenue, sales, or profits from one time frame to the same time frame in the previous year. It provides the percentage change in those metrics for a particular time frame."
    },
    {
      "question": "Why is tracking year-over-year important?",
      "answer": "Tracking year-over-year performance is too important as it assists in identifying trends, analyzing growth, and monitoring the impact of strategies over time. It gives a precise review of long-term progress by eliminating short-term uncertainties and seasonal ups and downs. "
    },
    {
      "question": "Who are year-over-year comparisons useful for?",
      "answer": "Year-over-year comparisons are helpful for investors, analysts, and businesses to measure the growth patterns, seasonal fluctuations, and financial health as time passes, while reducing the chances of short-term fluctuations."
    },
    {
      "question": "What if my year-over-year growth is negative?",
      "answer": "If your year-over-year growth goes negative, it indicates that your business has faced a decline compared to the previous year. It covers analysis of key elements such as retaining client relationships, pricing, competition, and market conditions. It gives you the indication that your business needs to improve its growth strategy."
    }
  ]

  cards = [
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
    {
      link: '/calculators/adsense-rpm-calculator',
      image: 'assets/page/calculators/adsense-rpm/adsense-rpm-calculator-thumbnail.jpg',
      title: 'Adsense RPM Calculator',
      description: 'Determine your website ad revenue potential with our Google AdSense RPM Calculator. Get accurate estimates of revenue per thousand impressions to optimize your monetization strategy. Try it now!'
    },
  ]

}
