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
    selector: 'app-radio-advertising-page',
    templateUrl: './radio-advertising-page.component.html',
    styleUrl: './radio-advertising-page.component.css',
    standalone: false
})
export class RadioAdvertisingPageComponent {

  media: string = 'radioadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['radioadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['radioadvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/media-insights/radio-advertising-report') {
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
      "question": "Which categories experienced the highest growth in the radio medium in the year 2025?",
      "answer": "The strongest growth in ad volumes occurred through Banking-Services & Products, which experienced a 99% increase. The Corporate-Financial Institutes sector showed 87% growth when compared to the 2024 period. Among the top 10, the Corporate-NBFCs category delivered the sharpest rise, growing 15 times over the previous year, making it the fastest-expanding category on radio in 2025."
    },
    {
      "question": "Which states contributed the most to radio advertising volumes in 2025?",
      "answer": "Maharashtra led all states with an 18.9% share of total radio ad volumes, followed closely by Delhi at 18.3%. The top five states together accounted for 68.2% of overall ad spend, showing that advertisers continued to focus on high-performing regions to maximize reach and engagement."
    },
    {
      "question": "Which cities dominated radio advertising during 2025?",
      "answer": "New Delhi ranked first among all cities with an 18.3% share of ad volumes. When combined, the top 10 cities contributed 82.4% of total radio advertising, highlighting that urban markets remained the primary focus for brands seeking concentrated audience exposure."
    },
    {
      "question": "How did advertiser participation evolve in 2025 on radio?",
      "answer": "Radio advertising saw strong engagement from brands, with more than 9,000 exclusive advertisers active during the year. The top 10 advertisers together accounted for 15.8% of all ad volumes, underlining how leading brands maintained consistent investment while smaller advertisers expanded their presence across categories."
    },
    {
      "question": "Which brands emerged as leaders on the radio in 2025?",
      "answer": "Jeena Sikho led the brand rankings, followed by Maruti Suzuki Arena, both showing notable growth over 2024. Among the top 10 brands, three belonged to Maruti Suzuki India, and collectively, the top 10 brands captured 9.2% of total ad volumes. Over 12,000 brands were active on radio, reflecting a healthy mix of established players and new entrants."
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
    this.userService.openUserLoginDialog('Product Detail', 'Radio Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
