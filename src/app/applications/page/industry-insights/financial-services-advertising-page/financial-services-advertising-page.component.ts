import { Component, ChangeDetectionStrategy } from '@angular/core';
import { C2A_TITLE_DATA, INDUSTRY_INSIGHTS_META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService, UserService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-services-advertising-page',
  templateUrl: './financial-services-advertising-page.component.html',
  styleUrl: './financial-services-advertising-page.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class FinancialServicesAdvertisingPageComponent {

  media: string = 'financialservicesadvertising';

  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  metaData: any = INDUSTRY_INSIGHTS_META_DATA['financialservicesadvertising'];

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['financialservicesadvertising'], inquiryUser: {} };

  userDataObs!: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private commonService: CommonService,
    public dialog: MatDialog,
    private pageService: PageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    // set isAuthenticated user 
    this.isAuthenticated = this.userService.isAuthenticated;
    this.userDataObs = this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;

      if (this.isAuthenticated && this.router.url == '/industry-insights/financial-services-advertising-report') {
        this.download();
      }
    });

    this.setMetaData();
    this.getPageData();
  }

  getPageData() {
    this.pageService.getIndustryInsightsAdvertisingPageData(this.media).subscribe(result => {
      if (result.status == true) {
        this.callToActionData.inquiryUser = result.data?.inquiryUser;
      }
    });
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

    this.commonService.gtmPageEvents('Company', 'Company');
  }



  faqList = [
    {
      "question": "How much do financial services companies spend on advertising annually?",
      "answer": "Financial Services brands typically allocate 5-12% of their revenue toward marketing and advertising."
    },
    {
      "question": "Which are the most effective media channels for financial services advertising?",
      "answer": "Print, radio, and digital media are the most effective in reaching businesses and consumers."
    },
    {
      "question": "What role does digital marketing play in financial services advertising?",
      "answer": "Digital marketing ensures precise targeting, customer engagement, and brand credibility through SEO, PPC, and content marketing."
    },
    {
      "question": "How do I choose the right advertising medium for my financial brand?",
      "answer": "A mix of traditional and digital channels works best, depending on the target audience and campaign goals."
    },
    {
      "question": "Why is branding important for financial services?",
      "answer": "Strong branding builds trust, credibility, and customer loyalty, which are essential in the financial services sector."
    },
    {
      "question": "What are the key challenges in financial services advertising?",
      "answer": "Regulatory compliance, market competition, and evolving consumer behavior are the major challenges in financial services advertising."
    }
  ];


  handleDownloadClick(event: Event) {

    if (!this.isAuthenticated) {
      this.openUserLoginDialog();
    } else {
      this.download();
    }
  }


  // open User Login Dialog 
  openUserLoginDialog() {
    this.userService.openUserLoginDialog('Product Detail', 'Financial Services Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
