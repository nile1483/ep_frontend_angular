import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-lead-to-customer-conversion-rate-page',
    templateUrl: './lead-to-customer-conversion-rate-page.component.html',
    styleUrl: './lead-to-customer-conversion-rate-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LeadToCustomerConversionRatePageComponent {

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
      "question": "What is the conversion rate?",
      "answer": "Conversion rate is defined as the ratio of visitors or leads performing desired actions like purchasing or signing up. It is an evaluation criterion determining to what degree the goals are met."
    },
    {
      "question": "How to calculate lead conversion rate?",
      "answer": "To calculate the conversion rate of leads, divide the number of customers by the number of leads, and this result is multiplied by 100 to convert it to a percentage."
    },
    {
      "question": "What factors influence Lead Conversion Rate?",
      "answer": "Numerous factors are likely to affect conversion rates, and they include lead quality, sales technique, timing of follow-up, as well as customer interactions in the selling process."
    },
    {
      "question": "What is a good Lead Conversion Rate?",
      "answer": "It should preferably range from 2 to 5 percent, but standards may vary across different industries. The better you treat your leads in the sales process, the better your conversion rate is."
    }
  ]

  cards = [
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
  ]

}
