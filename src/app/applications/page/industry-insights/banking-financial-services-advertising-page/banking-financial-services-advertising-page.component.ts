import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SERVICE_LIST_WITH_SVG_ICON, APP_SVG_ICON_LIST, SVG_ICON_FOR_MEDIA, C2A_TITLE_DATA } from '@app-shared-constants';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { Router } from '@angular/router';
import { UserService } from '@app-shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banking-financial-services-advertising-page',
  templateUrl: './banking-financial-services-advertising-page.component.html',
  styleUrl: './banking-financial-services-advertising-page.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class BankingFinancialServicesAdvertisingPageComponent {

  media: string = 'bankingfinancialservicesadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['bankingfinancialservicesadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['bankingfinancialservicesadvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/industry-insights/banking-financial-services-advertising') {
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
        this.pageContentData = result.data;
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

    this.commonService.gtmPageEvents('Company', 'Banking Financial Services Advertising');
  }



  faqList = [
    {
      "question": "What changed in digital advertising by trading platforms?",
      "answer": "Crypto exchanges such as Delta Exchange, MEXC and Gemini saw their combined spend fall sharply, while FundedNext, FundedProTrader and Bitget gained ground."
    },
    {
      "question": "How competitive is BFSI digital advertising?",
      "answer": "The market is highly fragmented, with 1,189 advertisers competing for digital audiences. The number of advertisers increased by 11.1%."
    },
    {
      "question": "Which digital platform had a strong share of BFSI impressions?",
      "answer": "X accounted for 27.8% of BFSI digital impressions, more than twice its share of overall monitored digital advertising."
    },
    {
      "question": "Which brand had a strong presence across all four media?",
      "answer": "LIC featured among the top four BFSI advertisers across digital, radio, print and television."
    },
    {
      "question": "Which advertisers led BFSI television advertising?",
      "answer": "NPCI and AMFI led BFSI TV airtime, accounting for 11.7% and 9.9%, respectively."
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
    this.userService.openUserLoginDialog('Static Page', 'Banking Financial Services Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
