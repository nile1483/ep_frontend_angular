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
  selector: 'app-ipl-advertising-page',
  templateUrl: './ipl-advertising-page.component.html',
  styleUrl: './ipl-advertising-page.component.css'
})
export class IplAdvertisingPageComponent {

  media: string = 'ipladvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['ipl-advertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['ipladvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/industry-insights/ipl-tam-report') {
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
      "question": "How did indexed growth change across the recent IPL seasons?",
      "answer": "The indexed growth trend across the last four IPL seasons shows a clear shift when the editions are compared side by side. When IPL 2025 is measured against IPL 2022, indexed growth stands lower by 25%. "
    },
    {
      "question": "How have the category numbers changed for the different seasons?",
      "answer": "Category participation fluctuated considerably throughout each of the four seasons. The number of advertising categories fell sharply from 71 to 53 during IPL 16. Subsequently, there was a recovery with 74 advertising categories in IPL 17 and continued with a similar number in IPL 18."
    },
    {
      "question": "How have advertiser and brand involvement developed over these seasons of IPL?",
      "answer": "Advertiser and Brand activity followed a similar path throughout both seasons. A significant decline occurred with IPL 16. The following seasons of the show saw an increase in advertiser participation, which reached its peak during 2024 and continued until 2025. The later seasons of the show display a more active advertising battle between competitors than the earlier seasons."
    },
    {
      "question": "Which categories consistently ranked among the top 5 advertising segments in IPL?",
      "answer": "Two categories, Ecom-Gaming and Mouth Fresheners, consistently were within the top five advertising categories during all four seasons. "
    },
    {
      "question": "Which advertisers and brands maintained visibility during the IPL advertising?",
      "answer": "Sporta Technologies and K P Pan Foods were among the advertisers that consistently appeared in the Top 5 list across all four IPL seasons covered in the report. On the brand side, Dream11.com maintained a similar presence, featuring in the Top 5 brands list throughout the period. Collectively, the Top 5 advertisers contributed between 23% and 37% of ad volume share, while the Top 5 brands accounted for between 20% and 32%."
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
    this.userService.openUserLoginDialog('Product Detail', 'IPL Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }


}
