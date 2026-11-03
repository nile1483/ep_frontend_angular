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
    selector: 'app-print-advertising-page',
    templateUrl: './print-advertising-page.component.html',
    styleUrl: './print-advertising-page.component.css',
    standalone: false
})
export class PrintAdvertisingPageComponent {

  media: string = 'printadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['printadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['printadvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/media-insights/print-advertising-report') {
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
      "question": "Which categories and brands led print advertising in 2025?",
      "answer": "The Cars category held the strongest position in print throughout 2025, contributing 10.8% of the year’s total ad volume. On the advertiser side, Maruti Suzuki India remained the most active, and its flagship Maruti Car Range topped the brand charts as well. Together, they shaped a major share of print visibility during the year."
    },
    {
      "question": "How much influence did regional patterns have on print advertising last year?",
      "answer": "Yes, Northern and western markets continued to attract more advertiser attention. Rajasthan and Delhi, along with the belt around them, remained the stronger print zones because these regions consistently pull higher readership. Brands stuck with what worked, markets where the response is reliable, and the reach is solid."
    },
    {
      "question": "What stood out about brand competition in print during 2025?",
      "answer": "The bigger categories stayed crowded, but the Car segment held its edge throughout the year. Maruti Suzuki India didn’t really lose its momentum, and the Maruti Car Range stayed comfortably ahead as the most visible brand. The demand stayed steady, and the investment behind the category remained strong enough to keep it in front."
    },
    {
      "question": "Which categories gained the most in print advertising during 2025?",
      "answer": "Cars clearly led the way, showing a 29% jump over the previous year. Retail Outlets-Jewellers followed with a steady 16% growth. Among the top 10 categories, FMCG Products doubled their presence, making them the fastest-growing segment in print. This shows advertisers doubled down on the categories that were performing well and grabbing the most attention."
    },
    {
      "question": "Which cities had the highest share of print advertising in 2025?",
      "answer": "New Delhi topped the city charts with a 7.3% share of total print ad space. The combined contribution of the top 10 cities reached 41.8%, highlighting the importance of major urban markets. Brands continued focusing on these cities because they delivered the most consistent readership and visibility for campaigns."
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
    this.userService.openUserLoginDialog('Product Detail', 'Print Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
