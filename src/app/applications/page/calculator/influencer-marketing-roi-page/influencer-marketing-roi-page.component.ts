import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-influencer-marketing-roi-page',
    templateUrl: './influencer-marketing-roi-page.component.html',
    styleUrl: './influencer-marketing-roi-page.component.css',
    standalone: false
})
export class InfluencerMarketingRoiPageComponent {

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
      "question": "What is Influencer ROI?",
      "answer": "Influencer ROI (Return on Investment) means how much profit you make from an influencer campaign compared to how much you spend. It helps you understand if the money you invested in influencer marketing is giving you good results."
    },
    {
      "question": "How can I improve my Influencer ROI?",
      "answer": " You can improve your Influencer ROI by choosing influencers whose audience matches your brand, setting clear goals, using tracking links, and creating engaging content. Also, working with influencers who have real and active followers helps improve results."
    },
    {
      "question": "What factors influence Influencer ROI?",
      "answer": "Many things can affect Influencer ROI, like the influencer’s reach, how engaged their followers are, the quality of the content, and how well the influencer’s audience connects with your brand. The platform used and the timing of the campaign also matter."
    },
    {
      "question": "How do I use Influencer ROI effectively?",
      "answer": "To use Influencer ROI effectively, track key results like sales, website traffic, and engagement (likes, comments, shares). Study what worked and what didn’t, and use that information to make future campaigns better. "
    }
  ]

  cards = [
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
    {
      link: '/calculators/sales-forecast-calculator',
      image: 'assets/page/calculators/sales-forecast/sales-forecast-calculator-thumbnail.jpg',
      title: 'Sales Forecast Calculator',
      description: 'Estimate future sales performance with our Sales Forecast Calculator. Input historical data and market trends to generate accurate projections, aiding in informed decision-making and strategic planning for your business.'
    },
  ]

}
