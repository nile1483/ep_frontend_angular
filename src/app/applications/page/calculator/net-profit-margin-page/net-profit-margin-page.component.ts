import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CALCULATOR_META_DATA } from '@app-shared-constants';
import { MetaInformation } from '@app-shared-model';
import { CommonService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';

@Component({
  selector: 'app-net-profit-margin-page',
  templateUrl: './net-profit-margin-page.component.html',
  styleUrl: './net-profit-margin-page.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class NetProfitMarginPageComponent {

  growthForm: FormGroup;
  growthResult: string = '';

  webURL: string = AppURL.webURL;
  metaData: any = CALCULATOR_META_DATA['net-profit-margin-calculator'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
  ) {
    this.growthForm = this.fb.group({
      conversionRevenue: ['', [Validators.required, Validators.min(0.01)]],
      adSpend: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `${this.router.url}`;
    //og data          
    metaInfo.og_url = `${this.webURL}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Net Profit Margin Calculator');
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
      "question": "How can I calculate the net profit margin?",
      "answer": "To find the net profit margin, use the last formula mentioned: (net income divided by revenue) multiplied by 100. This might be easier to calculate with a <strong>profit margin calculator</strong> since it would do the math for you."
    },
    {
      "question": "Why Is Net Profit Margin Important?",
      "answer": "The net profit margin of the business tells how well expenses have been controlled and how much profit was made. It also helps assess the company's financial health and thus guide its strategic decision-making through a <strong>profit margin calculator</strong>."
    },
    {
      "question": "How Can a Company Improve Its Net Profit Margin?",
      "answer": "An increase in a company's <strong>net income margin</strong> can arise from reductions in operating expenses, growth in sales, or optimizing pricing strategies. Operational progress can still be monitored using the net profit margin calculator."
    },
    {
      "question": "How Is Net Margin Different from other profitability ratios?",
      "answer": "The net margin, being different from any other measure of profitability, takes into consideration the net income after all of the <strong>operating expenses</strong> and taxes to offer a clearer insight into the performance of the overall financials. "
    }
  ]

  cards = [
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
    {
      link: '/calculators/month-on-month-growth-calculator',
      image: 'assets/page/calculators/month-on-month-growth/month-on-month-growth-calculator-thumbnail.jpg',
      title: 'Month on Month Growth Calculator',
      description: 'Use our Month-on-Month Growth Calculator to measure your business monthly growth rate. Accurately track and analyze your performance over time to make informed decisions.'
    },
    {
      link: '/calculators/year-on-year-growth-calculator',
      image: 'assets/page/calculators/year-on-year-growth/year-on-year-growth-calculator-thumbnail.jpg',
      title: 'Year on Year Growth Calculator',
      description: 'Use our Year-on-Year Growth Calculator to measure your business annual growth rate. Accurately track and analyze your performance over time to make informed decisions.'
    },
  ]
}
