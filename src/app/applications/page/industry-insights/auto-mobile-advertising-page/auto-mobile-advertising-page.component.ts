import { Component } from '@angular/core';
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
  selector: 'app-auto-mobile-advertising-page',
  templateUrl: './auto-mobile-advertising-page.component.html',
  styleUrl: './auto-mobile-advertising-page.component.css'
})
export class AutoMobileAdvertisingPageComponent {

  media: string = 'automobileadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['automobileadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['automobileadvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/industry-insights/automobile-advertising-report') {
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

    this.commonService.gtmPageEvents('Company', 'Company');
  }



  faqList = [
    {
      "question": "How to choose the right media for an Auto brand’s advertising campaign?",
      "answer": "A mix of traditional and digital platforms ensures maximum reach, catering to both mass audiences and digital-first consumers."
    },
    {
      "question": "What role does seasonality play in Automobile sector advertising?",
      "answer": "Ad spending peaks during key sales seasons, including festive periods and new vehicle launch cycles."
    },
    {
      "question": "How can Auto brands benefit from influencer marketing?",
      "answer": " Influencers help brands connect with niche audiences, showcase product features, and build consumer trust."
    },
    {
      "question": "Is print media still effective for Auto advertising?",
      "answer": "Yes, print remains a powerful tool for regional and local market penetration, especially for sales promotions."
    },
    {
      "question": "How important is digital advertising for the Automobile sector?",
      "answer": "Digital advertising enables precise targeting, higher engagement, and measurable ROI, making it a crucial part of marketing strategies."
    },
    {
      "question": "What type of content works best for Automobile sector campaigns?",
      "answer": "High-impact visuals, engaging videos, customer testimonials, and promotional offers perform best in Auto advertising."
    },
    {
      "question": "How can Auto brands measure the success of their ad campaigns?",
      "answer": "Metrics such as brand awareness, consumer engagement, lead conversions, and sales growth help evaluate campaign performance."
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
    this.userService.openUserLoginDialog('Product Detail', 'Auto Mobile Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
